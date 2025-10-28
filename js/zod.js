class ZodError extends Error {
    constructor(errors) {
        super('Validation error');
        this.errors = errors;
    }
}

class ZodString {
    constructor() {
        this.validators = [];
    }

    min(length, message) {
        this.validators.push((value, path) => {
            if (typeof value !== 'string' || value.trim().length < length) {
                throw new ZodError([{ path, message }]);
            }
            return value;
        });
        return this;
    }

    max(length, message) {
        this.validators.push((value, path) => {
            if (typeof value !== 'string' || value.trim().length > length) {
                throw new ZodError([{ path, message }]);
            }
            return value;
        });
        return this;
    }

    regex(pattern, message) {
        this.validators.push((value, path) => {
            if (typeof value !== 'string' || !pattern.test(value)) {
                throw new ZodError([{ path, message }]);
            }
            return value;
        });
        return this;
    }

    parse(data, path) {
        let value = data;
        const resolvedPath = path || [];
        for (const validator of this.validators) {
            try {
                value = validator(value, resolvedPath);
            } catch (error) {
                throw error;
            }
        }
        return value;
    }
}

class ZodObject {
    constructor(shape) {
        this.shape = shape;
    }

    parse(data) {
        const errors = [];
        const result = {};

        Object.entries(this.shape).forEach(([key, schema]) => {
            try {
                result[key] = schema.parse(data[key], [key]);
            } catch (error) {
                if (error instanceof ZodError) {
                    errors.push(...error.errors);
                } else {
                    errors.push({ path: [key], message: 'Неверное значение' });
                }
            }
        });

        if (errors.length > 0) {
            throw new ZodError(errors);
        }

        return result;
    }
}

export const z = {
    object(shape) {
        return new ZodObject(shape);
    },
    string() {
        return new ZodString();
    }
};

export { ZodError };

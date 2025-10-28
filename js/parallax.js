export function initParallax() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const layer = document.createElement('div');
    layer.className = 'cursor-layer';

    const icons = Array.from({ length: 3 }, (_, index) => {
        const icon = document.createElement('div');
        icon.className = 'cursor-icon';
        icon.style.opacity = String(0.25 + index * 0.2);
        icon.style.left = `${20 + index * 25}%`;
        icon.style.top = `${30 + index * 20}%`;
        layer.appendChild(icon);
        return icon;
    });

    document.body.appendChild(layer);

    const updatePositions = (event) => {
        const { clientX, clientY } = event;
        const width = window.innerWidth;
        const height = window.innerHeight;

        icons.forEach((icon, index) => {
            const depth = (index + 1) * 0.04;
            const x = (clientX / width - 0.5) * depth * 200;
            const y = (clientY / height - 0.5) * depth * 200;
            icon.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
    };

    document.addEventListener('pointermove', updatePositions);

    window.addEventListener('beforeunload', () => {
        document.removeEventListener('pointermove', updatePositions);
        if (layer.parentNode) {
            layer.parentNode.removeChild(layer);
        }
    });
}

export function initAlcoholStatsCountup({ reduceMotion = false } = {}) {
    if (typeof CountUp === 'undefined') {
        console.warn('CountUp library is not available');
        return;
    }
    
    const statsSection = document.querySelector('[data-alcohol-danger]');
    if (!statsSection) {
        return;
    }
    
    const statsNodes = statsSection.querySelectorAll('[data-countup-target]');
    if (!statsNodes.length) {
        return;
    }
    
    const countups = Array.from(statsNodes).map((node) => {
        const endValue = parseInt(node.dataset.countupTarget, 10) || 0;
        const suffix = node.dataset.countupSuffix || '';
        const prefix = node.dataset.countupPrefix || '';
        const decimals = parseInt(node.dataset.countupDecimals, 10) || 0;
        
        const countUpInstance = new CountUp(node, endValue, {
            suffix,
            prefix,
            duration: reduceMotion ? 0 : 2.8,
            separator: ' ',
            decimalPlaces: decimals,
            smartEasingThreshold: 100,
            smartEasingAmount: 50
        });
        
        return {
            node,
            instance: countUpInstance,
            started: false
        };
    });
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const stat = countups.find((item) => item.node === entry.target);
                if (stat && !stat.started) {
                    stat.started = true;
                    if (!stat.instance.error) {
                        stat.instance.start();
                    } else {
                        console.error('CountUp error:', stat.instance.error);
                    }
                    observer.unobserve(entry.target);
                }
            }
        });
    }, {
        threshold: 0.45
    });
    
    countups.forEach((item) => observer.observe(item.node));
}

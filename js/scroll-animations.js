export function initScrollAnimations() {
    const processLine = document.getElementById('processLine');
    
    if (processLine) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    processLine.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.2
        });
        
        observer.observe(processLine);
    }
    
    const processSteps = document.querySelectorAll('.process-step');
    processSteps.forEach((step, index) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        step.style.opacity = '1';
                        step.style.transform = 'translateY(0)';
                    }, index * 150);
                }
            });
        }, {
            threshold: 0.3
        });
        
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        observer.observe(step);
    });
    
    const anonymitySection = document.querySelector('.anonymity-section');
    if (anonymitySection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    anonymitySection.classList.add('is-visible');
                }
            });
        }, {
            threshold: 0.2
        });
        
        observer.observe(anonymitySection);
    }
}

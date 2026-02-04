document.addEventListener('DOMContentLoaded', function() {
    // Navigation & Section Toggling
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    function showSection(targetId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            
            // Allow display:none to take effect before removing active
            setTimeout(() => {
                if(!section.classList.contains('active')) {
                   // logic handled by CSS transitions usually, but here we force state
                }
            }, 300);
        });
        
        // Deactivate all nav links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Show target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            // Small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0)';
            }, 10);
        }
        
        // Activate nav link
        const activeLink = document.querySelector(`.nav-link[href="#${targetId}"]`);
        if (activeLink) activeLink.classList.add('active');
        
        // Reset scroll on content column
        const contentColumn = document.querySelector('.content');
        if(contentColumn) contentColumn.scrollTop = 0;
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
    
    // Initial Animation for Elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animatedElements = document.querySelectorAll('.info-section, .education-item, .project-item, .skill-item');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease-out';
        el.style.transitionDelay = `${index * 0.1}s`; // Stagger effect
        observer.observe(el);
    });
    
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    // Reset animation for reappearance
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
    
    // Background Parallax
    document.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            shape.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
    
});

// Modal Functions
function openImageModal(pdfSrc, title) {
    const modal = document.getElementById('imageModal');
    const iframe = document.getElementById('modalPdf');
    const label = document.getElementById('modalTitle');
    
    iframe.src = pdfSrc;
    label.textContent = title;
    modal.style.display = 'block';
    
    // Animate modal entry
    const content = modal.querySelector('.modal-content');
    content.style.opacity = '0';
    content.style.transform = 'translate(-50%, -40%)';
    setTimeout(() => {
        content.style.transition = 'all 0.3s ease';
        content.style.opacity = '1';
        content.style.transform = 'translate(-50%, -50%)';
    }, 10);
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.getElementById('modalPdf').src = ''; // Stop video/pdf
}

window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeImageModal();
    }
}

// Download CV Mock
function downloadCV() {
    const link = document.createElement('a');
    link.href = 'assets/resume/VIGNESHWARAN_CV.pdf';
    link.download = 'VIGNESHWARAN_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

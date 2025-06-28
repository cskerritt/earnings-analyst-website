// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'none';
    }
});

// Form Submissions
document.addEventListener('DOMContentLoaded', function() {
    // Contact Form
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Thank you for your message. We will get back to you soon!', 'success');
            this.reset();
        });
    }
    
    // Login Form
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            if (email && password) {
                showNotification('Login functionality will be implemented with backend integration.', 'info');
            }
        });
    }
});

// Purchase Button Handlers
document.addEventListener('DOMContentLoaded', function() {
    // Individual issue purchases
    document.querySelectorAll('.issue-actions .btn-primary').forEach(button => {
        button.addEventListener('click', function() {
            const issueCard = this.closest('.issue-card');
            const issueTitle = issueCard.querySelector('.issue-content h4').textContent;
            showPurchaseModal(issueTitle, '$49.99');
        });
    });
    
    // Subscription buttons
    document.querySelectorAll('.pricing-card .btn-primary').forEach(button => {
        button.addEventListener('click', function() {
            const card = this.closest('.pricing-card');
            const planName = card.querySelector('h3').textContent;
            const price = card.querySelector('.price').textContent;
            
            if (planName.includes('Institutional')) {
                showNotification('Please contact our sales team for institutional pricing.', 'info');
            } else {
                showPurchaseModal(planName, price);
            }
        });
    });
    
    // Preview buttons
    document.querySelectorAll('.btn-secondary').forEach(button => {
        if (button.textContent.includes('Preview')) {
            button.addEventListener('click', function() {
                showNotification('Preview functionality will be available soon.', 'info');
            });
        }
    });
});

// Modal Functions
function showPurchaseModal(itemName, price) {
    const modal = createModal(`
        <div class="modal-content">
            <h3>Purchase Confirmation</h3>
            <p>You are about to purchase:</p>
            <div class="purchase-details">
                <h4>${itemName}</h4>
                <p class="price">${price}</p>
            </div>
            <p>Payment processing will be implemented with a secure payment gateway.</p>
            <div class="modal-actions">
                <button class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                <button class="btn btn-primary" onclick="processPurchase('${itemName}', '${price}')">Proceed to Payment</button>
            </div>
        </div>
    `);
    
    document.body.appendChild(modal);
}

function createModal(content) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeModal()"></div>
        ${content}
    `;
    
    // Add modal styles if not already added
    if (!document.querySelector('#modal-styles')) {
        const styles = document.createElement('style');
        styles.id = 'modal-styles';
        styles.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 2000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
            }
            .modal-content {
                background: white;
                padding: 2rem;
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                position: relative;
                z-index: 2001;
                box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            }
            .purchase-details {
                background: #f8f9fa;
                padding: 1rem;
                border-radius: 8px;
                margin: 1rem 0;
                text-align: center;
            }
            .purchase-details h4 {
                color: #2c3e50;
                margin-bottom: 0.5rem;
            }
            .purchase-details .price {
                font-size: 1.5rem;
                font-weight: 700;
                color: #3498db;
            }
            .modal-actions {
                display: flex;
                gap: 1rem;
                margin-top: 1.5rem;
                justify-content: flex-end;
            }
        `;
        document.head.appendChild(styles);
    }
    
    return modal;
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

function processPurchase(itemName, price) {
    showNotification(`Purchase of "${itemName}" for ${price} initiated. Payment gateway integration required.`, 'success');
    closeModal();
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add notification styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 3000;
                max-width: 350px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.3);
                animation: slideIn 0.3s ease;
            }
            .notification-success {
                background: #27ae60;
            }
            .notification-info {
                background: #3498db;
            }
            .notification-warning {
                background: #f39c12;
            }
            .notification-error {
                background: #e74c3c;
            }
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Animate chart bars on scroll
function animateOnScroll() {
    const chartBars = document.querySelectorAll('.bar');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });
    
    chartBars.forEach(bar => {
        bar.style.animationPlayState = 'paused';
        observer.observe(bar);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    animateOnScroll();
    
    // Add loading animation to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                const originalText = this.textContent;
                
                // Simulate loading
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });
});

// Add button loading styles
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('#button-loading-styles')) {
        const styles = document.createElement('style');
        styles.id = 'button-loading-styles';
        styles.textContent = `
            .btn.loading {
                position: relative;
                color: transparent !important;
            }
            .btn.loading::after {
                content: '';
                position: absolute;
                width: 16px;
                height: 16px;
                top: 50%;
                left: 50%;
                margin-left: -8px;
                margin-top: -8px;
                border: 2px solid #ffffff;
                border-radius: 50%;
                border-top-color: transparent;
                animation: spin 1s ease-in-out infinite;
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(styles);
    }
});

// Search functionality for digital library
function initializeSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search issues, topics, or keywords...';
    searchInput.className = 'search-input';
    
    // This would be integrated with actual search functionality
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        // Implement search logic here
        console.log('Searching for:', query);
    });
}

// Initialize all components
document.addEventListener('DOMContentLoaded', function() {
    console.log('The Earnings Analyst website loaded successfully');
    
    // Add any additional initialization here
    initializeSearch();
});
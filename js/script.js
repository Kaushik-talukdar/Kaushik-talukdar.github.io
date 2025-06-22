// Mobile menu toggle
        document.getElementById('menu-btn').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Set active navigation link
        function setActiveLink() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-link');
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Remove active class from all links
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    
                    // Add active class to clicked link
                    this.classList.add('active');
                    
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    document.getElementById('mobile-menu').classList.add('hidden');
                }
            });
        });

        // Highlight active navigation link on scroll
        window.addEventListener('scroll', function() {
            setActiveLink();
        });

        // Animate skill bars when they come into view
        const skillBars = document.querySelectorAll('.skill-bar');
        
        function animateSkillBars() {
            skillBars.forEach(bar => {
                const rect = bar.getBoundingClientRect();
                if (rect.top <= window.innerHeight - 100) {
                    bar.style.width = bar.style.width; // Triggers the animation
                }
            });
        }
        
        // Intersection Observer for section animations
        const animateSections = document.querySelectorAll('.section-animate');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('section-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animateSections.forEach(section => {
            observer.observe(section);
        });

        // Typing animation for name
        function typeName(element, text, i = 0) {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(() => typeName(element, text, i), 100);
            } else {
                element.style.borderRight = 'none';
            }
        }

        // Mouse movement parallax effect
        document.addEventListener('mousemove', function(e) {
            const home = document.getElementById('home');
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            home.style.setProperty('--x', xAxis + 'px');
            home.style.setProperty('--y', yAxis + 'px');
        });

        // Add CSS variables for mouse movement effect
        const style = document.createElement('style');
        style.textContent = `
            #home::before {
                transform: translateX(var(--x, 0)) translateY(var(--y, 0)) scale(1.05);
                transition: transform 0.3s ease-out;
            }
        `;
        document.head.appendChild(style);

        // Start the typing animation when the page loads
        document.addEventListener('DOMContentLoaded', function() {
            const nameElement = document.querySelector('.typing-name');
            const nameText = "Kaushik Talukdar";
            nameElement.innerHTML = '';
            nameElement.style.borderRight = '.15em solid var(--name-color)';
            typeName(nameElement, nameText);
            
            // Set active link on page load
            setActiveLink();
            
            // Animate home section immediately
            document.querySelector('#home').classList.add('section-visible');
            
            // Run once on page load
            animateSkillBars();
            
            // Run on scroll
            window.addEventListener('scroll', animateSkillBars);
        });

        // Force animation when navigating via hash
        window.addEventListener('hashchange', function() {
            const section = document.querySelector(window.location.hash);
            if (section && section.classList.contains('section-animate')) {
                section.classList.add('section-visible');
            }
        });
window.onload = function() {

    // Particles.js configuration
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#2563eb" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false, "anim": { "enable": false } },
            "size": { "value": 3, "random": true, "anim": { "enable": false } },
            "line_linked": { "enable": true, "distance": 150, "color": "#60a5fa", "opacity": 0.4, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": true, "mode": "push" }, "resize": true },
            "modes": { "repulse": { "distance": 100, "duration": 0.4 }, "push": { "particles_nb": 4 } }
        },
        "retina_detect": true
    });

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });

    // Intersection Observer for reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));
    
    // Dynamic Accordion Creation for Tutorials and FAQ
    // **KEY CHANGE: Video object has been removed from this list**
    const tutorialData = [
        { title: "Check Status on Official Website", content: "You can check your Aadhaar and bank account linking status directly on the UIDAI website.<ol class='list-decimal list-inside space-y-2 pl-4 mt-2'><li>Visit the official UIDAI website's 'Check Aadhaar/Bank Linking Status' page.</li><li>Enter your 12-digit Aadhaar number and the security code.</li><li>Click on 'Send OTP'. You will receive an OTP on your registered mobile number.</li><li>Enter the OTP and click 'Submit'. The status will be displayed on the screen.</li></ol><a href='https://resident.uidai.gov.in/bank-mapper' target='_blank' class='inline-flex items-center mt-3 text-blue-600 font-semibold hover:underline'>Go to UIDAI Website <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='ml-1'><path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'/><polyline points='15 3 21 3 21 9'/><line x1='10' x2='21' y1='14' y2='3'/></svg></a>" },
        { title: "Enable DBT via Net Banking", content: "Most major banks allow you to seed your Aadhaar and enable DBT through their internet banking portals.<ol class='list-decimal list-inside space-y-2 pl-4 mt-2'><li>Log in to your bank's net banking portal.</li><li>Navigate to the 'Aadhaar Seeding' or 'e-Services' section.</li><li>Select the account you wish to link and enable for DBT.</li><li>Enter your Aadhaar number and confirm.</li><li>Authenticate using an OTP sent to your mobile number. The bank will process your request in 2-3 working days.</li></ol>" },
        { title: "Enable DBT at a Bank Branch (Offline)", content: "If you prefer an offline method, you can visit your bank branch in person.<ol class='list-decimal list-inside space-y-2 pl-4 mt-2'><li>Visit your bank branch where you have an account.</li><li>Ask for the 'Aadhaar Seeding and DBT Consent Form'.</li><li>Fill out the form with your account details and Aadhaar number. Ensure you tick the box for enabling DBT/NPCI Mapping.</li><li>Attach a self-attested copy of your Aadhaar card.</li><li>Submit the form to the bank official. You will receive an acknowledgement slip.</li></ol>" }
    ];

    const faqData = [
        { title: "Can I link one Aadhaar to multiple bank accounts?", content: "Yes, you can link (seed) your Aadhaar to multiple bank accounts. However, you can only enable DBT for ONE of those accounts at a time. This single account will be used to receive all government benefits." },
        { title: "How do I change my DBT-linked bank account?", content: "To change your DBT-linked account, you need to submit a new Aadhaar Seeding and DBT Consent Form at the bank branch of the NEW account you want to receive benefits in. Once they update it in the NPCI mapper, the old one will be automatically de-linked for DBT." },
        { title: "What happens if my Aadhaar is inactive?", content: "If your Aadhaar becomes inactive, it can disrupt your DBT payments. It's important to keep your Aadhaar active by using it for authentication (like biometrics or OTP) at least once every few years and keeping your mobile number updated." }
    ];

    function createAccordion(containerSelector, data) {
        const container = document.querySelector(containerSelector);
        let html = '';
        data.forEach(item => {
            html += `
                <div class="border-b">
                    <button class="accordion-header w-full text-left py-5 px-6 flex justify-between items-center text-lg font-semibold hover:bg-gray-50">
                        <span>${item.title}</span>
                        <span class="accordion-icon transition-transform duration-300 h-5 w-5 shrink-0"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span>
                    </button>
                    <div class="accordion-content overflow-hidden max-h-0 transition-all duration-500 ease-in-out px-6">
                        <div class="py-4 text-gray-600">${item.content}</div>
                    </div>
                </div>
            `;
        });
        // Appends the generated HTML to the existing content
        container.innerHTML += html;
    }

    createAccordion('#tutorial-list', tutorialData);
    createAccordion('#faq .max-w-4xl', faqData);

    document.querySelectorAll('.accordion-header').forEach(accordion => {
        accordion.addEventListener('click', (e) => {
            const content = accordion.nextElementSibling;
            const icon = accordion.querySelector('.accordion-icon');
            const isOpen = content.style.maxHeight;
            // Updated to find the parent container correctly
            const parent = accordion.closest('.max-w-4xl');

            parent.querySelectorAll('.accordion-content').forEach(c => { if (c !== content) {c.style.maxHeight = null; c.previousElementSibling.querySelector('.accordion-icon').classList.remove('rotate-180');} });
            
            if (isOpen) {
                content.style.maxHeight = null;
                icon.classList.remove('rotate-180');
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
                icon.classList.add('rotate-180');
            }
        });
    });

    // ... The rest of the JS for Status Checker and Quiz remains the same ...
    // (Omitted for brevity)
};
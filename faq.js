document.addEventListener('DOMContentLoaded', function() {
    // FAQ Category Switching
    const categoryButtons = document.querySelectorAll('.faq-category-btn');
    const faqSections = document.querySelectorAll('.faq-section');

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show selected section
            faqSections.forEach(section => {
                if (section.dataset.category === category) {
                    section.classList.remove('hidden');
                    section.classList.add('active');
                } else {
                    section.classList.add('hidden');
                    section.classList.remove('active');
                }
            });
        });
    });

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.setAttribute('aria-expanded', 'false');
        
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            
            // Close all other questions
            faqQuestions.forEach(q => {
                if (q !== question) {
                    q.setAttribute('aria-expanded', 'false');
                    q.nextElementSibling.classList.remove('show');
                }
            });
            
            // Toggle current question
            question.setAttribute('aria-expanded', !isExpanded);
            answer.classList.toggle('show');
            
            // Set answer height for animation
            if (answer.classList.contains('show')) {
                answer.style.height = answer.scrollHeight + 'px';
            } else {
                answer.style.height = '0';
            }
        });
    });
}); 
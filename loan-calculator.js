document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const loanAmount = document.getElementById('loanAmount');
    const interestRate = document.getElementById('interestRate');
    const loanTerm = document.getElementById('loanTerm');
    const calculateBtn = document.getElementById('calculateLoan');
    const resultsDiv = document.getElementById('loanResults');
    
    const monthlyPaymentDisplay = document.getElementById('monthlyPayment');
    const totalPaymentDisplay = document.getElementById('totalPayment');
    const totalInterestDisplay = document.getElementById('totalInterest');

    const initialState = resultsDiv.querySelector('.initial-state');
    const resultsContent = resultsDiv.querySelector('.results-content');

    // Only add click event listener, remove input listeners
    calculateBtn.addEventListener('click', function() {
        if (validateInputs()) {
            // Hide initial state
            initialState.classList.add('hidden');
            
            // Show and calculate results
            resultsContent.classList.remove('hidden');
            setTimeout(() => {
                resultsContent.classList.add('active');
            }, 50);
            
            calculateLoan();
        }
    });

    function validateInputs() {
        const principal = parseFloat(loanAmount.value);
        const rate = parseFloat(interestRate.value);
        const years = parseFloat(loanTerm.value);

        return principal > 0 && rate > 0 && years > 0;
    }

    function calculateLoan() {
        const principal = parseFloat(loanAmount.value) || 0;
        const annualRate = (parseFloat(interestRate.value) || 0) / 100;
        const monthlyRate = annualRate / 12;
        const months = (parseFloat(loanTerm.value) || 0) * 12;

        if (principal > 0 && annualRate > 0 && months > 0) {
            // Monthly payment formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
            const monthlyPayment = principal * 
                (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                (Math.pow(1 + monthlyRate, months) - 1);

            const totalPayment = monthlyPayment * months;
            const totalInterest = totalPayment - principal;

            monthlyPaymentDisplay.textContent = formatCurrency(monthlyPayment);
            totalPaymentDisplay.textContent = formatCurrency(totalPayment);
            totalInterestDisplay.textContent = formatCurrency(totalInterest);
        } else {
            monthlyPaymentDisplay.textContent = '$0.00';
            totalPaymentDisplay.textContent = '$0.00';
            totalInterestDisplay.textContent = '$0.00';
        }
    }

    function formatCurrency(number) {
        return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    // Add reset functionality if needed
    function resetCalculator() {
        resultsContent.classList.remove('active');
        setTimeout(() => {
            resultsContent.classList.add('hidden');
            initialState.classList.remove('hidden');
        }, 300);
    }
}); 
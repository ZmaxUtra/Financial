document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const loanAmount = document.getElementById('loanAmount');
    const interestRate = document.getElementById('interestRate');
    const loanTerm = document.getElementById('loanTerm');
    const calculateBtn = document.getElementById('calculateLoan');
    
    const monthlyPaymentDisplay = document.getElementById('monthlyPayment');
    const totalPaymentDisplay = document.getElementById('totalPayment');
    const totalInterestDisplay = document.getElementById('totalInterest');

    // Add calculation event listener
    calculateBtn.addEventListener('click', calculateLoan);

    // Real-time calculation on input change
    [loanAmount, interestRate, loanTerm].forEach(input => {
        input.addEventListener('input', calculateLoan);
    });

    function calculateLoan() {
        const principal = parseFloat(loanAmount.value);
        const rate = parseFloat(interestRate.value) / 100 / 12; // Monthly interest rate
        const time = parseFloat(loanTerm.value) * 12; // Total months

        if (principal > 0 && rate > 0 && time > 0) {
            // Monthly payment formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
            const monthlyPayment = principal * 
                (rate * Math.pow(1 + rate, time)) / 
                (Math.pow(1 + rate, time) - 1);

            const totalPayment = monthlyPayment * time;
            const totalInterest = totalPayment - principal;

            // Update display with formatted numbers
            monthlyPaymentDisplay.textContent = formatCurrency(monthlyPayment);
            totalPaymentDisplay.textContent = formatCurrency(totalPayment);
            totalInterestDisplay.textContent = formatCurrency(totalInterest);
        }
    }

    function formatCurrency(number) {
        return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    // Add to the DOMContentLoaded event listener in each calculator file
    CalculatorUtils.addTooltips();
    CalculatorUtils.initThemeToggle();
    CalculatorUtils.addAnimations();
}); 
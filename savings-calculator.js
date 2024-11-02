document.addEventListener('DOMContentLoaded', function() {
    // Get elements
    const savingsGoal = document.getElementById('savingsGoal');
    const currentSavings = document.getElementById('currentSavings');
    const timeframe = document.getElementById('timeframe');
    const savingsInterest = document.getElementById('savingsInterest');
    const calculateBtn = document.getElementById('calculateSavings');
    
    // Get display elements
    const resultsDiv = document.getElementById('savingsResults');
    const initialState = resultsDiv.querySelector('.initial-state');
    const resultsContent = resultsDiv.querySelector('.results-content');
    const requiredMonthlySavings = document.getElementById('requiredMonthlySavings');
    const totalSavingsContributions = document.getElementById('totalSavingsContributions');
    const savingsInterestEarned = document.getElementById('savingsInterestEarned');
    const savingsProgress = document.getElementById('savingsProgress');
    const progressStart = document.getElementById('progressStart');
    const progressEnd = document.getElementById('progressEnd');

    // Add event listener
    calculateBtn.addEventListener('click', function() {
        if (validateInputs()) {
            // Hide initial state
            initialState.classList.add('hidden');
            
            // Show and calculate results
            resultsContent.classList.remove('hidden');
            setTimeout(() => {
                resultsContent.classList.add('active');
            }, 50);
            
            calculateSavings();
        }
    });

    function validateInputs() {
        const goal = parseFloat(savingsGoal.value) || 0;
        const current = parseFloat(currentSavings.value) || 0;
        const months = parseFloat(timeframe.value) || 0;
        const rate = parseFloat(savingsInterest.value) || 0;

        return goal > 0 && months > 0 && rate >= 0;
    }

    function calculateSavings() {
        const goal = parseFloat(savingsGoal.value) || 0;
        const current = parseFloat(currentSavings.value) || 0;
        const months = parseFloat(timeframe.value) || 0;
        const annualRate = (parseFloat(savingsInterest.value) || 0) / 100;
        const monthlyRate = annualRate / 12;

        if (goal > 0 && months > 0) {
            let monthlyAmount;
            if (monthlyRate === 0) {
                monthlyAmount = (goal - current) / months;
            } else {
                const futureValue = goal;
                const presentValue = current;
                const n = months;
                const r = monthlyRate;
                
                const compound = Math.pow(1 + r, n);
                monthlyAmount = (futureValue - presentValue * compound) / ((compound - 1) / r);
            }

            const totalContributions = monthlyAmount * months;
            const interestEarned = goal - (current + totalContributions);

            // Update displays
            requiredMonthlySavings.textContent = formatCurrency(monthlyAmount);
            totalSavingsContributions.textContent = formatCurrency(totalContributions);
            savingsInterestEarned.textContent = formatCurrency(interestEarned);

            // Update progress bar
            updateProgress(current, goal);
        }
    }

    function updateProgress(current, goal) {
        const percentage = Math.min((current / goal) * 100, 100);
        savingsProgress.style.width = `${percentage}%`;
        progressStart.textContent = formatCurrency(current);
        progressEnd.textContent = formatCurrency(goal);
    }

    function formatCurrency(number) {
        return '$' + Math.abs(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
}); 
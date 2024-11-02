let investmentChart = null;

document.addEventListener('DOMContentLoaded', function() {
    // Get input elements
    const initialInvestment = document.getElementById('initialInvestment');
    const monthlyContribution = document.getElementById('monthlyContribution');
    const annualReturn = document.getElementById('annualReturn');
    const investmentYears = document.getElementById('investmentYears');
    const calculateBtn = document.getElementById('calculateInvestment');
    
    // Get display elements
    const resultsDiv = document.getElementById('investmentResults');
    const initialState = resultsDiv.querySelector('.initial-state');
    const resultsContent = resultsDiv.querySelector('.results-content');
    const finalBalanceDisplay = document.getElementById('finalBalance');
    const totalContributionsDisplay = document.getElementById('totalContributions');
    const totalInterestDisplay = document.getElementById('totalInterestEarned');
    
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
            
            calculateInvestment();
        }
    });

    function validateInputs() {
        const initial = parseFloat(initialInvestment.value) || 0;
        const monthly = parseFloat(monthlyContribution.value) || 0;
        const rate = parseFloat(annualReturn.value) || 0;
        const years = parseFloat(investmentYears.value) || 0;

        return years > 0 && (initial > 0 || monthly > 0) && rate >= 0;
    }

    function calculateInvestment() {
        const principal = parseFloat(initialInvestment.value) || 0;
        const monthly = parseFloat(monthlyContribution.value) || 0;
        const rate = (parseFloat(annualReturn.value) || 0) / 100;
        const years = parseFloat(investmentYears.value) || 0;
        
        if (years > 0) {
            let balance = principal;
            const monthlyRate = rate / 12;
            const totalMonths = years * 12;
            
            let yearlyData = [balance];
            
            // Calculate growth month by month
            for (let month = 1; month <= totalMonths; month++) {
                balance += monthly;
                balance *= (1 + monthlyRate);
                
                if (month % 12 === 0) {
                    yearlyData.push(balance);
                }
            }
            
            const totalContributions = principal + (monthly * totalMonths);
            const totalInterest = balance - totalContributions;
            
            // Update displays
            finalBalanceDisplay.textContent = formatCurrency(balance);
            totalContributionsDisplay.textContent = formatCurrency(totalContributions);
            totalInterestDisplay.textContent = formatCurrency(totalInterest);
            
            // Update chart
            updateOrCreateChart(yearlyData);
        }
    }

    function updateOrCreateChart(yearlyData) {
        const ctx = document.getElementById('investmentChart').getContext('2d');
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        
        if (investmentChart) {
            investmentChart.destroy();
        }
        
        const labels = Array.from({length: yearlyData.length}, (_, i) => `Year ${i}`);
        
        investmentChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Investment Growth',
                    data: yearlyData,
                    borderColor: '#14b8a6',
                    backgroundColor: isLight ? 'rgba(20, 184, 166, 0.1)' : 'rgba(20, 184, 166, 0.2)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return '$ ' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    function formatCurrency(number) {
        return '$' + Math.abs(number).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
}); 


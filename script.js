const salaryInput = document.getElementById('monthly-salary');
const withdrawalInput = document.getElementById('withdrawal-amount');
const totalAmountDisplay = document.getElementById('total-amount');
const taxAmountDisplay = document.getElementById('tax-amount');
const afterTaxAmountDisplay = document.getElementById('after-tax-amount');

const ctx = document.getElementById('pie-chart').getContext('2d');
let pieChart;

function calculateAfterTax() {
    const monthlySalary = parseFloat(salaryInput.value) || 0;
    const totalAmount = parseFloat(withdrawalInput.value) || 0;
    const annualSalary = monthlySalary * 12;

    // Determine tax rate based on annual salary
    let taxRate = getTaxRate(annualSalary);
    let taxAmount = totalAmount * taxRate;
    let amountAfterTax = totalAmount - taxAmount;

    // Update the results display
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
    taxAmountDisplay.textContent = taxAmount.toFixed(2);
    afterTaxAmountDisplay.textContent = amountAfterTax.toFixed(2);

    // Update the pie chart
    updatePieChart(totalAmount, taxAmount, amountAfterTax);
}

function getTaxRate(annualSalary) {
    if (annualSalary <= 237100) return 0.18;
    else if (annualSalary <= 370500) return 0.26;
    else if (annualSalary <= 512800) return 0.31;
    else if (annualSalary <= 673000) return 0.36;
    else return 0.39;
}

function updatePieChart(total, tax, afterTax) {
    if (pieChart) {
        pieChart.destroy(); // Destroy existing chart instance
    }

    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Amount Withdrawn', 'Tax Deduction', 'Amount After Tax'],
            datasets: [{
                data: [total, tax, afterTax],
                backgroundColor: ['#36a2eb', '#ff6384', '#4bc0c0']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                }
            }
        }
    });
}

// Add event listeners for dynamic updates
salaryInput.addEventListener('input', calculateAfterTax);
withdrawalInput.addEventListener('input', calculateAfterTax);

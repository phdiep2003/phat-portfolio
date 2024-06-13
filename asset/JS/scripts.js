// Cookie chart
var canvasElement = document.getElementById("cookieChart");

var config =  {
    type:"bar",
    data: {
        labels:["EV/Sales", "EV/EBITDA","EV/EBIT","P/E"],
        datasets: [{
            label:"in USD", 
            data:[40,50,60,70],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                // 'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(54, 162, 235, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(201, 203, 207, 1)'
              ],
            borderColor: [
                'rgb(255, 99, 132)',
                // 'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)'
                // 'rgb(153, 102, 255)',
                // 'rgb(201, 203, 207)'
              ],
            borderWidth: 1
            }],
    },
    options: {
        indexAxis: 'y',
    }
};

var cookieChart = new Chart (canvasElement,config);


// Dark mode
document.addEventListener('DOMContentLoaded', (event) => {
    const htmlElement = document.documentElement;
    const switchElement = document.getElementById('darkModeSwitch');

    // Set the default theme to dark if no setting is found in local storage
    const currentTheme = localStorage.getItem('bsTheme') || 'dark';
    htmlElement.setAttribute('data-bs-theme', currentTheme);
    switchElement.checked = currentTheme === 'dark';

    switchElement.addEventListener('change', function () {
        if (this.checked) {
            htmlElement.setAttribute('data-bs-theme', 'dark');
            localStorage.setItem('bsTheme', 'dark');
        } else {
            htmlElement.setAttribute('data-bs-theme', 'light');
            localStorage.setItem('bsTheme', 'light');
        }
    });
});
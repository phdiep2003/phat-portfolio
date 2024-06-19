document.addEventListener('DOMContentLoaded', (event) => {
    // Dark Mode
    const htmlElement = document.documentElement;
    const switchElement = document.getElementById('darkModeSwitch');
    // if local storage has key bsTheme => change theme to value in local storage
    // if not write the current system theme
    // Set the default theme to dark if no setting is found in local storage
    let currentTheme = localStorage.getItem('bsTheme') || null;
    if (currentTheme === null) {
        currentTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    htmlElement.setAttribute('data-bs-theme', currentTheme);
    switchElement.checked = currentTheme === 'dark';
    localStorage.setItem('bsTheme', currentTheme);

    switchElement.addEventListener('change', function () {
        if (this.checked) {
            setTheme('dark');
            currentTheme = localStorage.getItem('bsTheme');
        } else {
            setTheme('light');
            currentTheme = localStorage.getItem('bsTheme');
        }
    });

    function setTheme(theme) {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('bsTheme', theme);
        updateChartTheme(theme);
    }

    function updateChartTheme(theme) {
        let tickColor = theme === 'dark' ? 'white' : 'black';
        cookieChart.options.scales.x.ticks.color = tickColor;
        cookieChart.options.scales.y.ticks.color = tickColor;
        cookieChart.update();
    }

    // Cookie chart
    var canvasElement = document.getElementById("cookieChart");

    var config =  {
        type: "bar",
        data: {
            labels: ["EV/Sales", "EV/EBITDA","EV/EBIT","P/E","Intrinsic Value"],
            datasets: [{
                label: "USD Price/Share", 
                data: [[18,160],[13.88,98.03],[11.01,71.85],[14.76,68.02],[55.91,67.59]],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                ],
                borderWidth: 1
            }],
        },
        options: {
            plugins: { 
                legend: {
                  labels: {color: currentTheme === 'dark' ? 'white' : 'black'}
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: { color: currentTheme === 'dark' ? 'white' : 'black' },
                    grid: { color: currentTheme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' },
                    border: {color: currentTheme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)'},
                },
                y: {
                    stacked: true,
                    ticks: { color: currentTheme === 'dark' ? 'white' : 'black' },
                    grid: {color:'rgba(0,0,0,0)'}
                },
                
            },
            indexAxis: 'y',
        }
    };

    var cookieChart = new Chart(canvasElement, config);
});
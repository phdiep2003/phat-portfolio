// JavaScript for dropdown functionality
document.addEventListener('DOMContentLoaded', function () {
    const dropdownItems = document.querySelectorAll('.header__navbar-dropdown');

    dropdownItems.forEach(function (item) {
        item.addEventListener('click', function (event) {
            const dropdownContent = this.querySelector('.header__navbar-dropdown-content');
            dropdownContent.style.display = (dropdownContent.style.display === 'block') ? 'none' : 'block';
            event.stopPropagation();
        });
    });

    // Close dropdown when clicking outside of it
    window.addEventListener('click', function (event) {
        dropdownItems.forEach(function (item) {
            const dropdownContent = item.querySelector('.header__navbar-dropdown-content');
            if (dropdownContent.style.display === 'block' && !item.contains(event.target)) {
                dropdownContent.style.display = 'none';
            }
        });
    });
});


var canvasElement = document.getElementById("cookieChart");

var config =  {
    type:"bar",
    data: {
        labels:["EV/Sales Multiple", "EV/EBITDA","EV/EBIT","P/E"],
        datasets: [{label:"in USD", data:[40,50,60,70]}],
    },
};

var cookieChart = new Chart (canvasElement,config);
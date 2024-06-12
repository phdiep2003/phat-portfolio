var canvasElement = document.getElementById("cookieChart");

var config =  {
    type:"bar",
    data: {
        labels:["EV/Sales Multiple", "EV/EBITDA","EV/EBIT","P/E"],
        datasets: [{label:"in USD", data:[40,50,60,70]}],
    },
};

var cookieChart = new Chart (canvasElement,config);


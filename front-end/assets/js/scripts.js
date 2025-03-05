document.addEventListener("DOMContentLoaded", function () {
    // Fetch Education Data
    fetch('/api/education')
        .then(response => response.json())
        .then(data => {
            let educationContainer = document.querySelector('.education'); // Target the education div
            educationContainer.innerHTML = "<h2 class='h2'>Education</h2>"; // Add the header back to the container

            data.forEach(item => {
                // Create a new div for each education entry
                let div = document.createElement("div");
                div.classList.add('education-entry'); // Add a class for styling (optional)
                
                // Create the inner HTML structure
                div.innerHTML = `
                    <div class='title-date'>
                        <h3 class="h3 title_work">${item.institution}</h3>
                        <h3 class="date_work">${item.expected_graduation}</h3>
                    </div>
                    <ul class="section-list">
                        <li><b>${item.degree}</b> - GPA: ${item.gpa}</li>
                        <li><b>Concentration:</b> ${item.concentration}</li>
                        <li><b>Minor:</b> ${item.minor} - Dean's List: ${item.deans_list}</li>
                        <li><b>Certificates:</b> ${item.certificates.join(', ')}</li>
                    </ul>`;
                
                // Append the new entry to the education container
                educationContainer.appendChild(div);
            });
        })
        .catch(error => {
            console.error("Error fetching education data:", error);
        });

    // Fetch Course Skills Data
    fetch('/api/courseSkills')
        .then(response => response.json())
        .then(data => {
            let courseSkillsContainer = document.getElementById("courseSkills");
            data.forEach(skill => {
                let skillSection = document.createElement("div");
                skillSection.classList.add("skill-section");
                skillSection.innerHTML = `<h3 class="h3">${skill.title}</h3>
                                          <ul class="section-list">${skill.description.map(desc => `<li>${desc}</li>`).join('')}</ul>`;
                courseSkillsContainer.appendChild(skillSection);
            });
        })
        .catch(error => {
            console.error("Error fetching course skills data:", error);
        });

    // Fetch Work History Data
    fetch('/api/workHistory')
    .then(response => response.json())
    .then(data => {
        let jobListContainer = document.querySelector("#work");  // Select the job-list container
        jobListContainer.innerHTML = "<h2 class='h2'>Work History</h2>"; // Clear existing content if needed
        data.forEach(job => {
            let jobDiv = document.createElement("div");
            jobDiv.classList.add('job'); // Added a class to the job div for consistency
            jobDiv.innerHTML = `
                <div class="title-date">
                    <h3 class="h3 title_work"><strong>${job.company}</strong></h3>
                    <h3 class="date_work">${job.date}</h3>
                </div>
                <h4 class="h4">${job.position} | ${job.location}</h4>
                <ul class="section-list">
                    ${job.responsibilities.map(res => `<li>${res}</li>`).join('')}
                </ul>`;
            jobListContainer.appendChild(jobDiv); // Append the job div to job-list container
        });
    })
    .catch(error => {
        console.error("Error fetching work history data:", error);
    });

    
    // Fetch Extracurriculars Data
    fetch('/api/extracurriculars')
        .then(response => response.json())
        .then(data => {
            let extracurricularsContainer = document.getElementById("extracurriculars").querySelector('.section-list');
            data.forEach(activity => {
                let li = document.createElement("li");
                li.innerText = activity;
                extracurricularsContainer.appendChild(li);
            });
        })
        .catch(error => {
            console.error("Error fetching extracurricular activities:", error);
        });

    // Fetch Certificates Data
    fetch('/api/certificates')
                .then(response => response.json())
                .then(data => {
                    let certificatesContainer = document.getElementById("certificate");
                    // Clear any existing content in the certificates section
                    certificatesContainer.innerHTML = '<h2 class="h2">Certificates</h2>'; // Add the header back

                    // Loop through the data to create new certificate entries
                    data.forEach(cert => {
                        let certDiv = document.createElement("div");
                        certDiv.classList.add('certificate');
                        certDiv.innerHTML = `<div class='title-date'>
                                                <h3 class="h3">
                                                    <a class="certi" href="${cert.link}" target="_blank">${cert.title}</a>
                                                </h3>
                                                <h3 class="date_work">${cert.date}</h3>
                                             </div>
                                             <ul class="section-list">
                                                <li>${cert.skills.join(', ')}</li>
                                            </ul>`;
                        certificatesContainer.appendChild(certDiv);
                    });
                })
                .catch(error => {
                    console.error("Error fetching certificates data:", error);
                });

    // Dark Mode Functionality
    const htmlElement = document.documentElement;
    const switchElement = document.getElementById('darkModeSwitch');
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
        } else {
            setTheme('light');
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
        cookieChart.options.plugins.legend.labels.color = tickColor;
        cookieChart.options.scales.x.grid.color = tickColor;
        cookieChart.options.scales.x.border.color = tickColor;
        cookieChart.update();
    }

    // Cookie chart
    var canvasElement = document.getElementById("cookieChart");
    var config = {
        type: "bar",
        data: {
            labels: ["EV/Sales", "EV/EBITDA", "EV/EBIT", "P/E", "DCF"],
            datasets: [{
                label: "USD Price/Share",
                data: [[18, 160], [13.88, 98.03], [11.01, 71.85], [14.76, 68.02], [55.91, 67.59]],
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
                    labels: { color: currentTheme === 'dark' ? 'white' : 'black' }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: { color: currentTheme === 'dark' ? 'white' : 'black' },
                    grid: { color: currentTheme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' },
                    border: { color: currentTheme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)' }
                },
                y: {
                    stacked: true,
                    ticks: { color: currentTheme === 'dark' ? 'white' : 'black' },
                    grid: {color:'rgba(0,0,0,0)'}
                    // border: { color: currentTheme === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(3, 1, 1, 0.4)' },
                },
            },
            indexAxis: 'y',
        }
    };

    var cookieChart = new Chart(canvasElement, config);
});

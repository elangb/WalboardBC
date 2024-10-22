 let myGauge; // Declare the gauge variable
        let config; // Store the chart configuration

        // Function to fetch data from the PHP script
        function fetchData() {
            fetch("PHP/DataDaily.php")
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
					const splitSkills = data.Head["Split Skill"];
					const informasi = data.Head.Informasi;

					// Combine skills and informasi into an array of objects
					const combinedData = splitSkills.map((skill, index) => ({
						skill: skill,
						value: informasi[index]
					}));

					var AnsCall=0;
					var AbanCalls=0;
					var acd=0;
					var accept=0;

                    combinedData.forEach(item => {
						switch (item.skill) {
							case " Aban Calls":
								
								AbanCalls = item.value;
								break;
							case " Ans Calls":
								AnsCall = item.value;
								break;
							case " ACD Time":
								acd =item.value;
								break;
							case "% accep":
							
								accept = item.value;
								break;
							// case "Agents Avail":
								// agentAvail = item.value;
								// break;
							// case "AUXINCALLS":
								// auxinCall = item.value;
								// break;
							// case "ACD Calls":
								// acdCall = item.value;
								// break;case "Agents Avail":
								// agentAvail = item.value;
								// break;
							// case "AUXINCALLS":
								// auxinCall = item.value;
								// break;
							// case "ACD Calls":
								// acdCall = item.value;
								// break;
							default:
								// Handle any other cases if necessary
						}
						
					
							
						   
					});
					 const _dataArray = [AnsCall, AbanCalls, acd,accept];
    						const needleValue = _dataArray.reduce((a, b) => a + b, 0) / _dataArray.length;

					// Example of how to handle the extracted data
					if (_dataArray.length > 0) {
							// Retrieve the values or default to 0
							

  
						if (!isNaN(needleValue)) {
							// Create the chart configuration
							config = {
								type: 'gauge',
								data: {
									datasets: [{
										data: _dataArray,
										value: needleValue, // Use the calculated average
										backgroundColor: ['red', 'orange', 'yellow', 'green'],
										borderWidth: 2
									}]
								},
								options: {
									responsive: true,
									title: {
										display: false,
										text: 'Gauge Chart'
									},
									layout: {
										padding: {
											bottom: 0
										}
									},
									needle: {
										radiusPercentage: 2,
										widthPercentage: 3.2,
										lengthPercentage: 40,
										color: 'rgba(0, 0, 0, 1)'
									},
									valueLabel: {
										formatter: Math.round
									}
								}
							};

							// Create or update the chart
							if (!myGauge) {
								const ctx = document.getElementById('chart').getContext('2d');
								myGauge = new Chart(ctx, config);
							} else {
								myGauge.data.datasets[0].data = _dataArray; // Update data
								myGauge.data.datasets[0].value = needleValue; // Update needle value
								myGauge.update(); // Refresh the chart
							}
						} else {
							console.error("Calculated needle value is NaN. Check your data.");
						}
					}

                  
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                });
        }

        document.addEventListener('DOMContentLoaded', function() {
            fetchData(); // Initial data fetch

          
        });
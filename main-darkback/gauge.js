let myGauge;
let config;

function fetchData() {
    fetch("PHP/DataDaily.php")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Ambil data dari array Head
            if (data && data.Head) {
                const splitSkills = data.Head["Split Skill"];
               
				const informasi = data.Head.Informasi;
				const pengaduan = data.Head.Pengaduan;
				
				if (Array.isArray(splitSkills) && Array.isArray(informasi) && Array.isArray(pengaduan)) {
					if (splitSkills.length === informasi.length && splitSkills.length === pengaduan.length) {
						// Combine skills, informasi, and pengaduan into an array of objects
						const combinedData = splitSkills.map((skill, index) => ({
							skill: skill,
							value: informasi[index],
							pengaduan: pengaduan[index]
						}));
						// Initialize variables for data extraction
							let abandoned = 0;
							let answerCall = 0;
						
							// Process combined data
							combinedData.forEach(item => {
								switch (item.skill) {
									case "Aban Calls":
										abandoned = Number(item.value)+Number(item.pengaduan);
										break;
									case "ACD Calls":
										answerCall = Number(item.value)+Number(item.pengaduan)
										break;
									
									default:
										// Handle any other cases if necessary
								}
								var received = Number(abandoned) + Number(answerCall);
								var percentAnswered = (answerCall/received)*100
								 updateGauge(percentAnswered);
										
							});

					
					}
				} 

                // // Cari index untuk "% Ans Calls"
                // const ansCallsIndex = splitSkills.findIndex(skill => 
                    // skill.includes("ACD Calls"));
					
				// const ansAbnIndex = splitSkills.findIndex(skill => 
                    // skill.includes("Aban Calls"));
                
                // if (ansCallsIndex !== -1) {
                    // const percentAnswered = parseInt(informasi[ansCallsIndex]);
                    // console.log("Found % Ans Calls:", percentAnswered);
                    // updateGauge(percentAnswered);
                // } else {
                    // // Alternatif: ambil nilai dari posisi yang kita tahu (index 10)
                    // const percentAnswered = parseInt(informasi[10]);
                    // console.log("Using index 10 value:", percentAnswered);
				// //	Number(abandoned) + Number(answerCall);
                    // updateGauge(Number(abandoned) + Number(answerCall););
                // }
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            console.log("Full error details:", {
                message: error.message,
                stack: error.stack
            });
        });
		 // fetch("PHP/DataDaily.php", function(data) {
        // console.log(data);


       // const splitSkills = data.Head["Split Skill"];
// const informasi = data.Head.Informasi;
// const pengaduan = data.Head.Pengaduan;


				// if (Array.isArray(splitSkills) && Array.isArray(informasi) && Array.isArray(pengaduan)) {
					// if (splitSkills.length === informasi.length && splitSkills.length === pengaduan.length) {
						// // Combine skills, informasi, and pengaduan into an array of objects
						// const combinedData = splitSkills.map((skill, index) => ({
							// skill: skill,
							// value: informasi[index],
							// pengaduan: pengaduan[index]
						// }));
						// // Initialize variables for data extraction
							// let abandoned = 0;
							// let answerCall = 0;
						
							// // Process combined data
							// combinedData.forEach(item => {
								// switch (item.skill) {
									// case "Aban Calls":
										// abandoned = Number(item.value)+Number(item.pengaduan);
										// break;
									// case "ACD Calls":
										// answerCall = Number(item.value)+Number(item.pengaduan)
										// break;
									
									// default:
										// // Handle any other cases if necessary
								// }
								// var received = Number(abandoned) + Number(answerCall);
								 // updateGauge(received);
										
							// });

					
					// }
				// } 

        

        // // Call chart functions with the extracted values
		
		
        
    // });
}

function initGauge() {
    var data = [50,75,95,100];
    var value = 0;

    config = {
        type: 'gauge',
        data: {
            datasets: [{
                data: data,
                value: value,
                backgroundColor: ['#e64f54', '#d69f3a', '#009946', '#009fe7'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            title: {},
            layout: {
                padding: {
                    bottom: 20
                }
            },
            needle: {
                radiusPercentage: 2,
                widthPercentage: 3.2,
                lengthPercentage: 80,
                color: '#000000'
            },
            valueLabel: {
                formatter: Math.round
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    };

    var ctx = document.getElementById('chart-gauge').getContext('2d');
    myGauge = new Chart(ctx, config);
}

function updateGauge(value) {
    if (myGauge) {
        myGauge.data.datasets[0].value = value;
        myGauge.update();
        console.log("Gauge updated with value:", value);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initGauge();
    fetchData();
    setInterval(fetchData, 10000);
});

// Tambahkan fungsi debugging
function debugData(data) {
    console.log("Full API Response:", data);
    if (data && data.Head) {
        console.log("Split Skills:", data.Head["Split Skill"]);
        console.log("Informasi:", data.Head.Informasi);
    }
}
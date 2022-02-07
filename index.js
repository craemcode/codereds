

async function drawChart(){
    const data = await getCsv()
    const ctx = document.getElementById('chart').getContext('2d');
    
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xlabels,
            datasets: [{
                label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in °C since 1880',
                data: data.tempdata,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}



drawChart()

getCsv()
async function getCsv(){
    const xlabels = []
    const tempdata = []
    const response = await fetch('ZonAnn.Ts+dSST copy.csv')
    const data = await response.text()

    const rows = data.split('\n').slice(1)
    rows.forEach(element=>{
        const col = element.split(',')
        const year = col[0]
        const temp = col[1]
        xlabels.push(year)
        tempdata.push(parseFloat(temp) +14)
        
    })

    return { xlabels, tempdata}
    
}
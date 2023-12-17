const ctx = document.getElementById('myChart').getContext('2d');
const canvasContainer = document.getElementsByClassName('chart-container')[0];


// Sample data (replace this with your dynamic data)
const data = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
        {
            label: 'My Dataset',
            data: [65, 59, 80, 81, 56],
            backgroundColor: 'rgba(75, 192, 192, 0.8)',
            borderWidth: 1,
        },
    ],
};

const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

const myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: options,
});

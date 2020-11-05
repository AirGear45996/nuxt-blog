<template>
    <canvas height="50vh" ref="canvas"></canvas>
</template>

<script>
    import { Bar } from 'vue-chartjs';

    export default {
        extends: Bar,
        data: () => ({}),
        props: {
            title: String,
            labels: {
                type: Array,
                default: () =>([])
            },
            data: {
                type: Array,
                default: () =>([])
            }
        },
        mounted() {
            const data = {
                labels: this.labels, // ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: this.title, // '# of Votes',
                    data: this.data, // [12, 19, 3, 5, 2, 3],
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
            };
            const options = {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            };
            this.renderChart(data, options)
        }
    }
</script>

<style lang="scss" scoped>

</style>
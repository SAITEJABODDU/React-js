import React, { Component, createRef } from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints = [];
export default class GraphView extends Component {
    constructor() {
        super();
        this.state = { workouts: [] }
    }
    render() {
        const options = {
            title: {
                text: "Graph for Calories Burn"
            },
            data: [{
                type: "column",
                dataPoints: this.state.workouts
 }]
        }
        return (
            <div>
                <CanvasJSChart options={options}
                /* onRef = {ref => this.chart = ref} */
                />
            </div>
        );
    }
    componentDidMount() {
        console.log(this.state.workouts)
        var chart = this.chart;
        fetch('http://localhost:8000/workouts')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                let formattedData = data.map(d => {
                    return { label: d.title, y: d.TotalCalories }
                }
                )
                console.log(formattedData);
                this.setState({ workouts: formattedData })
                chart.render();
            });
    }
}


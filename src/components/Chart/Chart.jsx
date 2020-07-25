import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';
import styles from './Chart.module.css';

const Chart = ({ data:{confirmed, deaths, recovered},country }) => {
    const [ dailyData, setDailyData ] = useState([]);
    
    useEffect(() => {
        const fetchAPI = async() => {
            const initialDailyData = await fetchDailyData();
            setDailyData(initialDailyData);
        }
        fetchAPI();
    },[]);

    const lineChart = (
        // Truthy check
        dailyData[0]
        ? (<Line 
            data = {{
                labels: dailyData.map(({date})=> date), 
                // recovered is not available in current API
                datasets: [{
                    data: dailyData.map(({ confirmed }) => {
                        // Not sure how to add thousand separators.
                        // console.log(confirmed.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                        return confirmed
                    }),
                    label: 'Infected',
                    borderColor: '#3333ff',
                    fill: true,
                },{
                    data: dailyData.map(({ deaths }) => deaths),
                    label: 'Deaths',
                    borderColor: 'red',
                    backgroundColor: 'rgba(255,0,0,0.5)',
                    fill: true,
                }]
            }}
            />) 
        : null
    );

    const barChart = (
        confirmed
        ? (
            <Bar 
                data={{
                    labels: ['Infected','Recovered','Deaths'],
                    datasets:[{
                        label: 'People',
                        backgroundColor:['rgba(0,0,255,0.5)','rgba(0,255,0,0.5)','rgba(255,0,0,0.5)'],
                        data: [confirmed.value, recovered.value, deaths.value]
                    }]
                }}
                options={{
                    legend: { display:false },
                    title: { display:true, text: `Current state in ${country}` },
                }}
            />
        )
        : null
    )
    
    return (
        <div className={styles.container}>
            { country ? barChart: lineChart }
        </div>
    )
}

export default Chart;
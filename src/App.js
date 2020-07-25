import React from 'react';
import { Cards, Chart, CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData, fetchDailyData } from './api';
import teddyImage from './images/image.jpg'

class App extends React.Component {
  state = {
    data: {},
    country:'',
  }
  
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({ data: fetchedData })
  }
  

  handleCountryChange = async (country) => {
    // Fetch Data
    const fetchedData = await fetchData(country);
    // Set State
    this.setState({ data: fetchedData, country })
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={teddyImage} alt="COVID-19"></img>
        <Cards data = {data}/>
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data = {data} country={country}/>
      </div>
    )
  }
}

export default App;
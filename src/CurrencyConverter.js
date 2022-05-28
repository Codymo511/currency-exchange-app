import React from 'react';
import Chart from 'chart.js/auto';
import currencies from './utils/currencies';
import {Status, json } from './utils/fetchUtils';
import './styles/main.css';
import { withRouter } from 'react-router-dom';


class CurrencyConverter extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      base:'AUD',
      baseValue:'0',
      loading: true,
      secondCurrency:'JPY',
      secondValue:'',
    }
    this.chartRef = React.createRef();
  }

  componentDidMount(){
    const { baseValue,base,secondCurrency} = this.state;
    this.getRatesData( baseValue,base,secondCurrency)
    this.getHistoricalRates(base, secondCurrency);
  }

  changebase = (event) => { 
    const base = event.target.value;
    this.setState({ base});
    this.getRatesData(this.state.baseValue,base,this.state.secondCurrency);
    this.getHistoricalRates(base, this.state.secondCurrency);
  }
  
  changeCurrencyAmount = (event)=>{
    const baseValue = event.target.value
    this.setState({baseValue});
    this.getRatesData(baseValue,this.state.base,this.state.secondCurrency);
  }

  changeSecondCurrency = (event)=>{
    const secondCurrency = event.target.value
    this.setState({ secondCurrency});
    console.log(this.state.base)
    this.getRatesData(this.state.baseValue,this.state.base,secondCurrency);
    this.getHistoricalRates(this.state.base, secondCurrency);
  }


  
  changeSecondValue = (event) =>{ //change to new base value
   const baseValue=event.target.value
  
   this.reverseRatesData(baseValue,this.state.base,this.state.secondCurrency,); //call api with reversed currencies 
  }

  reverseRatesData = (baseValue,secondCurrency,base) => {    
    this.setState({ loading: true });
    fetch(`https://altexchangerateapi.herokuapp.com/latest?amount=${baseValue}&from=${secondCurrency}&to=${base}`) //reversed secondCurrency and base
      .then(Status)
      .then(json)
      .then(data => {
       
        if (data.error) {
          throw new Error(data.error);
        }
        const secondValue = data.rates[secondCurrency]
        console.log(data.rates)

        this.setState({
          base,
          secondCurrency,
          loading: false,
        });
        console.log("base value"+ baseValue,"secondCurrency" + secondCurrency,"base" + base, "secondValue" + secondValue)
      })
      .catch(error => console.error(error.message));
  }
  

  getRatesData = (baseValue,base,secondCurrency) => {
    this.setState({ loading: true });
    fetch(`https://altexchangerateapi.herokuapp.com/latest?amount=${baseValue}&from=${base}&to=${secondCurrency}`)
      .then(Status)
      .then(json)
      .then(data => {
       
        if (data.error) {
          throw new Error(data.error);
        }
        const rate = data.rates[secondCurrency];
        const secondValue = data.rates
        this.setState({
          rate,
          base,
          secondCurrency,
          secondValue,
          loading: false,
        });
      })
      .catch(error => console.error(error.message));
  }

  getHistoricalRates = (base, secondCurrency) => {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date((new Date).getTime() - (30 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0];
    fetch(`https://altexchangerateapi.herokuapp.com/${startDate}..${endDate}?from=${base}&to=${secondCurrency}`)
    
      .then(Status)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        const chartLabels = Object.keys(data.rates);
        const chartData = Object.values(data.rates).map(rate => rate[secondCurrency]);
        const chartLabel = `${base}/${secondCurrency}`;
        this.buildChart(chartLabels, chartData, chartLabel);
      })
      .catch(error => console.error(error.message));
  }
  buildChart = (labels, data, label) => {
    const chartRef = this.chartRef.current.getContext("2d");
    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }
    this.chart = new Chart(this.chartRef.current.getContext("2d"), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          }
        ] 
      },
      options: {
        responsive: true,
      }
    })
  }
  render() {
    const { baseCurrency,baseValue,secondCurrency,rate} = this.state;
    return (
      <>
      <div className="container-fluid vh-100 ">
        <div className="row">
        <div class="col-sm-6 pt-4 mx-auto text-center">
              <form>
              <input
              class="form-control form-control-lg text-center"
              type='number'
              placeholder='Enter currency amount'
              value={baseValue}
              onChange={this.changeCurrencyAmount}            
              />
                <select value={baseCurrency} onChange={this.changebase} className="form-control form-control-lg text-center " >
                  {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
                </select>
                <div class="text-center p-4">
                    <img className='arrow' src={require('./images/arrow.svg').default} alt='convert-arrow' />
                    </div>
                <select value={secondCurrency} onChange={this.changeSecondCurrency} className="form-control form-control-lg text-center " >
                {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
              </select>
              <div class="second-currency">{rate}</div>
              </form>
              <canvas ref={this.chartRef}/>
              </div>
          </div>
        </div>
    </>
    )
  }
}

export default CurrencyConverter;
import React from 'react';
import currencies from './utils/currencies';
import {Status, json } from './utils/fetchUtils';


// next it needs to display the amount of the converted currency (ie 1k aud to usd is 736)
class CurrencyConverter extends React.Component  {
  constructor(props) {
    super(props);
    this.state = {
      base: 'USD',
      baseValue:1,
      loading: true,
      secondCurrency:'AUD',
      rate:0,
    }
  }

  componentDidMount(){
    const { base,baseValue,secondCurrency,} = this.state;
    this.getRatesData(base,baseValue, secondCurrency)
  }
  changeBase = (event) => { 
    const base = event.target.value;
    this.setState({ base});
    this.getRatesData(this.baseValue,base,this.state.secondCurrency);
  }
  
  changeCurrencyAmount = (event)=>{
    const baseValue = event.target.value
    this.setState({baseValue});
    this.getRatesData(baseValue,this.state.base,this.state.secondCurrency);
  }

  changeSecondCurrency = (event)=>{
    const secondCurrency = event.target.value;
    this.setState({ secondCurrency});
    this.getRatesData(this.state.baseValue,this.state.base,secondCurrency);
  }

  getRatesData = (baseValue,base,secondCurrency) => {
    this.setState({ loading: true });
    fetch(`https://altexchangerateapi.herokuapp.com/latest?amount=${baseValue}from=${base}&to=${secondCurrency}`)
      .then(Status)
      .then(json)
      .then(data => {
        console.log(data)
        if (data.error) {
          throw new Error(data.error);
        }
        const rate = data.rates[secondCurrency];
        this.setState({
          rate,
          baseValue: 1,
          secondCurrency,
          loading: false,
        });
      })
      .catch(error => console.error(error.message));
  }
  render() {
    const { base, baseValue,secondCurrency,rate} = this.state;
    return (
      <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
              <form className="justify-content-center">
              <input
              className='form-input'
              type='text'
              placeholder='Enter currency amount'
              value={baseValue}
              onChange={this.changeCurrencyAmount}            
              />
                <select value={base} onChange={this.changeBase} className="form-control form-control-lg " >
                  {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
                </select>
                <div class="text-center">
                    <img className='arrow' src={require('./images/arrow.svg').default} alt='convert-arrow' />
                    </div>
                <select value={secondCurrency} onChange={this.changeSecondCurrency} className="form-control form-control-lg " >
                {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
              </select>
              <div><h4>{rate}</h4></div>
              </form>
          </div>
        </div>
      </div>
    </>
    )
  }
}

export default CurrencyConverter;
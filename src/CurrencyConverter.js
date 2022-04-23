import React from 'react';
import currencies from './utils/currencies';
import {Status, json } from './utils/fetchUtils';


// next it needs to display the amount of the converted currency (ie 1k aud to usd is 736)
class CurrencyConverter extends React.Component  {
  constructor() {
    super();
    this.state = {
      base: 'USD',
      baseValue:0,
      rates: '',
      loading: true,
      amount:'',
      secondCurrency:'AUD',
      secondValue:0,
    }
  }
  changeBase = (event) => {
    this.setState({ base: event.target.value });
    this.getRatesData(event.target.value);
  }
  
  changeCurrencyAmount = (event)=>{
    this.setState({ amount: event.target.value });
    this.getRatesData(event.target.value);
  }

  changeSecondCurrency = (event)=>{
    this.setState({ secondCurrency: event.target.value });
    this.getRatesData(event.target.value);
  }
// need to resolve issue here, cannot add second currecny for the api fetch
  getRatesData = (amount,base,secondCurrency) => {
    this.setState({ loading: true });
    fetch(`https://altexchangerateapi.herokuapp.com/latest?amount=${amount}from=${base}&to=${secondCurrency}`)
      .then(Status)
      .then(json)
      .then(data => {
        console.log(data)
        if (data.error) {
          throw new Error(data.error);
        }

        const rates = Object.keys(data.rates)
          .filter(acronym => acronym !== base||secondCurrency)
          .map(acronym => ({
            acronym,
            rate: data.rates[acronym],
            name: currencies[acronym].name,
            symbol: currencies[acronym].symbol,
          }))

        this.setState({ rates, loading: false });
      })
      .catch(error => console.error(error.message));
  }
  render(getRatesData) {
    const { base,secondCurrency} = this.state;
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
              </form>
          </div>
        </div>
      </div>
    </>
    )
  }
}

export default CurrencyConverter;
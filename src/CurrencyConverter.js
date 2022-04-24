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

  componentDidMount(){
    const { base, secondCurrency,amount} = this.state;
    this.getRatesData(base, secondCurrency,amount)
  }
  changeBase = (event) => {
    const base = event.Target.value;
    this.setState({ base});
    this.getRatesData(base,this.state.secondCurrency );
  }
  
  changeCurrencyAmount = (event)=>{
    const amount = event.target.value
    this.setState({amount});
    this.getRatesData(amount,this.state.secondCurrency,this.state.base);
  }
np
  changeSecondCurrency = (event)=>{
    const secondCurrency = event.target.value;
    this.setState({ secondCurrency});
    this.getRatesData(this.state.base,secondCurrency);
  }
// API is now working, the issue is it was only call convert was is initially put in, if you try to change the amount its fine, if you try to change the currecny it will throw an error
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
        
        this.setState({ base,secondCurrency,amount, loading: false });
      })
      .catch(error => console.error(error.message));
  }
  render() {
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
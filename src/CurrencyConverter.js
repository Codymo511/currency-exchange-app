import React from 'react';
import currencies from './utils/currencies';
//need to first pull currencies to select which one you want to convert ( so two boxes, one for each currency)
//Next I need to be able to change the amount of the currency, open box with number to type in
// next it needs to display the amount of the converted currency (ie 1k aud to usd is 736)
class CurrencyConverter extends React.Component  {
  constructor() {
    super();
    this.state = {
      base: 'USD',
      rates: '',
      loading: true,
      currencyAmount:'',
      secondCurrency:'AUD'
    }
  }
  changeBase = (event) => {
    this.setState({ base: event.target.value });
  }
  
  changeCurrencyAmount = (event)=>{
    this.setState({ currencyAmount: event.target.value });
  }

  changeSecondCurrency = (event)=>{
    this.setState({ secondCurrency: event.target.value });
  }

  render() {
    const { base,secondCurrency} = this.state;
    console.log(base,secondCurrency)
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
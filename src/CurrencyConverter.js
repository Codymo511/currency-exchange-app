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
    }
  }
  changeBase = (event) => {
    this.setState({ base: event.target.value });
  }
  
  changeCurrencyAmount = (event)=>{
    this.setState({ currencyAmount: event.target.value });
  }
  render() {
    const { base} = this.state;
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
              </form>
          </div>
        </div>
      </div>
    </>
    )
  }
}

export default CurrencyConverter;
import React from 'react';
import currencies from './utils/currencies';
import {Status, json } from './utils/fetchUtils';


// now fix so you can change second value and convert
class CurrencyConverter extends React.Component  {
  constructor(props) {
    super(props);
    
    this.state = {
      base:'AUD',
      baseValue:'1',
      loading: true,
      secondCurrency:'JPY',
      secondValue:'',
    }
  }

  componentDidMount(){
    const { baseValue,base,secondCurrency} = this.state;
    this.getRatesData( baseValue,base,secondCurrency)
  }
  changebase = (event) => { 
    const base = event.target.value;
    this.setState({ base});
    this.getRatesData(this.state.baseValue,base,this.state.secondCurrency);
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
  }
  changeSecondValue = (event)=>{
    const SecondValue = event.target.value
    this.setState({SecondValue});
    this.getRatesData(SecondValue,this.state.base,this.state.secondCurrency);
  }


  getRatesData = (baseValue,base,secondCurrency) => {
    this.setState({ loading: true });
    console.log(baseValue,base,secondCurrency)
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
          baseValue,
          secondCurrency,
          secondValue,
          loading: false,
        });
      })
      .catch(error => console.error(error.message));
  }
  render() {
    const { baseCurrency,baseValue,secondCurrency,rate} = this.state;
    return (
      <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
              <form className="justify-content-center">
              <input
              className='form-input'
              type='number'
              placeholder='Enter currency amount'
              value={baseValue}
              onChange={this.changeCurrencyAmount}            
              />
                <select value={baseCurrency} onChange={this.changebase} className="form-control form-control-lg " >
                  {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
                </select>
                <div class="text-center">
                    <img className='arrow' src={require('./images/arrow.svg').default} alt='convert-arrow' />
                    </div>
                <select value={secondCurrency} onChange={this.changeSecondCurrency} className="form-control form-control-lg " >
                {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
              </select>
              <div><h4><input value={rate} onChange={this.changeSecondValue} /></h4></div>
              </form>
          </div>
        </div>
      </div>
    </>
    )
  }
}

export default CurrencyConverter;
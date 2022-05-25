import React from 'react';
import currencies from './utils/currencies';
import {Status, json } from './utils/fetchUtils';
import './styles/main.css';


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


  //Fix issue secondCurrency issue, as of now it is imutable. the api will call correctly but the updated state is not being shown in the input boxes 
  changeSecondValue = (event) =>{ //change to new base value
   const baseValue=event.target.value
   // this.setState({
   //  baseValue,
   //  });
   console.log("change second value" + baseValue,this.state.secondCurrency,this.state.base)
   this.reverseRatesData(baseValue,this.state.base,this.state.secondCurrency,); //call api with reversed currencies 
  }

  reverseRatesData = (baseValue,secondCurrency,base) => {       //api is called with new base value 
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
  render() {
    const { baseCurrency,baseValue,secondCurrency,rate} = this.state;
    return (
      <>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-sm-12 ">
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
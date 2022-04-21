import React from 'react';
import currencies from './utils/currencies';
import {Status, json } from './utils/fetchUtils';
import ExchangeTable from './components/ExchangeTable';


class ExChange extends React.Component {
  constructor() {
    super();
    this.state = {
      base: 'USD',
      rates: '',
      loading: true,
    }
  }

  componentDidMount() {
    this.getRatesData(this.state.base);
  }

  changeBase = (event) => {
    this.setState({ base: event.target.value });
    this.getRatesData(event.target.value);
  }

  getRatesData = (base) => {
    this.setState({ loading: true });
    fetch(`https://altexchangerateapi.herokuapp.com/latest?from=${base}`)
      .then(Status)
      .then(json)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }

        const rates = Object.keys(data.rates)
          .filter(acronym => acronym !== base)
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

  render () {
    const { base, rates, loading } = this.state;

    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
                <form className="justify-content-center">
                  <h3 className="mb-4"><b className="ml-1">1</b></h3>
                  <select value={base} onChange={this.changeBase} className="form-control form-control-lg " disabled={loading}>
                    {Object.keys(currencies).map(currencyAcronym => <option key={currencyAcronym} value={currencyAcronym}>{currencyAcronym}</option>)}
                  </select>
                </form>
                <div className="currency-table">
                <ExchangeTable base={base} rates={rates} /> 
                </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default ExChange;
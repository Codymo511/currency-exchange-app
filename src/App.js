import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import navbar from "./components/navbar"
import currencyconverter from './CurrencyConverter';
import exchange from './Exchange';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
<style>
@import url('https://fonts.googleapis.com/css2?family=Podkova&display=swap');
</style>

const NotFound = ()=>{
  return <h2>404 Not Found</h2>
}


function App() {
  return (
    <Router>
      <Route component ={navbar}/>
        <div className=' main-container d-flex justify-content-around pt-4 pb-3'>
          <h4 className="exchange-link ml-4"><Link to="/Exchange/">Exchange</Link></h4>
          <h4 className="convert-link"><Link to="/">Convert currency</Link></h4>
        </div>
    
      <Switch>
        <Route path ="/Exchange" component={exchange}/>
        <Route exact path="/" component={currencyconverter} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;

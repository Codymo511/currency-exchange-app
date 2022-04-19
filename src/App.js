import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import navbar from "./components/navbar"
import currencyconverter from './CurrencyConverter';
import exchange from './Exchange';
import 'bootstrap/dist/css/bootstrap.min.css';



const NotFound = ()=>{
  return <h2>404 Not Found</h2>
}


function App() {
  return (
    <Router>
      <Route component ={navbar}/>
      <div >
      <h4><Link to="/Exchange/">Exchange</Link></h4>
      <h4><Link to="/">Convert currency</Link></h4>
      </div>
      <Switch>
        <Route path ="/Exchange" component={exchange} />
        <Route exact path="/" component={currencyconverter} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;

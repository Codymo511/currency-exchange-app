import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import navbar from "./components/navbar"
import currencyconverter from './CurrencyConverter';
import exchange from './Exchange';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


const NotFound = ()=>{
  return <h2>404 Not Found</h2>
}


function App() {
  return (
    <Router>
      <Route component ={navbar}/>
        <div className=' main-container d-flex justify-content-around'>
          <h4 className="ml-4"><Link to="/Exchange/">Exchange</Link></h4>
          <h4><Link to="/">Convert currency</Link></h4>
        </div>
    
      <Switch>
        <Route path ="/Exchange" component={exchange} activeStyle={{border:"3px solid #4332AC"}}/>
        <Route exact path="/" component={currencyconverter} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;

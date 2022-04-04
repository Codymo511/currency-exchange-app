import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import navbar from "./components/navbar"
import Home from './Home';
import exchange from './Exchange';
import 'bootstrap/dist/css/bootstrap.min.css';



const NotFound = ()=>{
  return <h2>404 Not Found</h2>
}


function App() {
  return (
    <Router>
      <Route component ={navbar}/>
      <h4><Link to="/Exchange/">Exchange</Link></h4>
      <h4><Link to="/">Home</Link></h4>
      <Switch>
        <Route path ="/Exchange" component={exchange} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;

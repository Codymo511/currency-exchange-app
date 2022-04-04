import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './Home';
import exchange from './Exchange';
import './App.css';



const NotFound = ()=>{
  return <h2>404 Not Found</h2>
}


function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">Currency Exchange</Link>
      
      </nav>
      <h4><Link to="/Exchange/">Exchange</Link></h4>
      <Switch>
        <Route path="/Exchange" component={exchange} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
        </Switch>
    </Router>
  );
}

export default App;

import React from 'react';
import { DropdownButton, Dropdown} from 'react-bootstrap';

class exchange extends React.Component {
  constructor(props){
  super(props)
  this.state={
    currencyExchange:'',
    results:[]

}
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(event) {
    this.setState({ currencyExchange: event.target.value });
  }
  handleSubmit(event) {
    event.preventDefault();
    // doing nothing for now
  }

  render() {
    return (
    <DropdownButton id="dropdown-basic-button" title="Dropdown button">
      <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
   </DropdownButton>
    )
  }
}

export default exchange;
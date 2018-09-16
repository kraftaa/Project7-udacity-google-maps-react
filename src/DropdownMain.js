import React, {Component} from 'react';
import App from './App'

class DropdownMain extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      querySelector:'food'
    };
  }

  handleChange(event){
    this.setState({querySelector:event.target.value});
  }

  render() {
    var message = 'You selected ' + this.state.querySelector;
    console.log("dd", this.state.querySelector);
    return (
    <div>
      <div>

        <select
          value={this.state.querySelector}
          onChange={this.handleChange}
        >
          <option value="pool">Pool</option>
          <option value="food">Food</option>
          <option value="museum">Museum</option>
          <option value="art">Art</option>

        </select>
        <p>{message}</p>
      </div>
      <div>
      <App
      querySelector={this.state.querySelector}/>
      </div>
      </div>
    );
  }
}

export default DropdownMain;
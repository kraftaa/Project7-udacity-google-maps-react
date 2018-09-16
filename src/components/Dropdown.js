import React, {Component} from 'react';
// import App from './App'

class Dropdown extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      querySelector:''
    };
  }

  handleChange(event){

    this.props.updateQuery(event.target.value);
    this.setState({querySelector:event.target.value});
  }

  // submitHandler(evt) {
  //   evt.preventDefault();
  //   // pass the input field value to the event handler passed
  //   // as a prop by the parent (App)
  //   this.props.handlerFromParant(this.state.inputField);

  //   this.setState({
  //     inputField: ''
  //   });
  // // }
  //           <option value="50327c8591d4c4b30a586d5d">Brewery</option>
  //         <option value="4d4b7105d754a06374d81259">Food</option>
  //         <option value="4bf58dd8d48988d181941735">Museum</option>
  //         <option value="4d4b7105d754a06377d81259">Outdoor & recreation</option>
          // this.props.updateQuery = {this.state.querySelector}
//
  render() {
    var message = 'You selected ' + this.state.querySelector;
    console.log("dd", this.state.querySelector);
    return (
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
    );
  }
}

export default Dropdown;
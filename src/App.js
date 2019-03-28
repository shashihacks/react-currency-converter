import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'

class App extends Component {
  constructor(props) {
    super(props)
    this.currencies = [
      'AUD',
      'USD',
      'CAD',
      'CHF',
      'JPY',
      'INR',
      'EUR',
      'GBP'
    ]
    this.cached = {}
    this.state = {
      base: 'USD',
      other: 'GBP',
      converted: '0',
      value: '0'
    }
  }

  render() {
    return (
      <div>
        <div>
          <select onChange={this.handleChange}  name="base" value={this.state.base}>
            {this.currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}
          </select>
          <input onChange={this.changeValue}  value={this.state.value} />
        </div>
        <div>
          <select onChange={this.handleChange} name="other" value={this.state.other}>
                {this.currencies.map(currency => <option key={currency} value={currency}>{currency}</option>)}

          </select>
          <input value={this.state.converted ===null ? 'Converting....' :this.state.converted } disabled />
        </div>

      </div>
    );
  }


  handleChange=(event)=>{
    console.log("handling change")
      this.setState({
          [event.target.name] : event.target.value
      }, this.recalculate())
      console.log(this.state, 'state change')
  }


  recalculate = ()=> {
   
console.log(isNaN(parseFloat(this.state.value)), typeof((this.state.value)))
// Check why state is not set and multiplying with numbers
//  if(this.cached[this.state.base]!==undefined && (Date.now() - this.cached[this.state.base].timestamp < 1000 * 60)) {
//    console.log('inside cache',  this.cached[this.state.base].rates[this.state.other]  * parseFloat(2))
//    let x = this.cached[this.state.base].rates[this.state.other] * 2
//    console.log(x)
//    this.setState({
//      converted: parseFloat(this.cached[this.state.base].rates[this.state.other]) * parseFloat(this.state.value)
//    })
   
//  }
//  else {
  axios.get(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`).then(response =>{

        console.log(response.data.rates[this.state.other],typeof(response.data.rates[this.state.other]) )
        console.log(parseFloat(this.state.value))
        this.cached[this.state.base] ={
          rates: response.data.rates,
          timestamp: Date.now()
        }
        if(this.state.value=='') {
          this.setState({
            converted:''
          })
        }
        else {
        this.setState({
          converted : response.data.rates[this.state.other] *  parseFloat(this.state.value)
        })
      }
      })
    
    // }
 
   }

  changeValue =(event)=>{
    console.log('changing val')
    this.setState({
      value: event.target.value,
      converted:null
    }, this.recalculate())
    
    
    
  }






}

export default App;

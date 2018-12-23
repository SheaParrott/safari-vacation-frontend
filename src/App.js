import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

class App extends Component {
  CORS_ANYWHERE_URL = 'https://cors-anywhere.herokuapp.com/'
  constructor(props) {
    super(props)
    this.state = {
      animals: ''
    }
  }
  componentDidMount = () => {
    axios.get(`http://localhost:4567/Animals`).then(response => {
      console.log(response.data)
      this.setState({
        animals: response.data
      })
    })
  }
  showAnimals = () => {
    console.log(this.state.animals)
    // return this.state.animals.map((animal, index) => {
    //   return <p key={index}>{animal.species}</p>
    // })
  }

  render() {
    return (
      <div className="App">
        <h1>Safari Vacation</h1>
        {this.showAnimals()}
      </div>
    )
  }
}

export default App

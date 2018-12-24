import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

// Display all animals seen in the Jungle
// Remove all animals that I have seen in the Desert.
// Add all the CountOfTimesSeen and get a total number of animals seen
// Get the CountOfTimesSeen of lions, tigers and bears

class App extends Component {
  CORS_ANYWHERE_URL = 'https://cors-anywhere.herokuapp.com/'
  constructor(props) {
    super(props)
    this.state = {
      animals: [],
      jungleAnimals: []
    }
  }
  componentDidMount = () => {
    axios.get(`http://localhost:4567/Animals`).then(response => {
      this.setState({
        animals: response.data
      })
    })
  }
  showAllAnimals = () => {
    return this.state.animals.map((animal, index) => {
      return <p key={index}>{animal.species}</p>
    })
  }
  GetAnimalsSeenInJungle = () => {
    console.log('clicked')
    axios.get(`http://localhost:4567/Animal/jungle`).then(response => {
      this.setState({
        jungleAnimals: response.data
      })
    })
  }
  showAllAnimalsSeenInJungle = () => {
    console.log(this.state.jungleAnimals)
    return this.state.jungleAnimals.map((animal, index) => {
      return <p key={index}>{animal.species}</p>
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Safari Vacation</h1>
        <h4>
          Did you have a fun time on the Safari tour? I sure hope so. Here is a
          list of all the animals you seen on the tour!
        </h4>
        {this.showAllAnimals()}
        <h4>Here are all the animals you seen in the jungle</h4>
        <button onClick={this.GetAnimalsSeenInJungle}>submit</button>
        {this.showAllAnimalsSeenInJungle()}
        <h1>wtf why is this not working</h1>
      </div>
    )
  }
}

export default App

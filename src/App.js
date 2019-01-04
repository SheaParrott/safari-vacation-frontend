import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

// [x] Finish all the endpoints from the Safari API
// [] Create a simple react app, that uses some css make it looks friendly.
// The react app should:
// [x] Display all animals the user has seen
// [x]Display all animals seen in the Jungle
// [x] Remove all animals that I have seen in the Desert.
//    - done this through state manipulation
//    - this will ensure you can still see all animals seen if desired
// [] Add all the CountOfTimesSeen and get a total number of animals seen
// []Get the CountOfTimesSeen of lions, tigers and bears

class App extends Component {
  CORS_ANYWHERE_URL = 'https://cors-anywhere.herokuapp.com/'
  constructor(props) {
    super(props)
    this.state = {
      animalsShown: [],
      allAnimals: [],
      animalsNotSeenInDesert: [],
      jungleAnimals: []
    }
  }

  componentDidMount = () => {
    this.getAllAnimals()
    this.GetAnimalsSeenInJungle()
  }
  getAllAnimals = () => {
    axios.get(`http://localhost:4567/Animals`).then(response => {
      this.setState(
        {
          allAnimals: response.data
        },
        () => {
          this.changeStateOfAnimalsShown()
        }
      )
    })
  }
  changeStateOfAnimalsShown = () => {
    this.setState({
      animalsShown: this.state.allAnimals
    })
  }
  showAnimals = () => {
    return this.state.animalsShown.map((animal, index) => {
      return (
        <div>
          <p key={index}>{animal.species}</p>
        </div>
      )
    })
  }
  GetAnimalsSeenInJungle = () => {
    // console.log('clicked')
    axios.get(`http://localhost:4567/Animal/jungle`).then(response => {
      this.setState({
        jungleAnimals: response.data
      })
    })
  }
  showAllAnimalsSeenInJungle = () => {
    // console.log(this.state.jungleAnimals)
    return this.state.jungleAnimals.map((animal, index) => {
      return (
        <div>
          <p key={index}>{animal.species}</p>
        </div>
      )
    })
  }
  deleteAllDesertAnimals = () => {
    // console.log(this.state.allAnimals[0].location_of_last_seen)
    let animalsWithoutDesert = this.state.allAnimals.filter(
      removeDesertAnimals => {
        return removeDesertAnimals.location_of_last_seen !== 'desert'
      }
    )
    // console.log(animalsWithoutDesert)
    this.setState({
      animalsShown: animalsWithoutDesert
    })
  }

  render() {
    return (
      <div className="App">
        <h1>Safari Vacation</h1>
        <h4>
          Did you have a fun time on the Safari tour? I sure hope so. Here is a
          list of the animals you seen on the tour!
        </h4>
        {this.showAnimals()}
        <h4>Here are all the animals you seen in the jungle</h4>
        {this.showAllAnimalsSeenInJungle()}
        <h4>
          I remeber the desert was not your favorite part of the tour. Click the
          button below to remove them from your list
        </h4>
        <button onClick={this.deleteAllDesertAnimals}>submit</button>
      </div>
    )
  }
}

export default App

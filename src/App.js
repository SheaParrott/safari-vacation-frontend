import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import banner from './images/banner.jpg'

// [x] Finish all the endpoints from the Safari API
// [x] Create a simple react app, that uses some css make it looks friendly.
// The react app should:
// [x] Display all animals the user has seen
// [x]Display all animals seen in the Jungle
// [x] Remove all animals that I have seen in the Desert.
//    - done this through state manipulation
//    - this will ensure you can still see all animals seen if desired
// [x] Add all the CountOfTimesSeen and get a total number of animals seen
// [x]Get the CountOfTimesSeen of lions, tigers and bears

class App extends Component {
  CORS_ANYWHERE_URL = 'https://cors-anywhere.herokuapp.com/'
  constructor(props) {
    super(props)
    this.state = {
      animalsShown: [],
      allAnimals: [],
      numberOfAnimalsSeen: '',
      numberOfLionsTigersAndBears: '',
      animalsNotSeenInDesert: [],
      jungleAnimals: []
    }
  }

  componentDidMount = () => {
    this.getAllAnimals()
    this.GetAnimalsSeenInJungle()
    this.getCountOfAnimalsSeen()
    this.getCountOfLionsTigersAndBears()
  }
  getCountOfLionsTigersAndBears = () => {
    axios.get(`http://localhost:4567/Count/LTB`).then(response => {
      this.setState({
        numberOfLionsTigersAndBears: response.data
      })
    })
  }
  getCountOfAnimalsSeen = () => {
    axios.get(`http://localhost:4567/Count`).then(response => {
      this.setState({
        numberOfAnimalsSeen: response.data
      })
    })
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
  removeAllDesertAnimals = () => {
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
        <header>
          <h1>Safari Vacation</h1>
        </header>
        <div className="page">
          <h4>
            Did you have a fun time on the Safari tour? I sure hope so. Here is
            a list of the animals you seen on the tour! You saw{' '}
            {this.state.numberOfAnimalsSeen.total_count_of_times_seen} animals
            on this tour.{' '}
            {
              this.state.numberOfLionsTigersAndBears
                .total_count_of_times_seen_LTB
            }{' '}
            of these were Lions, Tigers and Bears.
          </h4>
          {this.showAnimals()}
          <h4>
            Since the desert was not your favorite part of the tour. Click the
            button below to remove them from your list above.
          </h4>
          <button onClick={this.removeAllDesertAnimals}>submit</button>
          <h4>All the animals you saw in the jungle:</h4>
          {this.showAllAnimalsSeenInJungle()}
        </div>
      </div>
    )
  }
}

export default App

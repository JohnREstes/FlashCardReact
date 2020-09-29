import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import BuildCardStack from './components/buildCardStack.js';
import BuildCard from './components/buildCard.js';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      flashCards:[],
      loading: true
    }

  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/collections`)
    .then(res => this.setState({ 
      flashCards: res.data,
      loading: false
    }));
  }

  render(){
    return (this.state.loading ? <div>Loading...</div> : (
      <div>
          <div id="titleHeader">
            <h1>Flash Cards</h1>
          </div>
            <div className="container-fluid">
              <div className="row display-flex" id="card">
              <BuildCardStack data={this.state.flashCards}/>
              </div>
            </div> 
      </div>
      )
    )
  }  
}

export default App;
import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import BuildCardStack from './components/buildCardStack.js';
import BuildCard from './components/buildCard.js';
import Modal from './components/modal.js';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      flashCards:[],
      loading: true, 
      isShowing: false
    }

  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/collections`)
    .then(res => this.setState({ 
      flashCards: res.data,
      loading: false
    }));
  }

  openModalHandler = () => {
    this.setState({
        isShowing: true
    });
}

    closeModalHandler = () => {
        this.setState({
            isShowing: false
        });
    }

  render(){
    return (this.state.loading ? <div>Loading...</div> : (
      <div>
          <div>
            { this.state.isShowing ? <div onClick={this.closeModalHandler} className="back-drop"></div> : null }

            <button className="open-modal-btn" onClick={this.openModalHandler}>Open Modal</button>
          <div id="titleHeader">
            <h1>Flash Cards</h1>
          </div>
            <div className="container-fluid d-flex justify-content-around">
                <BuildCardStack data={this.state.flashCards}/>
            </div> 

                <Modal
                    className="modal"
                    show={this.state.isShowing}
                    close={this.closeModalHandler}>
                        Maybe aircrafts fly very high because they don't want to be seen in plane sight?
                </Modal>
            </div>
      </div>
      )
    )
  }  
}

export default App;


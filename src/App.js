import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import BuildCardStack from './components/buildCardStack.js';
import BuildCard from './components/buildCard.js';
import Modal from 'react-awesome-modal';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      flashCards:[],
      loading: true, 
      visible : false
    }

  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/collections`)
    .then(res => this.setState({ 
      flashCards: res.data,
      loading: false
    }));
  }

  openModal() {
    this.setState({
        visible : true
    });
  }

  closeModal() {
      this.setState({
          visible : false
      });
  }

  render(){
    return (this.state.loading ? <div>Loading...</div> : (
      <div>
        <div>
            <div id="titleHeader">
              <h1>Flash Cards</h1> 
              <input type="button" value="Add New" onClick={() => this.openModal()} />
            </div>
            <div className="container-fluid d-flex justify-content-around">
                <BuildCardStack data={this.state.flashCards}/>
            </div> 
        </div>
        <div>
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <h1>Title</h1>
                        <p>Some Contents</p>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                    </div>
                </Modal>
        </div>
      </div>
      )
    )
  }  
}

export default App;


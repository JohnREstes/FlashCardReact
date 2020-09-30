import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
//import BuildCard from './components/buildCardStack.js';
import BuildCard from './components/buildCard.js';
import Modal from 'react-awesome-modal';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      flashCards:[],
      loading: true, 
      visible : false,
      cardClicked: false
    }
    this.handleClick = this.handleClick.bind(this);
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


  handleClick(event){
    this.setState({
      cardClicked: true
    });
    console.log(event)
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
                <BuildCard 
                data={this.state.flashCards}
                handleClick={this.handleClick}
                />
            </div> 
        </div>
        <div>
                <Modal visible={this.state.visible} width="500" height="300" effect="fadeInDown" onClickAway={() => this.closeModal()}>
                    <div>
                        <h1>Title</h1>
                        <p> Some Contents</p>
                        <button onClick={() => this.closeModal()}>Close</button>
                    </div>
                </Modal>
        </div>
      </div>
      )
    )
  }  
}

export default App;


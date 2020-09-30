import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import $ from 'jquery';
import BuildCard from './components/buildCard.js';
import Modal from 'react-awesome-modal';

const currentId = [0,0];

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      flashCards:[],
      loading: true, 
      visible : false,
      cardClickedId: ''
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


  handleClick(id){
    currentId[0] = id;
    this.setState({
      cardClickedId: id,
    });
    $(`#${currentId[0]}`).css('border', '5px blue solid');
    $(`#${currentId[1]}`).css('border', '1px black solid');
    currentId[1] = id;
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


import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import $ from 'jquery';
import BuildCard from './components/buildCard.js';
import Modal from 'react-awesome-modal';

var currentId = [0,0];
var timesClicked = 0;
var initial = true;

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      flashCards:[],
      loading: true, 
      visible : false,
      selected: '5f7271353a65fd058f778aeb',
      selectedCard: '',
      wordDefinitons: [],
      initialWord: "",
      initialDefinition: ""
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleWordChange = this.handleWordChange.bind(this)
    this.handleDefinitionChange = this.handleDefinitionChange.bind(this)
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/collections`)
    .then(res => this.setState({ 
      flashCards: res.data,
      loading: false
    }));
  }

  handleWordChange = event => {
    this.setState({ initialWord: event.target.value });
  }

  handleDefinitionChange = event => {
    this.setState({ initialDefinition: event.target.value });
  }

  handleSelect = event => { 
    this.setState({selected: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    const CardString = {
      word: this.state.initialWord,
      definition: this.state.initialDefinition
    };  

    axios.post(`http://localhost:5000/api/collections/${this.state.selected}/cards`, CardString)
    .then(res => {
      window.location.reload(false);
    })
  }

  handleChange = event => {
    event.preventDefault();
    const CardString = {
      word: this.state.word,
      definition: this.state.definition
    };  

    axios.put(`http://localhost:5000/api/collections/${this.state.selected}/cards/${this.state.selectedCard}`, CardString)
    .then(res => {
      window.location.reload(false);
    })
  }

  openModal() {
    this.setState({
      visible : true,
      initialDefinition: "",
      initialWord:  ""
    });
  }

  closeModal() {
    this.setState({
      visible : false,
      initialDefinition: "",
      initialWord:  ""
  });
  }


  handleClick(name){
    var direction = name.split('-').pop();
    var id = name.split('-').shift();
    var titleId = id + "-title";
    var numberId = id + "-number";
    var editId = id +"-edit";
    var arrayPostion = this.state.flashCards.findIndex(x => x._id === id);
    var arrayLength = ((this.state.flashCards[`${arrayPostion}`].cards.length) * 2);
    var string = "";
    var cardPosition = 0;
    console.log(id);
    if(direction === "left"){
      if(timesClicked === 0){
        timesClicked = (arrayLength - 1);
      }else{
        timesClicked--;
      }
    }else if(direction === "edit"){
      console.log(editId);
      this.setState({
        visible : true
      });
    }else{
      if(initial === false){
        timesClicked++;
      }
    }
      if(currentId[0] !== id){
        currentId[0] = id;
        timesClicked = 0;
        $(`#${currentId[0]}`).css('border', '10px #A1C7E4 solid');
        $(`#${currentId[1]}`).css('border', '1px black solid');
        currentId[1] = id;
      }else{
        if(timesClicked%2 === 0 && (timesClicked !== arrayLength)){
          $(`#${currentId[0]}`).removeClass('cardContainerWhite').addClass('cardContainer');
          cardPosition = (timesClicked/2);
          string = this.state.flashCards[`${arrayPostion}`].cards[`${cardPosition}`].word;
          this.setState({
            initialWord : this.state.flashCards[`${arrayPostion}`].cards[`${cardPosition}`].word,
            initialDefinition: this.state.flashCards[`${arrayPostion}`].cards[`${cardPosition}`].definition,
            selectedCard: this.state.flashCards[`${arrayPostion}`].cards[`${cardPosition}`].id
          });
          $(`#${titleId}`).animate({left: '50px'}).html(`<h1>${string}</h1>`);
          $(`#${numberId}`).html(`<h2>${((timesClicked)+1)} of ${arrayLength}</h2>`);
          $(`#${editId}`).css('display', 'inline');
          initial = false;
        }else if (timesClicked%2 === 1  && (timesClicked !== arrayLength)){
          $(`#${currentId[0]}`).removeClass('cardContainer').addClass('cardContainerWhite');
          cardPosition = Math.floor(timesClicked/2);
          string = this.state.flashCards[`${arrayPostion}`].cards[`${cardPosition}`].definition;
          $(`#${titleId}`).animate({left: '0px'}).html(`<h2>${string}</h2>`);
          $(`#${numberId}`).html(`<h2>${((timesClicked)+1)} of ${arrayLength}</h2>`);
          $(`#${editId}`).css('display', 'none');
        }else{
          timesClicked = 0;
          initial = true;
          $(`#${titleId}`).html(`<h1 class="hidden" id="titleBar${id}">` + this.state.flashCards[`${arrayPostion}`].title + ' Deck</h1>');
          $(`#titleBar${id}`).slideDown()
          $(`#${currentId[0]}`).removeClass('cardContainerWhite').addClass('cardContainer');
          $(`#${numberId}`).html(`<h2 class="hidden">John</h2>`);
          $(`#${editId}`).css('display', 'none');
        }
      }
      console.log(timesClicked);  
  }

  render(){
    return (this.state.loading ? <div className="loading"><span>  </span>Loading...</div> : (
      <div>
        <div className="container-fluid">
            <div className="row" id="titleHeader">
            <div className="col-12 d-flex justify-content-around">
              <h1>Flash Cards</h1> 
            </div>
            </div>
            <div className="row">
            <div className="container-fluid d-flex justify-content-around">
            <input type="button" value="Add New" onClick={() => this.openModal()} />
            </div>
            </div>
            <div className="row">
            <div className="container-fluid d-flex justify-content-around">
                <BuildCard 
                data={this.state.flashCards}
                handleClick={this.handleClick}
                />
            </div> 
            </div>
        </div>
        <div>
                <Modal visible={this.state.visible} width="520" height="325" effect="fadeInDown" onClickAway={() => this.closeModal()}>
                    <div>
                      <form onSubmit={this.handleSubmit}>
                        <label id="modalHeader"><h3>Select group to add New Card to: </h3></label>
                        <select name="title" id="title" onChange={this.handleSelect}>
                          <option value="5f7271353a65fd058f778aeb">React</option>
                          <option value="5f72714d3a65fd058f778af2">C#</option>
                          <option value="5f7913b7104ae8731ce1879c">Flutter</option>
                        </select>
                        <label>
                          New Word:
                          <input type="text" name="word" id="word" value={this.state.initialWord} onChange={this.handleWordChange} />
                        </label>
                        <label>
                          New definition:
                          <input type="text" name="definition" id="definition" value={this.state.initialDefinition} onChange={this.handleDefinitionChange} />
                        </label>
                        <div>
                        <button type="submit">Add</button>
                        </div>
                      </form>
                      <div id="closeButton">
                      <button onClick={() => this.closeModal()}>Close</button>
                      </div>
                    </div>
                </Modal>
        </div>
      </div>
      )
    )
  }  
}

export default App;
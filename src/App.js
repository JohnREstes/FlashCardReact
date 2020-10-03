import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import $ from 'jquery';
import BuildCard from './components/buildCard.js';
import Modal from 'react-awesome-modal';

var currentId = [0,0];
var timesClickedWord = 0;
var timesClickedDefinition = 0;
var timesClicked = 0;

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      flashCards:[],
      loading: true, 
      visible : false,
      cardClickedId: '',
      initialString: '',
      word: '',
      definition: '',
      selected: '5f7271353a65fd058f778aeb',
      wordDefinitons: []
    }
    this.handleClick = this.handleClick.bind(this);
    //this.buildJson = this.buildJson.bind(this);
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/collections`)
    .then(res => this.setState({ 
      flashCards: res.data,
      loading: false
    }));
  }

  handleWordChange = event => {
    this.setState({ word: event.target.value });
  }

  handleDefinitionChange = event => {
    this.setState({ definition: event.target.value });
  }

  handleSelect = event => { 
    this.setState({selected: event.target.value});
  }

  handleSubmit = event => {
    event.preventDefault();
    const selectedId = '0';
    const CardString = {
      word: this.state.word,
      definition: this.state.definition
    };  

    axios.post(`http://localhost:5000/api/collections/${this.state.selected}/cards`, CardString)
    .then(res => {
      console.log(res.data);
    })
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


  handleClick(name){
    var direction = name.split('-').pop();
    var id = name.split('-').shift();
    var titleId = id + "-title";
    console.log(name);
    var arrayPostion = this.state.flashCards.findIndex(x => x._id === id);
    var arrayLength = this.state.flashCards[`${arrayPostion}`].cards.length;
    var string = "";
    if(direction === "left"){
      if(timesClickedWord === 0){
        timesClickedWord = arrayLength - 1;
      }else{
        timesClickedWord--;
      }
      if(timesClickedDefinition === 0){
        timesClickedDefinition = arrayLength - 1;
      }else{
        timesClickedDefinition--;
      }
    }
      if(currentId[0] !== id){
        currentId[0] = id;
        this.setState({
          cardClickedId: id,
        });
        timesClickedDefinition = 0;
        timesClickedWord = 0;
        $(`#${currentId[0]}`).css('border', '10px #A1C7E4 solid');
        $(`#${currentId[1]}`).css('border', '1px black solid');
        this.setState({
          initialString: id,
        });
        currentId[1] = id;
      }else{
        if(timesClickedDefinition === timesClickedWord && (timesClickedDefinition !== arrayLength)){
          $(`#${currentId[0]}`).removeClass('cardContainerWhite').addClass('cardContainer');
          string = this.state.flashCards[`${arrayPostion}`].cards[`${timesClickedWord}`].word;
          $(`#${titleId}`).html(`<h2>${string}</h2>`);
          timesClickedWord++;
        }else if (timesClickedDefinition !== timesClickedWord  && (timesClickedDefinition !== arrayLength)){
          $(`#${currentId[0]}`).removeClass('cardContainer').addClass('cardContainerWhite');
          string = this.state.flashCards[`${arrayPostion}`].cards[`${timesClickedDefinition}`].definition;
          $(`#${titleId}`).html(`<h2>${string}</h2>`);
          timesClickedDefinition++;
        }else{
          timesClickedDefinition = 0;
          timesClickedWord = 0;
          $(`#${titleId}`).html(`<h1>` + this.state.flashCards[`${arrayPostion}`].title + '</h1>');
          $(`#${currentId[0]}`).removeClass('cardContainerWhite').addClass('cardContainer');
        }
      }
  }

  // jsonData(id, wordDef){
  //   this.id = id;
  //   this.wordDef = wordDef
  // }

  // buildJson(){
  //   var wordDef  = '';
  //   var numberOfCards = 0;
  //   var wd = [];
  //   var json = {};
  //   var numberOfModules = this.state.flashCards.length;
  //   for(let i = 0; i < numberOfModules; i++){
  //     wordDef = this.state.flashCards[i]._id;
  //     numberOfCards = this.state.flashCards[i].cards.length;
  //     for(let e = 0; e < numberOfCards; e++){
  //       wd[wd.length] = this.state.flashCards[i].cards[e].word;
  //       wd[wd.length] = this.state.flashCards[i].cards[e].definition;
  //     }
  //     json = new this.jsonData(wordDef, wd)
  //   }
  //   var numberOfCards = this.state.flashCards[0].cards[2].word
  //   //wordDef.push({wordDef: this.state.flashCards[0].definition[0].word})
  //   //wordDef.push({id: this.state.flashCards[0]._id})
  //   // wordDef[0].wordDef[0] = this.state.flashCards[0]._id;
  //   // wordDef[0].wordDef[1] = 2;
  //   console.log(wordDef);
  //   console.log(wd);
  //   console.log(json)
  // }

  render(){
    return (this.state.loading ? <div className="loading"><span>  </span>Loading...</div> : (
      <div>
        <div>
            <div className="row" id="titleHeader">
            <div className="container-fluid d-flex justify-content-around">
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
                <Modal visible={this.state.visible} width="500" height="290" effect="fadeInDown" onClickAway={() => this.closeModal()}>
                    <div>
                      <form onSubmit={this.handleSubmit}>
                        <label><h3>Select group to add New Card to: </h3></label>
                        <select name="title" id="title" onChange={this.handleSelect}>
                          <option value="5f7271353a65fd058f778aeb">React</option>
                          <option value="5f72714d3a65fd058f778af2">C#</option>
                        </select>
                        <label>
                          New Word:
                          <input type="text" name="word" onChange={this.handleWordChange} />
                        </label>
                        <label>
                          New definition:
                          <input type="text" name="definition" onChange={this.handleDefinitionChange} />
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

// handleClick(name){
//   var direction = name.split('-').pop();
//   var id = name.split('-').shift();
//   var titleId = id + "-title";
//   console.log(name);
//   var arrayPostion = this.state.flashCards.findIndex(x => x._id === id);
//   var arrayLength = this.state.flashCards[`${arrayPostion}`].cards.length;
//   var string = "";
//   if(direction === "left"){
//     if(timesClickedWord === 0){
//       timesClickedWord = arrayLength - 1;
//     }else{
//       timesClickedWord--;
//     }
//     if(timesClickedDefinition === 0){
//       timesClickedDefinition = arrayLength - 1;
//     }else{
//       timesClickedDefinition--;
//     }
//   }
//     if(currentId[0] !== id){
//       currentId[0] = id;
//       this.setState({
//         cardClickedId: id,
//       });
//       timesClickedDefinition = 0;
//       timesClickedWord = 0;
//       $(`#${currentId[0]}`).css('border', '10px #A1C7E4 solid');
//       $(`#${currentId[1]}`).css('border', '1px black solid');
//       this.setState({
//         initialString: id,
//       });
//       currentId[1] = id;
//     }else{
//       if(timesClickedDefinition === timesClickedWord && (timesClickedDefinition !== arrayLength)){
//         $(`#${currentId[0]}`).removeClass('cardContainerWhite').addClass('cardContainer');
//         string = this.state.flashCards[`${arrayPostion}`].cards[`${timesClickedWord}`].word;
//         $(`#${titleId}`).html(`<h2>${string}</h2>`);
//         timesClickedWord++;
//       }else if (timesClickedDefinition !== timesClickedWord  && (timesClickedDefinition !== arrayLength)){
//         $(`#${currentId[0]}`).removeClass('cardContainer').addClass('cardContainerWhite');
//         string = this.state.flashCards[`${arrayPostion}`].cards[`${timesClickedDefinition}`].definition;
//         $(`#${titleId}`).html(`<h2>${string}</h2>`);
//         timesClickedDefinition++;
//       }else{
//         timesClickedDefinition = 0;
//         timesClickedWord = 0;
//         $(`#${titleId}`).html(`<h1>` + this.state.flashCards[`${arrayPostion}`].title + '</h1>');
//         $(`#${currentId[0]}`).removeClass('cardContainerWhite').addClass('cardContainer');
//       }
//     }
// }

// handleClick(id){
//   console.log(id)
//   if(id !== 'ignore'){
//     let arrayPostion = this.state.flashCards.findIndex(x => x._id === id);
//     let arrayLength = this.state.flashCards[`${arrayPostion}`].cards.length;
//     let string = "";
//     if(currentId[0] !== id){
//       currentId[0] = id;
//       this.setState({
//         cardClickedId: id,
//       });
//       $(`#${currentId[0]}`).css('border', '10px #A1C7E4 solid');
//       $(`#${currentId[1]}`).css('border', '1px black solid');
//       this.setState({
//         initialString: id,
//       });
//       currentId[1] = id;
//     }else{
//       if(timesClickedDefinition === timesClickedWord && (timesClickedDefinition !== arrayLength)){
//         $(`#${currentId[0]}`).removeClass('cardContainerWhite').addClass('cardContainer');
//         string = this.state.flashCards[`${arrayPostion}`].cards[`${timesClickedWord}`].word;
//         $(`#${currentId[0]}`).html(`<h2>${string}</h2>`);
//         timesClickedWord++;
//       }else if (timesClickedDefinition !== timesClickedWord  && (timesClickedDefinition !== arrayLength)){
//         $(`#${currentId[0]}`).removeClass('cardContainer').addClass('cardContainerWhite');
//         string = this.state.flashCards[`${arrayPostion}`].cards[`${timesClickedDefinition}`].definition;
//         $(`#${currentId[0]}`).html(`<h2>${string}</h2>`);
//         timesClickedDefinition++;
//       }else{
//         timesClickedDefinition = 0;
//         timesClickedWord = 0;
//         $(`#${currentId[0]}`).html('<h1>' + this.state.flashCards[`${arrayPostion}`].title + '</h1>');
//         $(`#${currentId[0]}`).removeClass('cardContainerWhite').addClass('cardContainer');
//       }
//   }  }
// }
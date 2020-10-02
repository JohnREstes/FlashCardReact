import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import $ from 'jquery';
import BuildCard from './components/buildCard.js';
import Modal from 'react-awesome-modal';

var currentId = [0,0];
var timesClickedWord = 0;
var timesClickedDefinition = 0;

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
      selected: '',
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
      definition: this.state.definition,
      selected: selectedId
      };  

    axios.post(`http://localhost:5000/api/collections/5f7271353a65fd058f778aeb/cards`, CardString)
    .then(res => {
      console.log(res.data)
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
    console.log(name)
    var direction = name.split('-').pop();
    console.log(direction);
    var id = name.split('-').shift();
    console.log(id)
    var titleId = id + "-title";
    console.log(titleId);
    if(id !== 'ignore'){
      let arrayPostion = this.state.flashCards.findIndex(x => x._id === id);
      let arrayLength = this.state.flashCards[`${arrayPostion}`].cards.length;
      let string = "";
      if(currentId[0] !== id){
        currentId[0] = id;
        this.setState({
          cardClickedId: id,
        });
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
    }  }
  }

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
                <Modal visible={this.state.visible} width="500" height="300" effect="fadeInDown" onClickAway={() => this.closeModal()}>
                    <div>
                      <form onSubmit={this.handleSubmit}>
                        <label>Select group to add New Card to: </label>
                        <select name="group" id="group" onChange={this.handleSelect}>
                          <option value="react">React</option>
                          <option value="c#">C#</option>
                          <option value="new">New Group</option>
                        </select>
                        <label>
                          New Word:
                          <input type="text" name="word" onChange={this.handleWordChange} />
                        </label>
                        <label>
                          New definition:
                          <input type="text" name="definition" onChange={this.handleDefinitionChange} />
                        </label>
                        <button type="submit">Add</button>
                      </form>
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
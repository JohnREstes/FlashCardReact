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
      wordDefinitons: []
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
    const CardString = {
      word: this.state.word,
      definition: this.state.definition
    };  

    axios.post(`http://localhost:5000/api/collections/${this.state.selected}/cards`, CardString)
    .then(res => {
      window.location.reload(false);
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
    var numberId = id + "-number";
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
          $(`#${titleId}`).animate({left: '50px'}).html(`<h1>${string}</h1>`);
          $(`#${numberId}`).html(`<h2>${((timesClicked)+1)} of ${arrayLength}</h2>`);
          initial = false;
        }else if (timesClicked%2 === 1  && (timesClicked !== arrayLength)){
          $(`#${currentId[0]}`).removeClass('cardContainer').addClass('cardContainerWhite');
          cardPosition = Math.floor(timesClicked/2);
          string = this.state.flashCards[`${arrayPostion}`].cards[`${cardPosition}`].definition;
          $(`#${titleId}`).animate({left: '0px'}).html(`<h2>${string}</h2>`);
          $(`#${numberId}`).html(`<h2>${((timesClicked)+1)} of ${arrayLength}</h2>`);
        }else{
          timesClicked = 0;
          initial = true;
          $(`#${titleId}`).html(`<h1 class="hidden" id="titleBar${id}">` + this.state.flashCards[`${arrayPostion}`].title + ' Deck</h1>');
          $(`#titleBar${id}`).slideDown()
          $(`#${currentId[0]}`).removeClass('cardContainerWhite').addClass('cardContainer');
          $(`#${numberId}`).html(`<h2 class="hidden">John</h2>`);
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
                <Modal visible={this.state.visible} width="520" height="290" effect="fadeInDown" onClickAway={() => this.closeModal()}>
                    <div>
                      <form onSubmit={this.handleSubmit}>
                        <label><h3>Select group to add New Card to: </h3></label>
                        <select name="title" id="title" onChange={this.handleSelect}>
                          <option value="5f7271353a65fd058f778aeb">React</option>
                          <option value="5f72714d3a65fd058f778af2">C#</option>
                          <option value="5f7913b7104ae8731ce1879c">Flutter</option>
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

// var titles = [];
// var words = [{}];

// class App extends React.Component {
//   state = {
//   value: "",
//   flashCards:[],
//   };
//     constructor(props) {
//     super(props)
//     this.handleAddItem = this.handleAddItem.bind(this);
//   }
  
//   items = [];

//   componentDidMount() {
//     axios.get(`http://localhost:5000/api/collections`)
//     .then(res => this.setState({ 
//       flashCards: res.data,
//       loading: false
//     }));
//   }

//   handleChange = e => {
//     this.setState({
//       value: e.target.value
//     });
//   };

//   handleAddItem(){
//     var numberOfIds = 0;
//     var numberOfCards = 0;
//     var numberOfClicks = 0;
//     var item = new Object();
//     item.id = this.state.flashCards.map(x => x._id);
//     this.items.push(item)
//     numberOfIds = this.state.flashCards.length;
//     console.log(numberOfIds);
//     for(let i = 0; i < numberOfIds; i++){
//       numberOfCards = this.state.flashCards[i].cards.length;
//       console.log(numberOfCards);
//       for(let e = 0; e < numberOfCards; e++){
//       item.wordDef = this.state.flashCards[i].cards[e].word;
//       item.wordDef += " " + this.state.flashCards[i].cards[e].definition;
//       item.numberOfClicks = 0;
//       this.items[i].push(item)
//       }
//     };
//     console.log(item);
//   };

//   buildString(){
    
//   }

//   render() {
//     const items = this.items.map(item => <p>{item.title}</p>);
//     titles = this.state.flashCards.map(x => x._id + ' ');
//     words = this.state.flashCards.map(x => <p>{x.title}</p>);
//     return (
//       <>
//         <label>
//           <input
//             value={this.state.value}
//             type="text"
//             onChange={this.handleChange}
//           />
//           <button onClick={this.handleAddItem}>Add item</button>
//         </label>
//         <h1>{items}</h1>
//         <h1>{titles}</h1>
//         <h1>{words}</h1>
//       </>
//     );
//   }
// }

// export default App;
import React from 'react'


function BuildCardStack(props){
  
  function handleClick(event){
    props.handleClick(event.target.id);
    console.log(event.target.id)
  }

    console.log(props.data[0].cards[0].word);
    var card = props.data[0].cards.map(cards => {
      const { _id, word, definition} = cards
      return (
        <div className="col-12 col-lg-5 d-flex align-items-center cardContainer" key={_id} id={_id} onClick={handleClick}>
                    <h1>{word}</h1>
                    <h1>{definition}</h1>
        </div>
      )
    })
return (<div className="row d-flex justify-content-between">{card}</div>)
  }

export default BuildCardStack;
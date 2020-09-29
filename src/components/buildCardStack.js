import React from 'react'

function BuildCardStack(props){
    console.log(props.data[0].cards[0].word);
    var card = props.data.map(cards => {
      const { _id, title} = cards
      return (
        <div className="card" key={_id}>
          <h1>{title}</h1>
        </div>
      )
    })
return (<div>{card}</div>)
  }

export default BuildCardStack;
import React from 'react'

function BuildCardStack(props){
    console.log(props.data[0].cards[0].word);
    var card = props.data.map(cards => {
      const { _id, title} = cards
      return (
          
        <div className="card" key={_id}>
            <div className="card-body text-center">
                <h1>{title}</h1>
            </div>
        </div>
      )
    })
return (<div>{card}</div>)
  }

export default BuildCardStack;
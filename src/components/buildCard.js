import React from 'react'


function BuildCardStack(props){

  function handleClick(event){
    console.log(event.target.id);
    props.handleClick(event.target.id);
    
  }
    var card = props.data.map(cards => {
      const { _id, title} = cards
      return (
        <div className="col-12 col-lg-5 d-flex align-items-center cardContainer" key={_id} id={_id} onClick={handleClick}>
                    <h1 id="ignore" onClick={handleClick}>{title}</h1>
        </div>
      )
    })
return (<div className="row d-flex justify-content-between">{card}</div>)
  }

export default BuildCardStack;
import React from 'react'


function BuildCardStack(props){

  function handleClick(event){
    props.handleClick(event.target.id); 
  }
    var card = props.data.map(cards => {
      const { _id, title} = cards;
      const rightId = _id + " right";
      const leftId = _id + " left";
      return (
        <div className="col-12 col-lg-5 cardContainer" key={_id} id={_id}>
          <div className="row">
            <div className="col-1 cardRow">
              <img src="./left.png" className="arrow" alt="left arrow" id={leftId} onClick={handleClick}></img>
            </div>
            <div className="col-10 cardRow d-flex align-items-center">
                    <h1>{title}</h1>
            </div>
            <div className="col-1 cardRow">
              <img src="./right.png" className="arrow" alt="right arrow" id={rightId} onClick={handleClick}></img>
            </div>
          </div>          
        </div>
      )
    })
return (<div className="row d-flex justify-content-between">{card}</div>)
  }

export default BuildCardStack;
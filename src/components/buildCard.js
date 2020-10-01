import React from 'react'


function BuildCardStack(props){

  function handleClick(event){
    props.handleClick(event.target.id);
    
  }
    var card = props.data.map(cards => {
      const { _id, title} = cards
      return (
        <div className="col-12 col-lg-5 cardContainer" key={_id} id={_id} onClick={handleClick}>
          <div className="row">
            <div className="col-1">
              <img src="./left.png" className="arrow"></img>
            </div>
            <div className="col-10"  d-flex align-items-center>
                    <h1 id="ignore" onClick={handleClick}>{title}</h1>
            </div>
            <div className="col-1">
              <img src="./right.png" className="arrow"></img>
            </div>
          </div>          
        </div>
      )
    })
return (<div className="row d-flex justify-content-between">{card}</div>)
  }

export default BuildCardStack;
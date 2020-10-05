import React from 'react'

function BuildSelect(props){

  function handleSelect(event){
    props.handleSelect(event.target.value); 
  }

  var option = props.data.map(cards => {
    const { _id, title } = cards;
    return (
      <option key={_id}>{title}</option>
    )
  })

  return (<select name="title" id="title" onChange={handleSelect}>
    {option}
    </select>)
}  

export default BuildSelect;
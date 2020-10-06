import React from 'react'

function BuildSelect(props){

  function handleSelect(event){
    props.handleSelect(event.target.id);
    console.log(event.target) 
  }

  var option = props.data.map(cards => {
    const { _id, title } = cards;
    return (
      <option key={_id} id={_id}>{title}</option>
    )
  })

  return (<select name="title" onSelect={handleSelect}>
    {option}
    </select>)
}  

export default BuildSelect;
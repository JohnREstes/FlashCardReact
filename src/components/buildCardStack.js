class App extends React.Component {
  state = {
  value: ""
  };

items = [
  {
    id: 0,
    title: "first item"
  },
  {
    id: 1,
    title: "second item"
  },
  {
    id: 2,
    title: "third item"
  }
];

handleChange = e => {
  this.setState({
    value: e.target.value
  });
};

handleAddItem = () => {
  if (this.state.value === "") return;
  const item = new Object();
  item.id = this.items.length;
  item.title = this.state.value;
  this.items.push(item);
  this.setState({
    value: ""
  });

  console.log(this.items);
};

render() {
  const items = this.items.map(item => <p>{item.title}</p>);
  return (
    <>
      <label>
        <input
          value={this.state.value}
          type="text"
          onChange={this.handleChange}
        />
        <button onClick={this.handleAddItem}>Add item</button>
      </label>
      <h1>{items}</h1>
    </>
  );
}
}

ReactDOM.render(<App />, document.getElementById("root"));
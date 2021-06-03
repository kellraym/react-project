import logo from './logo.svg';
import './App.css';
import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = JSON.parse(
      window.localStorage.getItem('state')
    ) || {
      username: 'user',
      toDoList: [],
    }

    this.submit = this.submit.bind(this)
    this.add = this.add.bind(this)
    this.delete = this.delete.bind(this)
    this.finish = this.finish.bind(this)
  }

  componentDidUpdate() {
    window.localStorage.setItem(
      'state',
      JSON.stringify(this.state)
    );
  }

  submit() {
    const username = document.getElementById("username")
    this.setState({ username: username.value })
    username.value = '';
    
  }

  add() {
    const newList = this.state.toDoList
    newList.push(document.getElementsByTagName("select")[0].value + ": " + document.getElementById("todo").value)
    this.setState({
      toDoList: newList
    })
    document.getElementById("todo").value = '';
  }

  delete(event) {
    console.log(event.target.id)
    const popList = this.state.toDoList;
    popList.splice(event.target.id, 1)
    this.setState({ toDoList: popList })
  }

  finish(){
    this.setState({ toDoList: [] })
    document.getElementById("modal").classList.remove(`hidden`);
  }

  close(){
    document.getElementById("modal").classList.add(`hidden`);
  }

  render() {
    return (
      <body id="body">
        <div id="header">
          <h2>Welcome, {this.state.username}!</h2>
          <div id="usernameInput">
            <input id="username" type="text" placeholder="Enter username"/>
            <input type="button" value="submit" onClick={this.submit} />
          </div>
        </div>
        <div id="box">
          <h3>To-do List</h3>
          <div id="todoInput">
            <input id="todo" type="text" />
            <select>
              <option value="Yard Work">Yard Work</option>
              <option value="Extra Duties">Extra Duties</option>
              <option selected value="Emails">Emails</option>
            </select>
            <input type="button" value="add" onClick={this.add} />
          </div>
          <ul>{this.state.toDoList.map((item, ind) => <li id={ind} > {item} <input id={ind} type="button" value="Delete" onClick={this.delete} /></li>)}</ul>
          <input className="finsher" type="button" onClick={this.finish} value="Finish All"/>
          <div id="modal" className="modal hidden">
            <div className="modal-content">
              <span className="close" onClick={this.close}>&times;</span>
              <h2>Congrats!</h2>
              <img src="https://media1.tenor.com/images/b944b4ee146a85a5939a78247114d79b/tenor.gif" />
            </div>
          </div>
        </div>
      </body>
    )
  }
}

export default App;
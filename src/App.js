import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {connect} from 'react-redux';
import {updateUser} from './actions/user-actions';
import store from './index'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
  }

  

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  handleAdd = () => {

  }

  dispatchs = func => {
    store && store.dispatch(func);
  };

  handleAdd = () => {
    this.dispatchs({
      type: 'ADD_TODO',
      payload: {
        text: this.state.input,
        done: false
      }
    })
  }

  handleDone = (e) => {
    this.dispatchs({
      type: 'DONE',
      payload: e
    })
  }

  render() {
    console.log('jing', this.props)
    const list = this.props.todoList || []

    const l = list.map(e => {
      return (
        <li style={{textDecoration: e.done ? 'line-through' : 'none'}} key={Math.random()} onClick={() => this.handleDone(e)}>{e.text}</li>
      )
    })

    return (
      <div className="App">
        <div>
          <ul>
            {l}
          </ul>
        </div>
        <div>
          <input type="text" value={this.state.input} onChange={this.handleChange} />
          <button onClick={this.handleAdd}>Submit</button>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  todoList: state.todo.todoList
})

const mapActionToProps = {
  onUpdateUser: updateUser
}

export default connect(mapStateToProps, mapActionToProps)(App);

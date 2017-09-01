import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Toolbar from './components/Toolbar';
import MessageList from './components/MessageList';
import data from './data/messages';



export default class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: data};
  }

  toggleStar (message) {
    this.setState((prevState) => {
      let current = prevState.messages.indexOf(message);
      prevState.messages[current].starred ?
      prevState.messages[current].starred = false :
      prevState.messages[current].starred = true
    })
  }

  toggleSelect (message) {
    this.setState((prevState) => {
      let current = prevState.messages.indexOf(message);
      prevState.messages[current].selected ?
      prevState.messages[current].selected = false :
      prevState.messages[current].selected = true
    })
  }

  toggleSelectAll (selectedMessages) {
    selectedMessages < this.state.messages.length ?
    this.state.messages.forEach((message, i) => {
      this.setState(prevState => {
        prevState.messages[i].selected = true
      })
    }) :
    this.state.messages.forEach((message, i) => {
      this.setState(prevState => {
        prevState.messages[i].selected = false
      })
    })
  }

  markAsRead (selectedMessages) {
    this.state.messages.map((message, i) => message.selected ?
      this.setState(prevState =>
        prevState.messages[i].read = true) : null
      )
  }

  markAsUnread (selectedMessages) {
    this.state.messages.map((message, i) => message.selected ?
      this.setState(prevState =>
        prevState.messages[i].read = false) : null
      )
  }

  render () {
    return (
      <div className="container">
        <header>
          <nav>
            <Toolbar  messages={this.state.messages}
                      toggleSelectAll={this.toggleSelectAll.bind(this)}
                      markAsRead={this.markAsRead.bind(this)}
                      markAsUnread={this.markAsUnread.bind(this)}
                      />
          </nav>
        </header>
        <main>
          <MessageList    messages={this.state.messages}
                          toggleStar={this.toggleStar.bind(this)}
                          toggleSelect={this.toggleSelect.bind(this)}
                        />
        </main>
      </div>
    )
  }
}

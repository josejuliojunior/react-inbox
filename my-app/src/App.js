import React from 'react';
import logo from './logo.svg';
import './App.css';

import Toolbar from './components/Toolbar';
import MessageList from './components/MessageList';
// import data from './data/messages';

const baseURL = 'http://localhost:8082/api'




export default class Menu extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {messages: data};
  // }

  state = {messages: []}

  async componentDidMount() {
    try {
      const data = await fetch(`${baseURL}/messages`)
      const response = await data.json()
      this.setState({messages: response._embedded.messages})
    } catch (err) {
      }
  }


  toggleStar (id) {
      let starred
      this.state.messages.forEach(message => {
        if (message.id === id) {
          starred = !message.starred
        }
      })
      const body = {
        "messageIds": [ id ],
        "command": "star",
        "star": starred
      }
      const settings = {
        method: 'PATCH',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
      fetch(`${baseURL}/messages`, settings)
        .then(response => {
          if(response.ok){
            const newMessages = this.state.messages.map(message =>{
              if (message.id === id) {
                message.starred = !message.starred
              }
              return message;
            })
            this.setState(newMessages)
          }
        })
  }

  //   this.setState((prevState) => {
  //     let current = prevState.messages.indexOf(message);
  //     prevState.messages[current].starred ?
  //     prevState.messages[current].starred = false :
  //     prevState.messages[current].starred = true
  //   })
  // }

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

  markAsRead () {
    const selMessages = []
    const newMessages = this.state.messages.map((message) => {
      if(message.selected) {
        message.read = true
        selMessages.push(message.id)
      }
        return message;
    })
     console.log(selMessages);
    const body = {
      "messageIds": selMessages,
      "command": "read",
      "read": true
    }
    const settings = {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    console.log(settings);

    fetch(`${baseURL}/messages`, settings)
      .then(response => {
        if(response.ok){
            console.log(selMessages);
            this.setState({messages: newMessages})
        }
      })
    }



  markAsUnread () {
    const selMessages = []
    const newMessages = this.state.messages.map((message) => {
      if(message.selected) {
        message.read = false
        selMessages.push(message.id)
      }
        return message;
    })
     console.log(selMessages);
    const body = {
      "messageIds": selMessages,
      "command": "read",
      "read": false
    }
    const settings = {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    console.log(settings);

    fetch(`${baseURL}/messages`, settings)
      .then(response => {
        if(response.ok){
            console.log(selMessages);
            this.setState({messages: newMessages})
        }
      })
    }

  deletedMessages () {
    const selMessages = []
    const newMessages = this.state.messages.map((message) => {
      if(message.selected) {
        selMessages.push(message.id)
      }
        return message;
    })
     console.log(selMessages);
    const body = {
      "messageIds": selMessages,
      "command": "delete"
    }
    const settings = {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    console.log(settings);

    fetch(`${baseURL}/messages`, settings)
      .then(response => {
        if(response.ok){
            console.log(selMessages);
            this.setState((prevState) => {
              const messages = prevState.messages.filter(message => !message.selected)
              return {messages};
            })
        }
      })
  }

  applyLabel(label) {
    const selMessages = []
    this.state.messages.map((message) => {
      return message.selected && !message.labels.includes(label) ?
        selMessages.push(message.id) : null
    })
     console.log(selMessages);
    const body = {
      "messageIds": selMessages,
      "command": "addLabel",
      "label": label
    }
    const settings = {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    console.log(settings);

    fetch(`${baseURL}/messages`, settings)
      .then(response => {
        if(response.ok){
          this.setState(prevState => {
            return prevState.messages.map(message => {
              return message.selected && !message.labels.includes(label) ?
                message.labels.push(label) : message
            })
          })
        }
      })
  }

  removeLabel(label) {
    const selMessages = []
    this.state.messages.map((message) => {
      return message.selected && message.labels.includes(label) ?
        selMessages.push(message.id) : null
    })
     console.log(selMessages);
    const body = {
      "messageIds": selMessages,
      "command": "removeLabel",
      "label": label
    }
    const settings = {
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    console.log(settings);

    fetch(`${baseURL}/messages`, settings)
      .then(response => {
        if(response.ok){
          this.setState(prevState => {
            return prevState.messages.map(message => {
              return message.selected && message.labels.includes(label) ?
                message.labels.splice(message.labels.indexOf(label),1) : message
            })
          })
        }
      })
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
                      deletedMessages={this.deletedMessages.bind(this)}
                      applyLabel={this.applyLabel.bind(this)}
                      removeLabel={this.removeLabel.bind(this)}
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

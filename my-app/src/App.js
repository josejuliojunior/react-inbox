import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }
//
// export default App;

export default class menu extends React.Component {
  render () {
    return (
      <div class="row toolbar">
        <div class="col-md-12">
          <p class="pull-right">
            <span class="badge badge">2</span>
            unread messages
          </p>

          <button class="btn btn-default">
            <i class="fa fa-check-square-o"></i>
          </button>

          <button class="btn btn-default">
            Mark As Read
          </button>

          <button class="btn btn-default">
            Mark As Unread
          </button>

          <select class="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select class="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button class="btn btn-default">
            <i class="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }
}

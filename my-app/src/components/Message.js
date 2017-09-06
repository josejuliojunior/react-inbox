import React from 'react';
import '../index.css';

const Message = ({message, toggleStar, toggleSelect}) => {
  const isStarred = message.starred ? 'fa-star' : 'fa-star-o'
  const isSelected = message.selected ? ' selected' : ''
  const isRead = message.read ? 'read' : 'unread'

  let dev = '';
  let personal = '';
  let gschool = '';
  for (var i = 0; i < message.labels.length; i++) {
    if (message.labels[i] === 'dev') {
      dev = 'dev';
    }else if (message.labels[i] === 'personal') {
      personal = 'personal';
    }else if (message.labels[i] === 'gschool') {
      gschool = 'gschool';
    }
  }

  return (
    <div className={`row message ${isRead} ${isSelected}`} >
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={message.selected} onChange={()=> toggleSelect(message)}/>
          </div>
          <div className="col-xs-2" onClick={() => toggleStar(message.id)}>
            <i className={`star fa ${isStarred}`} ></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <span className="label label-warning">{dev}</span>
        <span className="label label-warning">{personal}</span>
        <span className="label label-warning">{gschool}</span>
        <a>
          {message.subject}
        </a>
      </div>
    </div>
  )
}

export default Message;

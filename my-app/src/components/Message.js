import React from 'react';
import '../index.css';

const Message = ({message, toggleStar, toggleSelect}) => {
  const isStarred = message.starred ? 'fa-star' : 'fa-star-o'
  const isSelected = message.select ? 'selected' : ''
  const isRead = message.read ? 'read' : 'unread'
  return (
    <div className={`row message ${isRead} ${isSelected}`} >
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={message.selected} onChange={()=> toggleSelect(message)}/>
          </div>
          <div className="col-xs-2" onClick={() => toggleStar(message)}>
            <i className={`star fa ${isStarred}`} ></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        <a>
          {message.subject}
        </a>
      </div>
    </div>
  )
}

export default Message;

import React from 'react';
import '../index.css';

const Toolbar = ({messages, toggleSelectAll, markAsRead, markAsUnread}) => {
  const selectedMessages = messages.filter(message => message.selected).length
  const unreadMessages = messages.filter(message => message.read === false).length;
  let selectAllButton;
  if(selectedMessages === messages.length){
    selectAllButton = 'fa-check-square-o'
  }else if (selectedMessages === 0) {
    selectAllButton = 'fa-square-o'
  }else{
    selectAllButton = 'fa-minus-square-o'
  }
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{unreadMessages}</span>
            unread messages
          </p>

          <button className="btn btn-default" onClick={() => toggleSelectAll(selectedMessages)}>
            <i className={`fa ${selectAllButton}`}></i>
          </button>

          <button className="btn btn-default" onClick={()=> markAsRead(selectedMessages)}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={()=> markAsUnread(selectedMessages)}>
            Mark As Unread
          </button>

          <select className="form-control label-select">
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select">
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default">
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    )
  }

export default Toolbar;

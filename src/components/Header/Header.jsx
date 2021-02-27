import React from 'react';

const Header = (props) => {
    return (
      <div className="app-header d-flex">
        <h1>Todo List:</h1>
        <h2>{props.toDo} more to do, {props.done} done</h2>
      </div>
    );
  };

export default Header;
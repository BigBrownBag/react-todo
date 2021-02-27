import React from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';

const TodoList = (props) => {
  const elements = props.elements.map((item)=>{
    const {id, ...elProps} = item; 
    return (
      <li key={id} className='list-group-item'><TodoListItem {...elProps} onDeleted={() => {props.onDeleted(id)}} onToggleImportant={() => {props.onToggleImportant(id)}} onToggleDone={()=>{props.onToggleDone(id)}}/></li>
    )
  });
  return (
    <ul className='list-group todo-list'>
      { elements }
    </ul>        
  );
  };

export default TodoList;
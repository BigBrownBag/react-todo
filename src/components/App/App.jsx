import React, {Component} from 'react';
import Header from './../Header/Header';
import Search from './../Search/Search';
import TodoList from './../TodoList/TodoList';
import AddItem from './../AddItem/AddItem';

export default class App extends Component {
  maxId = 100;
  state = {
    elements: [
        this.createElement('Coffee'),
        this.createElement('Tea'),
        this.createElement('Morning'),
    ],
    newLabel: '...',
    term: '',
    filter: 'all'
  };

  createElement (label) {
      return{
        label,
        important: false,
        done: false,
        id: this.maxId++
      }
  };

  findElement (id) {
      const idx = this.state.elements.findIndex((el)=>el.id===id);
      return idx;
  };

  deleteElement = (id) => {
    this.setState(({ elements })=>{
      const idx = elements.findIndex((el)=>el.id===id);
      const newElements = [ ...elements.slice(0,idx), ...elements.slice(idx+1)];
      return {
        elements: newElements
      };
    });
  };

  addElement = (text) => {
    const newElement = this.createElement(text);
    this.setState(({elements}) => {
      const newArray = [...elements, newElement];
      return {
        elements: newArray
      }
    });
  };

  onLabelChange = (e) => {
    this.setState(({ newLabel })=>{
        const label=e.target.value;
        return { newLabel: label };
      });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.newLabel) {this.addElement(this.state.newLabel);}
  };

  onToggleImportant = (id) => {
    this.setState(( { elements } ) => {
        const idx = this.findElement(id);
        const oldElement = elements[idx];
        const newElement = {...oldElement, important: !oldElement.important};
        const newElements = [ ...elements.slice(0,idx), newElement, ...elements.slice(idx+1)];
        return {elements: newElements};
    });
  };

  onToggleDone = (id) => {
    this.setState(( { elements } ) => {
        const idx = this.findElement(id);
        const oldElement = elements[idx];
        const newElement = {...oldElement, done: !oldElement.done};
        const newElements = [ ...elements.slice(0,idx), newElement, ...elements.slice(idx+1)];
        return {elements: newElements};
    });
  };

  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
  };
  
  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  searchElements = (items, term) => {
    
    if (term.length === 0) {
        return items;
    }
  
    return items.filter((item) => {
        return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  filterElements = (items, filter) => {
      switch (filter) {
        case 'all':
            return items;
        case 'active':
            return items.filter((el)=>!el.done);
        case 'done':
            return items.filter((el)=>el.done);
        default:
            return items;
      };
  };

  render () {
    const { elements, term, filter } = this.state;
    const doneCount = elements.filter((el)=>el.done).length;
    const todoCount = elements.filter((el)=>!el.done).length;
    const visibleElements = this.filterElements(this.searchElements(elements, term),filter);
    return(
      <div className='todo-app'>
      <Header toDo={todoCount} done={doneCount}/>
      <div className='top-panel'>
      <Search onSearchChange={this.onSearchChange} filter={filter} onFilterChange={this.onFilterChange} />
      </div>
      <TodoList elements={visibleElements} 
      onToggleDone={this.onToggleDone}
      onToggleImportant={this.onToggleImportant}
      onDeleted={this.deleteElement}/>
      <AddItem onLabelChange={this.onLabelChange} onSubmit={this.onSubmit} props={this.state.newLabel}/>
    </div>
    )
  };
};

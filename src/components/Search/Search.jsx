import React,{Component} from 'react';

class Search extends Component {
  filterButtons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Done' }
  ];
  render() {
    const {filter} = this.props;
    const buttons = this.filterButtons.map(({name, label}) => {
        const isActive = name === filter;
        const classNames = 'btn ' + (isActive ? 'btn-info' : 'btn-outline-secondary');
    
        return (
          <button key={name}
                  type="button"
                  onClick={() => this.props.onFilterChange(name)}
                  className={classNames}>{label}</button>
        );
    });
    return(
      <div className='d-flex'>
        <input placeholder='search..' type="text" className="form-control search-input" onChange={this.props.onSearchChange}/>
        <div className="btn-group">
        { buttons }
        </div>
      </div>
    );
  };
};

export default Search;
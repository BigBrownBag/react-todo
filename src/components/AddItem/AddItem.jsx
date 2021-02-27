import React from 'react';

const AddItem = (props) => {
    return (
        <div className='add-item'>
            <form className='item-add-form d-flex' onSubmit={props.onSubmit} >
                <input type="text" placeholder='...' className='form-control' onChange={props.onLabelChange} value={props.newLabel} />
                <button
                    className="btn btn-outline-primary" //onClick={()=>{props.addElement('dsf')}}
                    ><i className="fa fa-plus-circle"></i></button>
            </form>
        </div>
    );
};

export default AddItem;
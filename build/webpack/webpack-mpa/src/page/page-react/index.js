'use strict'

import React from 'react';
import ReactDOM from 'react-dom';

import 'antd/dist/antd.css';

import { Rate } from 'antd';

import { DatePicker } from 'antd';


function onChange(date, dateString) {
    
    console.log(date, dateString);

}

class ReactPage extends React.Component {
    
    render(){
        
        return <div>
            This is React Page 
            <Rate /> 
            <DatePicker onChange={onChange} picker="week" />
        </div>;
    }

}


ReactDOM.render(
    <ReactPage />,
    document.getElementById('root')
)
import React, { Component } from 'react';
import "./Loader.css";

export class Loader extends Component {
    render() {
        return ( 
            <div className="loader">
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__bar"></div>
                <div className="loader__ball"></div>
            </div>  
        );
    }
}
import React, { Component } from 'react';
import './Header.css';

export class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <header>
                <h1>Brian Williams | <strong>.NET</strong> Developer Test</h1>
                <div className="subheader">
                    <div className="logo_container">
                        <img src="https://mubaloo.wpengine.com/wp-content/uploads/2019/02/mubaloo-logo-white.png" alt="" />
                    </div>
                </div>
            </header>
        );
    }
}

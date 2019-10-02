import React, { Component } from 'react';
import { FormGroup } from 'reactstrap';

export class NameFormField extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showOtherTitle: false,  
            titleType: 0,
            otherTitle: "",   
        }
    }

    render() {
        return (
            <div className="row row-no-padding">
                <div className="col-sm-2">
                    <FormGroup>
                        <select
                            name="titleType"
                            type="select"
                            className="survey-form__input"
                            value={this.props.titleType}
                            onChange={this.props.onChange}>
                            <option value="0">Mr</option>
                            <option value="1">Mrs</option>
                            <option value="2">Miss</option>
                            <option value="3">Ms</option>
                            <option value="4">Other</option>
                        </select>
                    </FormGroup>
                </div>
                {this.props.titleType == 4 ?
                    <div className="col-sm-3">
                        <FormGroup>
                            <input 
                                name="otherTitle" 
                                type="text" 
                                className="survey-form__input" 
                                placeholder="Title"
                                value={this.props.otherTitle}
                                onChange={this.props.onChange} />
                        </FormGroup>
                    </div>
                    : null
                }
                <div className={`col-sm-${this.props.titleType == 4 ? 7 : 10}`}>
                    <FormGroup>
                        <input 
                            name="name" 
                            type="text" 
                            className="survey-form__input" 
                            placeholder="Full Name"
                            value={this.props.name}
                            onChange={this.props.onChange} />
                    </FormGroup>
                </div>
            </div>
        )
    }
}
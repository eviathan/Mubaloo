import React, { Component } from 'react';
import { Form, FormGroup } from 'reactstrap';
import { LocationFormField } from './Fields/LocationFormField';
import { Loader } from '../Utility/Loader'
import { NameFormField } from './Fields/NameFormField';
import cookie from 'react-cookies'
import "./Form.css";

export class SurveyForm extends Component {

    constructor(props) {
        
        super(props);

        this.state = {
            page:0,
            isLoading: false,
            showOtherTitle: false,  
            titleType: 0,
            otherTitle: "",      
            name: "",
            dateOfBirth: "",
            location: "",
            feedback: "",
            message: "",
            hasSubmission: cookie.load("hasSubmission"),
            feedbackMaxLength: 2000
        }
    }

    handleChange(event) {
        const value = event.target.value;
        this.setState({
          ...this.state,
          [event.target.name]: value
        });
    }

    handleLocationChange(event) {
        if(this.state.location === "") {
            this.setState({location: event.location})
        }
    }

    navigateTo(page) {
        this.setState({ page: page });
    }

    onSubmit(event) {
        event.preventDefault()
        
        let data = {
            titleType: parseInt(this.state.titleType),
            othertitle: this.state.otherTitle,
            name: this.state.name,
            dateOfBirth: this.state.dateOfBirth,
            location: this.state.location,
            date: this.state.date,
            feedback: this.state.feedback
        };
        this.setState({ isLoading: true });

        // Post form data.
        fetch('survey/submit', {            
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then((data) => {
            cookie.save("hasSubmission", true);
            this.setState({ 
                message: data.message,
                hasSubmission: true
            })
        })
        .catch((error) => {
            // TODO: Handle Validation failing
            console.log(error); 
        })
        .finally(() => {
            this.setState({ isLoading: false })
        });
        
    }

    isNextEnabled()
    {
        var hasName = !!this.state.name;
        var hasTitle = (this.state.titleType != 4 || (this.state.titleType == 4 && !!this.state.otherTitle));
        
        var dob = new Date(this.state.dateOfBirth);
        var hasDate = (!!this.state.dateOfBirth && dob instanceof Date);

        return !(hasName && hasTitle && hasDate);
    }

    isSubmitEnabled()
    {
        var hasLocation = !!this.state.location;
        var hasFeedback = !!this.state.feedback && this.state.feedback.length <= this.state.feedbackMaxLength;

        return !(hasLocation && hasFeedback);
    }

    render() {
        return (
            <div>
                { this.state.hasSubmission ?
                <p className="message">Thank you for your submission</p>
                :
                <div>
                    { !this.state.isLoading ?
                    <Form className="survey-form" onSubmit={this.onSubmit}>                    
                        {/* Form Page: 0 */}
                        {
                            this.state.page === 0 ? 
                            <div>
                                {/* Name/ TitleType/ OtherTitle */}
                                <NameFormField 
                                    titleType={this.state.titleType}
                                    otherTitle={this.state.otherTitle}
                                    name={this.state.name}
                                    showOtherTitle={this.state.showOtherTitle}
                                    onChange={this.handleChange.bind(this)}
                                    />  
                                {/* Date of birth */}
                                <FormGroup>
                                    <input name="dateOfBirth"
                                        type="date"
                                        className="survey-form__input"
                                        placeholder="Date Of Birth:" 
                                        value={this.state.dateOfBirth}
                                        onChange={this.handleChange.bind(this)}/>
                                </FormGroup>                                
                                {/* Next */}
                                <FormGroup>
                                    <button onClick={this.navigateTo.bind(this, 1)} disabled={this.isNextEnabled()}>Next</button>
                                </FormGroup>
                            </div>
                            : null  
                        }
                        {/* Form Page: 1 */}
                        {
                            this.state.page === 1 ? 
                            <div>
                                {/* Location */}
                                <FormGroup>
                                    <LocationFormField
                                        name="location"
                                        placeholder="Location"
                                        value={this.state.location}
                                        onChange={this.handleChange.bind(this)}
                                        onLocationFound={this.handleLocationChange.bind(this)} />
                                </FormGroup>                                
                                {/* Feedback */}
                                <FormGroup>
                                    <textarea
                                        name="feedback"
                                        type="text"
                                        className="survey-form__input"
                                        placeholder="Feedback"
                                        rows="6"
                                        maxLength={this.state.feedbackMaxLength}
                                        value={this.state.feedback}
                                        onChange={this.handleChange.bind(this)}></textarea>
                                </FormGroup>
                                {/* Back and Submit */}
                                <FormGroup>
                                    <button onClick={this.navigateTo.bind(this, 0)}>Back</button>
                                    <button onClick={this.onSubmit.bind(this)} disabled={this.isSubmitEnabled()} className="submit">Send</button>
                                </FormGroup> 
                            </div>
                            : null
                        }           
                    </Form>
                    : 
                    <Loader />
                    }
                </div>
                }
            </div>
        );
    }
}

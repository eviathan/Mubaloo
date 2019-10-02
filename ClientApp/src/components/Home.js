import React, { Component } from 'react';
import { SurveyForm } from './Form/SurveyForm'

export class Home extends Component {

    render() {
        return ( 
            <SurveyForm url="survey/submit" header="Feedback" />
        );
    }
}
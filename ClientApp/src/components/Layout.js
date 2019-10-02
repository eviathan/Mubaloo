import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Header } from './Header';
import { Footer } from './Footer';

export class Layout extends Component {
    static displayName = Layout.name;

    render () {
        return (
            <div>
                <Header />
                <Container>
                    {this.props.children}
                </Container>
                <Footer />
            </div>
        );
    }
}

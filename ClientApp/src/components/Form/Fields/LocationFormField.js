import React, { Component } from 'react';

export class LocationFormField extends Component {

    constructor(props) {
        super(props);
        this.atttemptGeolocation(this);
    }

    // Attempts to use geolocation and reverse-geocoding to get your address
    atttemptGeolocation(that) {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                function success(position) {
                    (async() => { 
                        await that.reverseGeocode(position.coords.latitude, position.coords.longitude)                            
                            .then(responseJson => {
                                that.props.onLocationFound({
                                    lat: position.coords.latitude,
                                    long: position.coords.longitude,
                                    address: responseJson.address,
                                    location: that.getLocation(responseJson.address)
                                })
                            })
                    })();
                },
                function error(error_message) {
                    console.error('An error has occured while retrieving location', error_message);
                }
            );
        } else {
            console.log('Geolocation is not enabled.')
        }
    }

    // Uses OpenStreetMap to reverse-geocode your lat/long to provide you with an address
    async reverseGeocode(lat, long){
        return await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}&zoom=18&addressdetails=1`)
            .then(response => response.json())
    }

    // Fallsback through different parts of your address from most specific to least
    getLocation(address) {
        if(address) {
            return  !!address.city ? address.city
                : !!address.county ? address.county
                    : !!address.state ? address.state
                        : !!address.country ? address.country 
                            : ""
        }
    }

    render() {
        return ( 
            <div>
                <input 
                    name="location"
                    type="text" 
                    className="survey-form__input" 
                    placeholder="Location" 
                    value={this.props.value} 
                    onChange={this.props.onChange} />
            </div>
        );
    }
}
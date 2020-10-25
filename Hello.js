import React from 'react';
import {Component} from 'react';

class Hello extends Component {
    render () {
        var place = 'tam'
        return (
            <h1>Hello World + {place}</h1>
        )
    }
}
export default Hello;
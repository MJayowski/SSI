import React from 'react';
import {Component} from 'react';
import Hello from "./Hello";
//komponent podrzędny

class ElementListy extends Component {
    render () {
        return (
            <li>
                {this.props.ilosc} x {this.props.children}
            </li>
        );
    }
}
export default ElementListy;
import React from 'react';
import {Component} from 'react';
import ElementListy from './ElementListy'

class ListaZakupow extends Component {
    render () {
        return (
            <ul>
              <ElementListy ilosc="1" >Ciastko</ElementListy>
              <ElementListy ilosc="2" >Karmel</ElementListy>
              <ElementListy ilosc="3" >Czekolada</ElementListy>
            </ul>
        );
    }
}
export default ListaZakupow;
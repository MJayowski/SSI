import React from 'react';
import {Component} from 'react';
import Karta from "./Karta";
import PropTypes from 'prop-types';

class Lista extends Component {
    render () {
        var karty = this.props.karty.map((karta) => {
            return <Karta key={karta.id}
                          id={karta.id}
                          tytul={karta.tytul}
                          opis={karta.opis}
                          kolor={karta.kolor}
                          zadania={karta.zadania}
                          funkcjeZwrotne={this.props.funkcjeZwrotne}/>
        })
        return (
            <div className = "list">
                <h1>{this.props.tytul}</h1>
                {karty}
            </div>
        );
    }
}
Lista.propTypes = {
    tytul: PropTypes.string.isRequired,
    karty: PropTypes.arrayOf(PropTypes.object),
    funkcjeZwrotne: PropTypes.object
}
export default Lista;
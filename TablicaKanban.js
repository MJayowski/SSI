import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import Lista from './Lista'

class TablicaKanban extends Component {
    handleClick = (zmienna) => {
        this.props.funkcjeZwrotne.kategoria(zmienna)
    }

    render () {
        return (
            <div className="app">
                <Lista id="todo" tytul="Do zrobienia" funkcjeZwrotne={this.props.funkcjeZwrotne} karty={
                        this.props.karty.filter((karta) => karta.status === "todo")
                } />
                <button
                    onClick={this.handleClick.bind(this, 'todo')}>+</button>

                <Lista id="in-progress" tytul="W toku" funkcjeZwrotne={this.props.funkcjeZwrotne} karty={
                    this.props.karty.filter((karta) => karta.status === "in-progress")
                } />
                <button
                    onClick={this.handleClick.bind(this, 'in-progress')}>+</button>

                <Lista id="done" tytul="Zrobione" funkcjeZwrotne={this.props.funkcjeZwrotne}  karty={
                    this.props.karty.filter((karta) => karta.status === "done")
                } />
                <button
                    onClick={this.handleClick.bind(this, 'done')}>+</button>
            </div>
        );
    }
}

TablicaKanban.propTypes = {
    karty: PropTypes.arrayOf(PropTypes.object),
    //tytul: PropTypes.string.isRequired,
    funkcjeZwrotne: PropTypes.object
};

export default TablicaKanban;
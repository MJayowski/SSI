import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';

class Zrobione extends Component {

    sprawdzKlawisz(evt) {
        if(evt.key === 'Enter'){
            this.props.funkcjeZwrotne.dodaj(this.props.idKarty, evt.target.value)
            evt.target.value = '';
        }
    }

    filterById(jsonObject, id) {
        return jsonObject.filter(function(jsonObject) {return (jsonObject['id'] == id);})[0];
    }

    render () {
        let zadania = this.props.zadania.map((zadanie, indexZadania) => (
            <li key={zadanie.id} className="checkList__task">
                <input type="checkbox" defaultChecked={zadanie.zrobione}
                    onChange={this.props.funkcjeZwrotne.zmien.bind(null, this.props.idKarty, zadanie.id, indexZadania)}/>
                {zadanie.nazwa}
                <a href="#" className="checklist__task--remove"
                    onClick={this.props.funkcjeZwrotne.usun.bind(null, this.props.idKarty, zadanie.id, indexZadania)}/>
            </li>
        ))
        return (
            <div className = "checkList">
                <ul>
                    {zadania}
                </ul>
                <input  type="text"
                        className="checklist--add--task"
                        placeholder="Proszę podać nazwę i nacisnąć Enter by dodać zadanie"
                        onKeyPress={this.sprawdzKlawisz.bind(this)}
                />
            </div>
        );
    }
}
Zrobione.propTypes = {
    idKarty: PropTypes.number,
    zadania: PropTypes.arrayOf(PropTypes.object),
    funkcjeZwrotne: PropTypes.object
}

export default Zrobione;
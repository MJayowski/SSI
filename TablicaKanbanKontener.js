import React from 'react';
import {Component} from 'react';
import PropTypes from 'prop-types';
import TablicaKanban from './TablicaKanban'
import update from 'immutability-helper'

class TablicaKanbanKontener extends Component {
    constructor() {
        super();
        this.state = {
            karty: []
        };
    }

    componentDidMount() {
        fetch('./karty.json')
            .then((response) => response.json())
            .then((respondeData) => {
                this.setState({karty:respondeData});
            })
            .catch((error) => {
                console.log('Błąd pobierania i przetwarzania danych', error);
            })
    }

    dodajZadanie(idKarty, nazwaZadania) {
        console.log(`idKarty: ${idKarty} nazwaZadania: ${nazwaZadania}`)

        let poprzedniStan = this.state;

        //Znajdujemy index karty
        let indexKarty = this.state.karty.findIndex((karta) => karta.id === idKarty);

        //Tworzymy nowe zadanie z podaną nazwą i tymczasowy identyfikator
        let noweZadanie = {id: idKarty, nazwa: nazwaZadania, zrobione: false};

        //Tworzymy nowy obiekt i dodajemy zadanie do tablicy zadań
        let nowyStan = update(this.state.karty, {
            [indexKarty]: {
                zadania: {$push: [noweZadanie]}
            }
        });

        this.setState({karty: nowyStan})


    }

    usunZadanie(idKarty, idZadania, indexZadania) {

        let poprzedniStan = this.state;

        let indexKarty = this.state.karty.findIndex((karta) => karta.id === idKarty)

        let nowyStan = update(this.state.karty,  {
            [indexKarty]: {
                zadania: {$splice: [[indexZadania, 1]]}
            }
        })


        this.setState({karty: nowyStan});
        //console.log(`idKarty: ${idKarty} idZadania: ${idZadania} indexZadania: ${indexZadania}`)
    }

    zmienZadanie(idKarty, idZadania, indexZadania) {

        let poprzedniStan = this.state.karty;

        let indexKarty = this.state.karty.findIndex((karta) => karta.id === idKarty)

        let nowaWartoscZrobione

        let nowyStan = update(this.state.karty, {
            [indexKarty]: {
                zadania: {
                    [indexZadania]: {
                        done: {
                            $apply: (zrobione) => {
                                nowaWartoscZrobione = !zrobione
                                return nowaWartoscZrobione
                            }
                        }
                    }
                }
            }
        });

        this.setState({karty: nowyStan});
    }

    dodajKategorie(typ) {
        //console.log(`idKarty: ${idKarty} nazwaZadania: ${nazwaZadania}`)

        let poprzedniStan = this.state;

        let nazwaKategorii = prompt("Podaj nazwe kategorii")
        let opisKategorii = prompt("Podaj opis")

        while (true) {
            if (nazwaKategorii === '')
                nazwaKategorii = prompt("Pusta nazwa, podaj nazwe kategorii")
            else if (opisKategorii === '')
                opisKategorii = prompt("Pusty opis, podaj opis")
            else
                break;
        }

        let kolor = null;

        if(typ === 'done')
            kolor = '#3A7A2A';
        else if (typ === 'in-progress')
            kolor = '#BD8D3D';
        else
            kolor = '#FF003D';

        let idKategotii =  (Math.max.apply(Math, this.state.karty.map(function(o) {
                return o.id;
            })) + 1);

        //Tworzymy nowe zadanie z podaną nazwą i tymczasowy identyfikator
        let nowaKategoria = {id: idKategotii, tytul: nazwaKategorii, opis: opisKategorii, "kolor": kolor, "status": typ,
            "zadania": []};

        //Tworzymy nowy obiekt i dodajemy zadanie do tablicy zadań
        let nowyStan = update(this.state.karty, {
            $push: [nowaKategoria]
        });

        this.setState({karty: nowyStan})
    }

    zmienProgress(kierunek, przeszly, idKarty) {

        let poprzedniStan = this.state;
        let progress = null;
        let kolorZmiany = null;

        if (przeszly === 'todo' && kierunek === 'p') {
            progress = 'in-progress';
            kolorZmiany = '#BD8D3D'
        }
        else if (przeszly === 'in-progress' && kierunek === 'l') {
            progress = 'todo'
            kolorZmiany = '#FF003D'
        }
        else if (przeszly === 'in-progress' && kierunek === 'p') {
            progress =  'done'
            kolorZmiany = '#3A7A2A'
        }
        else {
            progress = 'in-progress'
            kolorZmiany = '#BD8D3D'
        }

        let nowyStan = update(this.state.karty, {
            [idKarty-1]: {
                status: {$set: (progress)},
                kolor: {$set: (kolorZmiany)}
            }
        });

        this.setState({karty: nowyStan});
    }

    render() {
        return <TablicaKanban karty = {this.state.karty}
        funkcjeZwrotne={{
            zmien: this.zmienZadanie.bind(this),
            usun: this.usunZadanie.bind(this),
            dodaj: this.dodajZadanie.bind(this),
            kategoria: this.dodajKategorie.bind(this),
            progress: this.zmienProgress.bind(this)
        }}/>
    }

}
export default  TablicaKanbanKontener;
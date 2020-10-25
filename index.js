import React from 'react';
import {render} from 'react-dom';
//import ListaZakupow from './ListaZakupow';
import TablicaKanbanKontener from './TablicaKanbanKontener'

let listaKart = []

render(<TablicaKanbanKontener karty={listaKart}/>, document.getElementById('root'));

/*
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/
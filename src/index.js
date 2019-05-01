import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Mux from './Mux';
import * as serviceWorker from './serviceWorker';
import store from "./store"
import {Provider} from 'react-redux';


ReactDOM.render(<Provider store={store}>
<Mux />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();



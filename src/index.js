import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './components/Welcome';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Welcome />, document.getElementById('root'));
serviceWorker.unregister();

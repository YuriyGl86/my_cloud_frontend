import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistor } from './store/store';
// import { Preloader } from './components/Preloader';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Router>
        <Provider store={store}>
            {/* <PersistGate loading={<Preloader />} persistor={persistor}> */}
            <App />
            {/* </PersistGate> */}
        </Provider>
    </Router>,
);

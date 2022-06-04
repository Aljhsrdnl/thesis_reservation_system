import React from 'react';
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './reducer/';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk';

const composedEnhancer = compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const store = createStore(rootReducer, composedEnhancer)

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

function DataProvider({children}) {
    return(
        <Provider store={store}>
            {children}
        </Provider>
    )
}

export default DataProvider
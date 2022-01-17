import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { authReducer } from '../reducers/authReducer';
import thunk from 'redux-thunk'
import { uiReducer } from '../reducers/uiReducer';
import { notesReducer } from '../reducers/notesReducer';

//Create reducers acepta sola una funcion, por lo que me creo un OBJETO que COMBINA los reducers,
//entonces si quiero agregar mas reducers, simplemente los agrego al objeto
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
})


export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)

// composeWithDevTools()
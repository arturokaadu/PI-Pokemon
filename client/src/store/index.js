//seteamos los requerimientos de Redux
import {createStore, applyMiddleware, } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer';


export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

// Store es como un centro de informacion alojado por fuera de los components. Permite que todos los componentes conozcan la info manejada. 
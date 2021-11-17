import { createStore } from 'redux';
import rootReducer from './reducers/rootReducer';

function configureStore(state = { result: [] }) {
    return createStore(rootReducer, state);
}

export default configureStore;
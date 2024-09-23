import { createStore } from 'redux';
import { reducer } from './reducers';
export function configureStore(initialState) {
    const store = createStore(reducer, initialState, window.devToolsExtension && window.devToolsExtension());
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            store.replaceReducer(reducer);
        });
    }
    return store;
}




import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux';
import productsReducer from './reducer/products-reducer'
import todoReducer from './reducer/todoReducer'
import userReducer from './reducer/user-reducer';
import throttle from 'lodash/throttle'


const loadState = () => {
   try {
     const serializedState = localStorage.getItem('state');
     if (serializedState === null) {
       return undefined;
     }
     return JSON.parse(serializedState);
   } catch (err) {
     return undefined;
   }
 }; 

const persistedState = loadState();

const saveState = (state) => {
   try {
     const serializedState = JSON.stringify(state);
     localStorage.setItem('state', serializedState);
   } catch(e) {
     // ignore write errors
   }
 };   

const allReducers = combineReducers({
   products: productsReducer,
   user: userReducer,
   todo: todoReducer
})

const store = createStore(
   allReducers,
   persistedState,
   window.devToolsExtension && window.devToolsExtension()
   );
   

// so when subscribe call, the getState operation is called too
// since the getState always called every redux action called.
// that is pretty expensive call, so need the throttle to keep the call only happen 1 time after a moment
store.subscribe(throttle(() => {
   // save all state
   saveState(store.getState());

   // to whitelist like this
   // saveState({
   //    todo: store.getState().todo
   // })

}, 1000));

export default store



ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

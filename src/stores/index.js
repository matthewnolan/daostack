// TODO remove cruft
// import { createStore } from 'redux';
// import reducers from '../reducers';

// function reduxStore(initialState) {
//   const store = createStore(reducers, initialState,
//     window.devToolsExtension && window.devToolsExtension());

//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       // We need to require for hot reloading to work properly.
//       const nextReducer = require('../reducers');  // eslint-disable-line global-require

//       store.replaceReducer(nextReducer);
//     });
//   }

//   return store;
// }

// export default reduxStore;



import { browserHistory } from 'react-router'
import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import reducers from '../reducers';

// Redux DevTools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const routingMiddleware = routerMiddleware(browserHistory)

const reduxStore = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(
      thunkMiddleware,
      routingMiddleware
    )
  )
)

export default reduxStore

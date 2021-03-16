import {applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

// import {createLogger} from 'redux-logger';
// const isProd = process.env.NODE_ENV === 'production';
// const middlewareList = [];
// middlewareList.push(thunk);
// if (!isProd) {
//     middlewareList.push(createLogger());
// }

//maybe add here the logic for chrome dev tools
//MUST ADD THIS TO HAVE IN CHROME BROWSER COMPATIBILITY SUPPORT
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//properly disable Redux Devtools only in production environment

// const composeEnhancers =
//     (process.env.REACT_APP_ENVIRONMENT !== 'production' &&
//         typeof window !== 'undefined' &&
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//     compose;

// declare global {
//     interface Window {
//         __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
//     }
// }
//
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const composeEnhancers =
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const middleware = composeEnhancers(applyMiddleware(thunk));
// const middleware = composeEnhancers(applyMiddleware(...middlewareList));
export default middleware;
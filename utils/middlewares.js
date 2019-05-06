import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';

/**
 * @description Initialize all middlewares
 */
export default applyMiddleware(thunk);

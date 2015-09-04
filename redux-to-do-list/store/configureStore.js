import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { devTools, persistState } from 'redux-devtools';
import { logMiddleware } from '../middleware/api'

export const finalCreateStore = compose(
  applyMiddleware(logMiddleware, thunkMiddleware),
  devTools(),
  persistState(
    window.location.href.match(/[?&]debug_session=([^&]+)\b/)
  ),
  createStore
);

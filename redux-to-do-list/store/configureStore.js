import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { devTools, persistState } from 'redux-devtools';

export const finalCreateStore = compose(
  applyMiddleware(thunk),
  devTools(),
  persistState(
    window.location.href.match(/[?&]debug_session=([^&]+)\b/)
  ),
  createStore
);

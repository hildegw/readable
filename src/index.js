import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter } from "react-router-dom"
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import './index.css'
import App from './components/App'
import rootReducer from './reducers'
import registerServiceWorker from './registerServiceWorker'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk, logger),
  )
)

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter><App /></BrowserRouter>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();

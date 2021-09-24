import React from 'react'
import MainNavi from './src/navigation/MainNavi'
import { NavigationContainer } from '@react-navigation/native'

// setup redux 
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import allReducer from './src/reducers'

// create global store
const GlobalStore = createStore(
  allReducer,
  {},
  composeWithDevTools(applyMiddleware(ReduxThunk))

)

const App = () => {
  return (
    <Provider store={GlobalStore}>
      <NavigationContainer>
        <MainNavi />
      </NavigationContainer>
    </Provider>
  )
}

export default App
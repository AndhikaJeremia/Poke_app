import {combineReducers} from 'redux'
import pokedexReducer from './pokedexReducer'

const allReducer = combineReducers({
    pokedexReducer
})

export default allReducer
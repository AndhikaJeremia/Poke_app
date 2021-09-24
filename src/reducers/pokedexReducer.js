const INITIAL_STATE = {
    next: null,
    previous: null,
    result: [],
    details:[],
    about:{},
    evo_details:{},
    my_details:null
}

const pokedexReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GETALL':
            return{
                ...state,
                next: action.payload.next,
                previous: action.payload.previous,
                result: action.payload.results,
                details: action.payload.details,
            }
        case 'GETABOUT':
            return{
                ...state,
                about: action.payload
            }
        case 'GETEVO':
            return{
                ...state,
                evo_details: action.payload
            }
        case 'GETMINE' :
            return{
                ...state,
                my_details: action.payload
            }
        default:
            return state
    }
}

export default pokedexReducer
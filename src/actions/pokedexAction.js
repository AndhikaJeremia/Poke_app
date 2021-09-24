import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

export const getAllPokemon = (otherlink) => {
    return async(dispatch) => {
        try{
            let link = 'https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10'
            if (otherlink) {
                link = otherlink
            }
            let details = []
            const res = await axios.get(link)
            for await (let item of res.data.results){
                let hasil = await axios.get(item.url)
                details.push(hasil.data)
                
            }
            const data = {
                ...res.data,
                details : [...details]
            }
            dispatch({
                type: 'GETALL',
                payload: data
            })
        }  
        catch(err){
            console.log('error getAllPokemon', err)
        }
    }
}

export const getAboutPokemon = (id) => {
    return async(dispatch) => {
        try{
            const resDetail = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            const resSpecies = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
            const genderF = parseInt(resSpecies.data.gender_rate)/8*100
            const genderM = 100-parseFloat(genderF)
            const About = {
                weight: parseInt(resDetail.data.weight)/10,
                height: parseInt(resDetail.data.height)*10,
                genderF: genderF.toString()+'%',
                genderM: genderM.toString()+'%',
                eggGroup: resSpecies.data.egg_groups[0].name,
                genus: resSpecies.data.genera[7].genus
            }
            dispatch({
                type: 'GETABOUT',
                payload: About
            })
        }
        catch(err){
            consolg.log('error getDetailPokemon', err)
        }
    }
}

export const getPokeEvoFrom = (id) => {
    return async(dispatch) => {
        try{
            const resEvo = await axios(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
            if(!resEvo.data.evolves_from_species){
                dispatch({
                    type: 'GETEVO',
                    payload: null
                })
            }
            else{
                const resDetailEvo = await axios(`https://pokeapi.co/api/v2/pokemon/${resEvo.data.evolves_from_species.name}`)
                const data = {
                    id: resDetailEvo.data.id,
                    name: resDetailEvo.data.name,
                    picture: resDetailEvo.data.sprites.front_default,
                    types: resDetailEvo.data.types,
                    abilities: resDetailEvo.data.abilities,
                    stats: resDetailEvo.data.stats,
                    moves: resDetailEvo.data.moves
                }
                dispatch({
                    type:'GETEVO',
                    payload: data
                })
            }
        }
        catch(err){
            console.log('error getPokeEvoFrom', err)
        }
    }
}

export const getMyPokeList = () => {
    return async(dispatch) => {
        try{
            const localStorage = await AsyncStorage.getItem('like')
            let valueStorage = JSON.parse(localStorage)
            if(localStorage === null){
                dispatch({
                    type:'GETMINE',
                    payload: null
                })
            }
            else if(valueStorage.likes.length === 0){
                dispatch({
                    type:'GETMINE',
                    payload: null
                })
            }
            else{
                let Arr = []
                for await(let item of valueStorage.likes){
                    let hasil = await axios.get(`https://pokeapi.co/api/v2/pokemon/${item.id}`)
                    Arr.push(hasil.data)
                }
                dispatch({
                    type:'GETMINE',
                    payload: Arr
                })
            }
        }
        catch(err){
            console.log('error getMyPokeList', err)
        }
    }
}
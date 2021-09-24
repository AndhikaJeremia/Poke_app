import React from 'react'
import { ScrollView, View, Text, Pressable } from 'react-native'
import { Image, Chip } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { getMyPokeList } from '../actions'
import Icon from 'react-native-vector-icons/FontAwesome5'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MyPokeListScreen = ({navigation}) => {
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getMyPokeList())
    }, [detail])

    const { detail } = useSelector((state) => {
        return {
            detail: state.pokedexReducer.my_details
        }
    })
    const pokeDetailBtn = (id, name, pic, type, abilities, stats, move) => {
        navigation.navigate('Pokedetail',
            {
                id: id,
                name: name,
                picture: pic,
                types: type,
                abilities: abilities,
                stats: stats,
                moves: move
            })
    }
    const deleteAllBtn = async() => {
        try{
            let data = {likes:[]}
            data = JSON.stringify(data)
            console.log(data)
            await AsyncStorage.setItem('like', data)
            dispatch(getMyPokeList())
        }
        catch(err){
            console.log('delete Error', err)
        }

    }
    console.log(detail)
    return (
        <ScrollView style={{ display: 'flex', flex: 1 }}>
            <View style={{ padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Icon name='arrow-left' size={40} onPress={() => navigation.goBack()} />
                <Icon name='trash-alt' size={40} color='red' onPress={() => deleteAllBtn()} />
            </View>
            <Text style={{ fontSize: 30, fontWeight: 'bold', padding:20 }}>My Pokemon List</Text>
            {
                detail === null
                    ?
                    <Text style={{fontSize: 25, fontWeight: 'bold'}}>There is No Pokemon You like</Text>
                    :
                    detail.map((item, index) => {
                        return (
                            <Pressable key={index} onPress={() => pokeDetailBtn(item.id, item.name, item.sprites.front_default, item.types, item.abilities, item.stats, item.moves)}>
                            <View style={{ display: 'flex', flexDirection: 'row', padding:20 }}>
                                <Image source={{ uri: item.sprites.front_default }} style={{ height: 100, width: 100 }} />
                                <View>
                                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>{item.name ? item.name.toUpperCase() : item.name}</Text>
                                    <Text style={{fontSize: 25, fontWeight: 'bold'}}> # {item.id} </Text>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        {item.types.map((itm, idx) => {
                                            return (
                                                <Chip title={itm.type.name} buttonStyle={{ backgroundColor: '#fdcb6e', marginRight: 10 }} titleStyle={{ color: 'black', fontSize: 20 }} key={idx} />
                                            )
                                        })}
                                    </View>
                                </View>
                            </View>
                            </Pressable>
                        )
                    })
            }
        </ScrollView>
    )
}

export default MyPokeListScreen
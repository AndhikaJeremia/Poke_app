import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { Image, FAB, Chip } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { getAllPokemon } from '../actions'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Pressable } from 'react-native'

const PokedexScreen = ({ navigation }) => {
    const [otherLink, setOtherLink] = React.useState(null)
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getAllPokemon(otherLink))
    }, [otherLink, hasil])

    const { next, prev, detail, hasil } = useSelector((state) => {
        return {
            next: state.pokedexReducer.next,
            prev: state.pokedexReducer.previous,
            detail: state.pokedexReducer.details,
            hasil: state.pokedexReducer.result,
        }
    })
    const nextFloatBtn = () => {
        setOtherLink(next)
    }
    const prevFloatBtn = () => {
        setOtherLink(prev)
    }
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
    return (
        <ScrollView style={{ display: 'flex', flex: 1 }}>
            <View style={{display:'flex', flexDirection:'row', justifyContent:'space-between', padding: 15}}>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Pokedex</Text>
            <Chip title='My Pokemon' buttonStyle={{backgroundColor:'#fdcb6e', marginRight:10}} titleStyle={{color:'black', fontSize:20}} onPress={() => navigation.navigate('MyPokeList')} />
            </View>
            <View style={{ display: 'flex', flexWrap: "wrap", justifyContent: 'space-around', flexDirection: 'row' }}>
                {detail.map((item, index) => {
                    return (
                        <Pressable key={index} onPress={() => pokeDetailBtn(item.id, item.name, item.sprites.front_default, item.types, item.abilities, item.stats, item.moves)}>
                            <View key={index} style={{ height: 170, width: 150, marginTop: 10, marginBottom: 10, borderRadius: 10, display: 'flex', backgroundColor: '#fdcb6e' }}>
                                <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: 'bold', backgroundColor: '#dfe6e9', borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>{item.name ? item.name.toUpperCase() : item.name}</Text>
                                <Image source={{ uri: item.sprites.front_default }}
                                    style={{ height: 120, width: 150 }}
                                />
                            </View>
                        </Pressable>
                    )
                })}
            </View>
            <FAB placement='right' visible={next ? true : false} color='#ffeaa7'
                icon={
                    <Icon
                        name='chevron-right'
                        style={{ fontSize: 20 }}
                    />
                }
                onPress={nextFloatBtn}
            />
            <FAB placement='left' visible={!prev ? false : true} color='#ffeaa7'
                icon={
                    <Icon
                        name='chevron-left'
                        style={{ fontSize: 20 }}
                    />
                }
                onPress={prevFloatBtn}
            />
        </ScrollView>
    )
}

export default PokedexScreen
import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Image } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { getPokeEvoFrom } from '../actions'

const EvoFromScreen = ({ id, navigation }) => {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(getPokeEvoFrom(id))
    }, [id])

    const { evo_details } = useSelector((state) => {
        return {
            evo_details: state.pokedexReducer.evo_details
        }
    })
    const pokeDetailBtn = (id, name, pic, type, abilities, stats) => {
        navigation.navigate('Pokedetail',
            {
                id: id,
                name: name,
                picture: pic,
                types: type,
                abilities: abilities,
                stats: stats
            })
    }
    return (
        <View style={{padding:10}}>
            <Text style={{ fontSize: 35, fontWeight: 'bold', }}>Evolution From</Text>
            {
                evo_details
                    ?
                    <Pressable onPress={() => pokeDetailBtn(evo_details.id, evo_details.name, evo_details.picture, evo_details.types, evo_details.abilities, evo_details.stats)}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Image source={{ uri: evo_details.picture }} style={{ height: 200, width: 150, marginRight: 20 }} />
                            <View>
                                <Text style={styles.Text_evo}>{evo_details.name ? evo_details.name.toUpperCase() : evo_details.name}</Text>
                                <Text style={styles.Text_evo}>#{evo_details.id}</Text>
                            </View>
                        </View>
                    </Pressable>
                    :
                    <Text style={styles.Text_evo}>This Pokemon is the base of Pokemon Evolution</Text>
            }

        </View>
    )
}

const styles = StyleSheet.create({
    Text_evo: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10
    }
})

export default EvoFromScreen

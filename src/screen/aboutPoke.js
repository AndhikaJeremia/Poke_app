import React from 'react'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/Ionicons'
import { getAboutPokemon } from '../actions'

const AboutPokeScreen = ({ id, data }) => {
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(getAboutPokemon(id))
    }, [])
    const { about } = useSelector((state) => {
        return {
            about: state.pokedexReducer.about
        }
    })
    return (
        <View style={{ padding: 10 }}>
            <View>
                <View style={styles.containText}>
                    <Text style={styles.NameText}>Species</Text>
                    <Text style={styles.Text}>{about.genus}</Text>
                </View>
                <View style={styles.containText}>
                    <Text style={{fontSize: 20, marginRight:10}}>Height</Text>
                    <Text style={styles.Text}>{about.height} cm</Text>
                </View>
                <View style={styles.containText}>
                    <Text style={{fontSize: 20, marginRight:10}}>Weight</Text>
                    <Text style={styles.Text}>{about.weight} kg</Text>
                </View>
                <View style={styles.containText}>
                    <Text style={styles.NameText}>Abilities</Text>
                    <View>
                    {data.map((item, index) => {
                        return(
                            <View key={index}>
                                <Text style={styles.Text}>{item.ability.name}</Text>
                            </View>
                        )
                    })}

                    </View>
                </View>
            </View>
            <Text style={{ fontSize: 30, fontWeight: 'bold' }}>Breeding</Text>
            <View >
                <View style={styles.containText}>
                    <Text style={styles.NameText}>Gender</Text>
                    <View style={{marginLeft: 75, display:'flex', flexDirection:'row'}}>
                        <Icon name='male-outline' size={20} color='blue'  style={{fontWeight:'bold'}}/>
                        <Text style={{fontSize:20, marginLeft:10, marginRight:10}}>{about.genderM}</Text>
                        <Icon name='female-outline' size={20} color='red' style={{fontWeight:'bold'}} />
                        <Text style={{fontSize:20, marginLeft:10}}>{about.genderF}</Text>
                    </View>
                    <View>

                    </View>
                </View>
                <View style={styles.containText}>
                    <Text style={{fontSize: 20}}>Egg Groups</Text>
                    <Text style={{fontSize: 20, marginLeft:40}}>{about.eggGroup}</Text>
                </View>
            </View>
        </View>
    )
}

export default AboutPokeScreen

const styles = StyleSheet.create({
    NameText: {
        fontSize: 20,
    },
    containText: {
        display:'flex',
        flexDirection:'row'
    },
    Text: {
        fontSize: 20,
        marginLeft: 70
    }
})
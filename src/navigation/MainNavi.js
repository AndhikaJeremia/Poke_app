import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import PokedexScreen from '../screen/pokedex'
import PokedetailScreen from '../screen/pokedetail'
import MyPokeListScreen from '../screen/myPokeList'

const MainNavi = () => {
    const stack = createStackNavigator()
    return (
        <stack.Navigator screenOptions={{headerShown:false}}>
            <stack.Screen name='Pokedex' component={PokedexScreen}/>
            <stack.Screen name='Pokedetail' component={PokedetailScreen} />
            <stack.Screen name='MyPokeList' component={MyPokeListScreen} />
        </stack.Navigator>
    )
}

export default MainNavi
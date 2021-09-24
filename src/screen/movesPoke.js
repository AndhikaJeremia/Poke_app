import React from 'react'
import { ScrollView } from 'react-native'
import {SafeAreaView, View, Text} from 'react-native'

const MovesPokeScreen = ({data}) => {
    return(
        <ScrollView style={{paddingLeft:10}}>
            {data.map((item, index) => {
                return(
                    <View key={index}>
                        <Text style={{ fontSize: 20 }}> - {item.move.name}</Text>
                    </View>
                )
            })}
        </ScrollView>
    )
}

export default MovesPokeScreen
import React from 'react'
import { View, Text } from 'react-native'

const StatsComponent = ({ data }) => {
    return (
        <View style={{ padding: 10, marginTop:10 }}>
            {data.map((item, index) => {
                return (
                    <View key={index} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom:10 }}>
                        <Text style={{ fontSize: 20, fontWeight:'bold' }}>{item.stat.name.toUpperCase()}</Text>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <Text style={{ fontSize: 20, marginRight:10 }}>{item.base_stat}</Text>
                            <View style={{ width: 100, backgroundColor: '#636e72', height: 20 }}>
                                <View style={{ width: item.base_stat, backgroundColor: '#fdcb6e', height: 20 }} />
                            </View>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

export default StatsComponent
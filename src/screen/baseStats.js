import React from 'react'
import { View, Text } from 'react-native'
import StatsComponent from '../component/statsProgress'

const BaseStatsScreen = ({data}) => {
    return(
        <View>
            <StatsComponent data={data} />
        </View>
    )
}

export default BaseStatsScreen
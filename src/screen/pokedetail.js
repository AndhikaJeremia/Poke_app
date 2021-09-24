import React from 'react'
import { View, Text } from 'react-native'
import { ButtonGroup, Image, Chip } from 'react-native-elements'
import { getMyPokeList } from '../actions'
import { useDispatch } from 'react-redux'
import AboutPokeScreen from './aboutPoke'
import BaseStatsScreen from './baseStats'
import EvoFromScreen from './evoFrom'
import MovesPokeScreen from './movesPoke'
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const PokedetailScreen = ({ route, navigation }) => {
    const dispatch = useDispatch()
    const { id, name, picture, types, abilities, stats, moves } = route.params
    const [slctIndex, setSlctIndex] = React.useState(0)
    const [like, setLike] = React.useState(false)
    const button = ['About', 'Base Stats', 'Evolution', 'Moves']
    React.useEffect(async() => {
        try{
            const localStorage = await AsyncStorage.getItem('like')
            if(localStorage !== null){
                let valueStorage = JSON.parse(localStorage)
                for await(let item of valueStorage.likes){
                    if(item.id === id){
                        setLike(true)
                    }
                }
            }
        }
        catch(error){
            console.log('Error Getting from AsyncStorage', error)
        }
    },[])
    const likeBtn = async(id) => {
        try{
            let likes = []
            let localstorage = await AsyncStorage.getItem('like')
            if (localstorage === null){
                const tempData = {likes:[{id:id}]}
                let data = JSON.stringify(tempData)
                await AsyncStorage.setItem('like', data)
                setLike(true)
            }
            if(like){
                let valueStorage = JSON.parse(localstorage)
                likes = valueStorage.likes
                const hasil = await likes.map((item, index) => {
                    if(item.id === id){
                        likes.splice(index, 1)
                    }
                })
                let data = {likes}
                data = JSON.stringify(data)
                await AsyncStorage.setItem('like', data)
                dispatch(getMyPokeList())
                setLike(false)
            }
            else {
                let valueStorage = JSON.parse(localstorage)
                likes = valueStorage.likes
                let data = {id:id}
                likes.push(data)
                data = {likes}
                let newdata = JSON.stringify(data)
                await AsyncStorage.setItem('like', newdata)
                setLike(true)
           }
        }
        catch(err){
            console.log(err)

        }
    }
    return (
        <View style={{display:'flex', flexDirection:'column'}}>
            <View style={{ flexGrow:1, padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                <Icon name='arrow-back-outline' size={30} onPress={() => navigation.goBack()} />
                <Icon name={like ? 'heart' : 'heart-outline'} size={30} color='red' onPress={() => likeBtn(id)} />
            </View>
            <View style={{ flexGrow:1, display: 'flex', flexDirection: 'row' }}>
                <Image
                    source={{ uri: picture }}
                    style={{ height: 130, width: 160 }}
                />
                <View>
                    <Text style={{fontSize: 25, fontWeight: 'bold'}}> {name.toUpperCase()} </Text>
                    <Text style={{fontSize: 25, fontWeight: 'bold'}}> # {id} </Text>
                    <View style={{display:'flex', flexDirection:'row'}}>
                        {types.map((item, index) => {
                            return (
                                <Chip title={item.type.name.toUpperCase()} buttonStyle={{backgroundColor:'#fdcb6e', marginRight:10}} titleStyle={{color:'black', fontSize:14}} key={index}/>
                            )
                        })}
                    </View>
                </View>
            </View>
            <View style={{flexGrow:4, height:'100%', backgroundColor: '#b2bec3',padding: 15, borderTopLeftRadius: 40, borderTopRightRadius: 40 }}>
                <ButtonGroup
                    onPress={(value) => setSlctIndex(value)}
                    selectedIndex={slctIndex}
                    buttons={button}
                    containerStyle={{ height: 30, borderRadius: 10 }}
                    selectedButtonStyle={{ backgroundColor: '#fdcb6e' }}
                    selectedTextStyle={{ color: 'black' }}
                    buttonStyle={{ backgroundColor: '#dfe6e9' }}
                    textStyle={{ color: 'black' }}
                />
                {
                    slctIndex === 0
                        ?
                        <AboutPokeScreen id={id} data={abilities} />
                        :
                        slctIndex === 1
                            ?
                            <BaseStatsScreen data={stats} />
                            :
                            slctIndex === 2
                                ?
                                <EvoFromScreen id={id} navigation={navigation} />
                                :
                                <MovesPokeScreen data={moves} />
                }

            </View>
        </View>
    )
}

export default PokedetailScreen
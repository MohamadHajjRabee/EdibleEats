import {FlatList, Image, Text, View, StyleSheet, Pressable} from "react-native";
import {useIsFocused} from "@react-navigation/native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import plantImages from "../../data/plantImages";
import plantNames from "../../data/plantNames";
import { FontAwesome6 } from '@expo/vector-icons';
import {useTheme} from "react-native-paper";
export default function Favorites({navigation}){
    const isFocused = useIsFocused();
    const [favorites, setFavorites] = useState([])
    const {colors} = useTheme()
    useEffect(() => {
        const fetchFavorites = async () => {
            const favoritesList = JSON.parse(await AsyncStorage.getItem('favorites'))
            setFavorites(favoritesList)
        }
        fetchFavorites()
    }, [isFocused]);

    const ListEmptyComponent = () => {
        return (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center', gap: 30}}>
            <FontAwesome6 name="heart-crack" size={150} color="white" />
            <Text style={{color:'white', fontSize: 16}}>Your favorites list is empty!</Text>
        </View>
        )
    }

    const Item = ({item, index})=> {
        const name = plantNames[item.index]
        const image = plantImages[name][0]
        const date = new Date(item.date)
        return (
            <Pressable onPress={() => navigation.navigate('Result', {prediction: item.index, confidence: 0.99})} key={index} style={{...style.itemContainer, backgroundColor: colors.secondaryContainer}}>
                <Image source={image} style={style.itemImage}/>
                <View>
                    <Text style={style.itemName}>{name}</Text>
                    <Text style={style.itemDate}>{date.toLocaleDateString()} {date.toLocaleTimeString()}</Text>
                </View>
            </Pressable>
        )
    }
    return (
        <FlatList data={favorites} contentContainerStyle={{flexGrow: 1, backgroundColor: colors.primary}} ListEmptyComponent={ListEmptyComponent} renderItem={Item}/>
    );
}
const style = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        margin: 10,
        padding: 10,
        alignItems: 'center',
        gap: 20,
        borderRadius: 15
    },
    itemImage: {
        height:50,
        width: 50,
        borderRadius: 10
    },
    itemName: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600'
    },
    itemDate: {
        color: '#9a9a9a',
        fontSize: 13,
        fontWeight: '600',
    }
})
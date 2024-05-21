import {FlatList, Image, Pressable, StyleSheet, Text, View} from "react-native";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import plantNames from "../../data/plantNames";
import {useTheme} from "react-native-paper";
import { FontAwesome } from '@expo/vector-icons';
import {useIsFocused} from "@react-navigation/native";
export default function History(){
    const { colors } = useTheme();
    const [data, setData] = useState([])
    const isFocused = useIsFocused();

    const getData = async () => {
        const history = JSON.parse(await AsyncStorage.getItem('history')) || [];
        setData(history)
    }
    useEffect(() => {


        getData()

    }, [isFocused]);

    const deleteItem = async (index)=> {
        const favorites = [...data.slice(0, index), ...data.slice(index + 1)];
        await AsyncStorage.setItem('history', JSON.stringify(favorites))
        await getData()
    }


    const Item = ({item, index}) => {
        const date = new Date(item.date)
        return (
            <View style={{padding:10, backgroundColor:colors.primaryContainer, margin: 10, borderRadius:15, alignItems:'center', flexDirection: 'row', gap:20}}>
                <Image source={{uri: item.image}}  style={styles.image} />
                <View style={{flexGrow:1}}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>{plantNames[item.prediction]}</Text>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>{date.toLocaleDateString()} {date.toLocaleTimeString()}</Text>
                </View>
                <Pressable onPress={() => deleteItem(index)}><FontAwesome name="remove" size={24} color="white" /></Pressable>
            </View>
        )
    }

    const ListEmptyComponent = () => {
        return (
            <View style={{flex:1, justifyContent: 'center', alignItems: 'center', gap: 30}}>
                <Image source={require('./../../assets/empty-box-1.png')} style={{ height:150, width: 150}}/>
                <Text style={{color:'white', fontSize: 16}}>You haven't scanned any images!</Text>
            </View>
        )
    }

    const deleteAllData = async() => {
        await AsyncStorage.removeItem('history')
        await getData()
    }
    const DeleteAll = () => {

        return (data.length >= 1 &&
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingTop: 10, paddingBottom: 5}}>
                <Text style={{color: 'white', fontSize: 20}}>History</Text>
                <Pressable onPress={deleteAllData}><Text style={{color: 'white', textDecorationLine: 'underline'}}>Delete all</Text></Pressable>
            </View>
        )
    }
    return (
            <FlatList data={data} contentContainerStyle={{flexGrow: 1, backgroundColor: colors.primary}} ListEmptyComponent={ListEmptyComponent} ListHeaderComponent={DeleteAll} renderItem={Item} keyExtractor={(item, index) => index.toString()}/>
    );
}
const styles = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        borderRadius:10,
    }
});
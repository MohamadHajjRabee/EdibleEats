import {FlatList, Image, Pressable, Text, StyleSheet, View} from "react-native";
import plantNames from "../../data/plantNames";
import plantImages from "../../data/plantImages";
import {LinearGradient} from "expo-linear-gradient";
import {useTheme} from "react-native-paper";

export default function Plants({navigation}){
    const {colors} = useTheme()
    const plants = plantNames.map((plantName) => {
        return {
            name: plantName,
            image: plantImages[plantName][0]
        }
    })

    const Item = ({item, index}) => {
        return (
            <LinearGradient colors={['#135D66', '#435864']} start={[1, 0]} end={[0, 0]} style={{...style.itemContainer, borderColor: colors.secondaryContainer}}>
                <Pressable style={{flexDirection: 'column', gap: 15, alignItems: 'center'}} onPress={() => navigation.navigate("Result", {prediction: index, confidence: 0.99})}>
                    <Image source={item.image} style={style.image}/>
                    <Text style={style.itemText}>{item.name}</Text>
                </Pressable>
            </LinearGradient>
        )
    }
    const ListHeaderComponent = () => {
        return (
            <View style={style.headerContainer}>
                <Text style={style.headerText}>Archive</Text>
            </View>
        )
    }
    return (
        <FlatList data={plants} ListHeaderComponent={ListHeaderComponent} contentContainerStyle={{flexGrow: 1, backgroundColor: colors.primary}} renderItem={Item} keyExtractor={(item, index) => index.toString()}/>
    );
}

const style = StyleSheet.create({
    itemContainer:{
        padding: 15,
        margin: 20,
        borderRadius: 10,
        borderWidth: 1,

    },
    image: {
        height: 250,
        width: 250,
        borderRadius: 5
    },
    itemText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600'
    },
    headerContainer:{
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    headerText: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold'
    }
})
import {Linking, Pressable, Text, View, StyleSheet} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {useTheme} from "react-native-paper";

export default function About(){
    const {colors} = useTheme()
    return (
        <LinearGradient colors={[colors.primary, colors.primaryContainer]} style={{flex:1}}>
            <View style={style.container}>

                <Text style={{...style.text, fontSize:24}}>Edible Eats</Text>
                <Text style={style.text}>Made By Mohamad Hajj Rabee</Text>
                <Text style={style.text}>Edible Eats is a mobile app designed to help you identify and learn about edible wild plants. This app provides detailed information and images to make your foraging adventures safer and more informed.</Text>
                <View>
                    <Text style={style.text}>project github page:</Text>
                    <Pressable onPress={() => Linking.openURL('https://github.com/MohamadHajjRabee/EdibleEats')}><Text style={{...style.text, textDecorationLine:'underline'}}>https://github.com/MohamadHajjRabee/EdibleEats</Text></Pressable>
                </View>
                <Text style={{position:'absolute', bottom:10, color:'white'}}>App version: 1.0</Text>

            </View>
        </LinearGradient>
    );
}
const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        gap: 25
    },
    text:{
        color:'white',
        fontWeight: 'bold',
        fontSize: 18,

    }
})
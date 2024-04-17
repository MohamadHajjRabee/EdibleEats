import {SafeAreaView, StyleSheet, Text, Image} from "react-native";
import {useTheme} from "react-native-paper";
import plantNames from "../../data/plantNames";
import plantImages from "../../data/plantImages";

export default function Plants({navigation, route}){
    const { colors } = useTheme();


    return (
        <SafeAreaView>
            <Text style={[styles.headerText, {color: colors.secondaryContainer, backgroundColor: colors.primaryContainer}]}>Result</Text>
            <Image source={plantImages[plantNames[route.params.prediction]]}  style={styles.image} />
            <Text style={[styles.text, {color: colors.primaryContainer}]}>Plant Name: {plantNames[route.params.prediction]}</Text>
            <Text style={[styles.text, {color: colors.primaryContainer}]}>Confidence: {(route.params.confidence * 100).toFixed(1)}</Text>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    headerText:{
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 24,
        paddingVertical: 10
    },
    image: {
        maxWidth: '100%',
        height: 300,
    },
    text: {
        fontWeight: "bold",
        fontSize: 16,
        margin: 20
    }
});
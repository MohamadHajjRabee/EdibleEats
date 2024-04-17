import {Text, StyleSheet, SafeAreaView, View, Pressable, ActivityIndicator} from "react-native";
import {useTheme} from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import {useEffect, useState} from "react";
import * as FS from 'expo-file-system';

export default function Home({navigation}){
    const { colors } = useTheme();
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false)
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.3,

        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const takeImage = async () => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.3,
        });
        console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    useEffect( () => {
        async function fetchData() {

            if (image.length) {
                setLoading(true)
                const base64 = await FS.readAsStringAsync(image, { encoding: 'base64' });
                const formData = new FormData();
                formData.append('image', base64);

                const predRes = await fetch('https://edibleeats-backend.onrender.com/predict', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({image: base64})
                });

                const resData = await predRes.json();
                console.log(resData)
                navigation.navigate('Result', resData)
                setLoading(false)
            }
        }
        fetchData()
    }, [image]);

    return (
        <SafeAreaView>
            <Text style={[styles.homeText, {color: colors.secondaryContainer, backgroundColor: colors.primaryContainer}]}>Home</Text>
            <View style={[styles.buttonsView, {backgroundColor: colors.secondaryContainer}]}>
                <Pressable onPress={pickImage} style={[styles.button, {backgroundColor: colors.secondary}]}>
                    <Text>Choose an image</Text>
                </Pressable>
                <Text style={styles.buttonsViewText}>OR</Text>
                <Pressable onPress={takeImage} style={[styles.button, {backgroundColor: colors.secondary}]}>
                    <Text>Take a photo</Text>
                </Pressable>
                {loading ? <ActivityIndicator size='large'/> : null}
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    homeText:{
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 24,
        paddingVertical: 10
    },
    buttonsView:{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap:20
    },
    buttonsViewText:{
        color: 'black'
    },
    image: {
        width: 200,
        height: 200,
    },
    button:{

        padding: 10,
        borderRadius: 5,
    }

});
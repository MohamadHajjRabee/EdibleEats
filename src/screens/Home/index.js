import {Text, StyleSheet, SafeAreaView, View, Pressable, ActivityIndicator, ImageBackground, Alert} from "react-native";
import {useTheme} from "react-native-paper";
import * as ImagePicker from 'expo-image-picker';
import {useEffect, useState} from "react";
import * as FS from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Entypo } from '@expo/vector-icons';

export default function Home({navigation}){
    const { colors } = useTheme();
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false)
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.3,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const takeImage = async () => {
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.3,
        });
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

                const predRes = await fetch('https://surrounding-yoko-mohamadhr.koyeb.app/predict', {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({image: base64})
                });

                const resData = await predRes.json();
                if((resData.confidence * 100).toFixed(1) < 75){
                    Alert.alert('Error', "Image doesn't include a plant or couldn't identify it correctly, Please try again with a different image.", [{
                        text:'OK'
                    }])
                }else{
                    const history = JSON.parse(await AsyncStorage.getItem('history')) || [];
                    const date = new Date();
                    history.unshift({...resData, date: date, image:image})
                    await AsyncStorage.setItem('history', JSON.stringify(history));
                    navigation.navigate('Result', resData)
                }
                setLoading(false)
            }
        }
        fetchData()
    }, [image]);



    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground source={require('../../assets/homeBackground.jpg')} resizeMode='cover' style={{flex:1}}>
                <Text style={[styles.homeText, {color: colors.primary}]}>Edible Eats</Text>
                <View style={[styles.buttonsView, {flex: 1}]}>
                    <Text>Input an image to start predicting your plant</Text>
                    <View style={{padding: 10, backgroundColor: colors.secondary, borderRadius: 30}}>
                        <Pressable onPress={pickImage} style={[styles.imageInput, {backgroundColor: colors.secondary, borderColor: colors.primaryContainer}]}>
                            <Text style={{color: '#454428', fontWeight: '600'}}>Choose an image</Text>
                        </Pressable>
                    </View>
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                        <View style={{height: 2, width: 100, backgroundColor: colors.primary}}></View>
                        <Text style={styles.buttonsViewText}>OR</Text>
                        <View style={{height: 2, width: 100, backgroundColor: colors.primary}}></View>
                    </View>
                    <Pressable onPress={takeImage} style={[styles.button, {backgroundColor: colors.secondary}]}>
                        <Text style={{color: '#454428', fontWeight: '600'}}>Take a photo </Text>
                        <Entypo name="camera" size={24} color="#454428" />
                    </Pressable>
                    {loading ? <ActivityIndicator size='large'/> : null}
                </View>
            </ImageBackground>
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
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageInput:{
        height: 300,
        width: 300,
        borderRadius: 20,
        borderStyle: "dashed",
        borderWidth: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
import {
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    Dimensions,
    Pressable,
    Linking,
    ImageBackground
} from "react-native";
import {useTheme} from "react-native-paper";
import plantNames from "../../data/plantNames";
import plantImages from "../../data/plantImages";
import { FontAwesome } from '@expo/vector-icons';
import {useEffect, useState} from "react";
import plantsInfo from '../../assets/plantsInfo.json'
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Plants({route}){
    const { colors } = useTheme();
    const confidence = (route.params.confidence * 100).toFixed(1)
    const plantName = plantNames[route.params.prediction]
    const images = plantImages[plantName]
    const plantInfo = plantsInfo.find((plant) => plant.name === plantName)
    const [itemInFavorites, setItemInFavorites] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0);
    const windowWidth = Dimensions.get('window').width;

    useEffect(  () => {
        checkPlantInFavorites()
    }, []);
    const checkPlantInFavorites = async () => {
        const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || []
        if (favorites.length > 0) {
            setItemInFavorites(favorites.some((plant) => plant.index === route.params.prediction))
        }

    }
    const toggleItemInFavorites = async () => {
        const favorites = JSON.parse(await AsyncStorage.getItem('favorites')) || []
        let newFavorites
        if(itemInFavorites){
            newFavorites = favorites.filter((plant)=> plant.index !== route.params.prediction)
            await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites))
            setItemInFavorites(false)
        }else{
            const date = new Date()
            favorites.unshift({index: route.params.prediction, date: date})
            newFavorites = favorites
            setItemInFavorites(true)
        }
        await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites))
    }
    const handleScroll = (event) => {
        const slideIndex = Math.round(event.nativeEvent.contentOffset.x / windowWidth);
        setCurrentIndex(slideIndex);
    };
    const LowConfidence = () => {
        return (
            <View style={styles.warningView}>
                <FontAwesome name="warning" size={24} color="#FFC107" />
                <Text style={{color: '#F0AD4E', flex: 1, flexWrap: 'wrap'}}><Text style={{fontWeight: 'bold'}}>Warning!</Text> We couldn't identify the plant type accurately. This is the closest result. Please verify with other sources or manual inspection. </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <ImageBackground style={{flex: 1, width: '100%', height: '100%'}} blurRadius={20} source={images[currentIndex]} resizeMode='cover'>
                <ScrollView>

                    <View style={{flexDirection: 'row', alignItems:'center', justifyContent: 'center', gap:10}}>
                        <Image source={require('./../../assets/green_leaves_left.png')} style={{height:20, width:40}}/>
                        <Text style={[styles.pageHeaderText, {color: colors.secondaryContainer}]}>{plantName}</Text>
                        <Image source={require('./../../assets/green_leaves_right.png')} style={{height:20, width:40}}/>
                    </View>

                    <View>
                        <ScrollView
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            onScroll={handleScroll}
                            scrollEventThrottle={16}
                        >
                            {images.map((image, index) => (
                                <Image
                                    key={index}
                                    source={ image }
                                    style={{...styles.image, width: windowWidth}}
                                />
                            ))}
                        </ScrollView>
                        <View style={styles.pagination}>
                            {images.map((_, index) => (
                                <View
                                    key={index}
                                    style={[
                                        styles.paginationDot,
                                        index === currentIndex && {backgroundColor: colors.secondaryContainer},
                                    ]}
                                />
                            ))}
                        </View>
                    </View>


                    <View style={{padding:10, width: '100%', flexDirection: 'row'}}>
                        <Pressable onPress={toggleItemInFavorites} style={{ width:'80%' ,backgroundColor:colors.primaryContainer, marginHorizontal: 'auto',marginTop: 10, borderRadius: 15, height:40, flexDirection: 'row', justifyContent: 'center', alignItems:'center'}}><Text style={{color: 'white', fontWeight: '600'}}>{itemInFavorites ? 'Remove from favorites' : 'Add to favorites'}</Text></Pressable>
                    </View>


                    <View style={styles.textContainer}>
                        {confidence < 92 && <LowConfidence/>}
                        <View>
                            <Text style={styles.headerText}>Also Known As: </Text>
                            <Text style={{...styles.text,fontStyle: 'italic'}}>{plantInfo.also_known_as}</Text>
                        </View>
                        <View>
                            <Text style={styles.text}>{plantInfo.description}</Text>
                        </View>
                        <View>
                            <Text style={styles.headerText}>Edible parts:</Text>
                            <Text style={styles.text}>{plantInfo.edible}</Text>
                        </View>
                        <View>
                            <Text style={styles.headerText}>Sources:</Text>
                            {plantInfo.sources.map((link, index) => {
                                return(
                                    <Pressable key={index} onPress={()=> Linking.openURL(link)}><Text numberOfLines={1} style={{color:'white'}}>{index + 1}. <Text style={{textDecorationLine: 'underline'}}>{link}</Text></Text></Pressable>
                                )
                            })}
                        </View>
                    </View>

                </ScrollView>
            </ImageBackground>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    pageHeaderText:{
        fontWeight: '600',
        fontSize: 24,
        paddingVertical: 10
    },
    warningView: {
        margin: 10,
        padding: 10,
        backgroundColor: 'rgba(255,193,7,0.25)',
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        borderWidth: 1,
        borderColor: 'rgba(255,193,7,0.3)',
        borderRadius: 10,
    },
    image: {
        height: 320,
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        left: 0,
        right: 0,
        justifyContent: 'center',
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#888',
        marginHorizontal: 5,
    },
    textContainer: {
        margin:10,
        flexWrap: 'nowrap',
        gap:20,
        padding: 10,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    headerText: {
        color: 'white',
        fontWeight: "bold",
        fontSize: 20
    },
    text:{
        color: 'white',
        fontWeight: "600",
        fontSize: 15
    }
});
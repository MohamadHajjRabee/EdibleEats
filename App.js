import {Text, StyleSheet, StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Favorites from "./src/screens/Favorites";
import About from "./src/screens/About";
import Plants from "./src/screens/Plants";
import History from "./src/screens/History";
import Result from "./src/screens/Result"

const Tab = createMaterialBottomTabNavigator();
const Stack = createNativeStackNavigator();
export default function App() {
    const theme = useTheme({
        colors:{
            primary:'#003C43',
            primaryContainer: '#135D66',
            secondary: '#77B0AA',
            secondaryContainer: '#E3FEF7',
            background: '#003C43'
        }
    });


  return (
      <Provider theme={theme}>
          <StatusBar backgroundColor={theme.colors.primaryContainer}/>
          <NavigationContainer>
              <Stack.Navigator screenOptions={{
                  headerShown: false
              }}>
                  <Stack.Screen name="Main" component={HomeTabs} />
                  <Stack.Screen name="Result" component={Result} options={{
                      animationTypeForReplace: 'pop',
                      animation: 'slide_from_right'
                  }}/>

              </Stack.Navigator>
          </NavigationContainer>
      </Provider>
  );

  function HomeTabs() {
      return (
          <Tab.Navigator
              initialRouteName="Home"
              activeColor={theme.colors.primary}
              inactiveColor="#77B0AA"
              barStyle={{backgroundColor: theme.colors.primaryContainer}}
              shifting={true}
              theme={{ colors: { secondaryContainer: theme.colors.secondaryContainer } }}
          >
              <Tab.Screen
                  name="Home"
                  component={Home}
                  options={{
                      tabBarLabel: <Text style={styles.tabBarLabel}>Home</Text>,
                      tabBarIcon: ({color}) => (
                          <MaterialCommunityIcons name="home" color={color} size={26}/>
                      ),
                  }}
              />
              <Tab.Screen
                  name="History"
                  component={History}
                  options={{
                      tabBarLabel: <Text style={styles.tabBarLabel}>History</Text>,
                      tabBarIcon: ({color}) => (
                          <MaterialCommunityIcons name="history" color={color} size={26}/>
                      ),
                  }}
              />
              <Tab.Screen
                  name="Favorites"
                  component={Favorites}
                  options={{
                      tabBarLabel: <Text style={styles.tabBarLabel}>Favorites</Text>,
                      tabBarIcon: ({color}) => (
                          <MaterialCommunityIcons name="heart" color={color} size={26}/>
                      ),
                  }}
              />
              <Tab.Screen
                  name="Plants"
                  component={Plants}
                  options={{
                      tabBarLabel: <Text style={styles.tabBarLabel}>Plants</Text>,
                      tabBarIcon: ({color}) => (
                          <MaterialCommunityIcons name="format-list-bulleted" color={color} size={26}/>
                      ),
                  }}
              />
              <Tab.Screen
                  name="About"
                  component={About}
                  options={{
                      tabBarLabel: <Text style={styles.tabBarLabel}>About</Text>,
                      tabBarIcon: ({color}) => (
                          <MaterialCommunityIcons name="information" color={color} size={26}/>
                      ),
                  }}
              />
          </Tab.Navigator>
      )
  }

}
const styles = StyleSheet.create({
    tabBarLabel: {
        fontSize: 14,
        color: '#E3FEF7',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
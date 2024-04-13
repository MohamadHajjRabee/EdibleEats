import { Text, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, useTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();
function HomeScreen() {
  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Hi :)</Text>
      </View>
  );
}

export default function App() {
    const theme = useTheme({
        colors:{
            secondaryContainer: '#E3FEF7'
        }
    });


  return (
      <Provider theme={theme}>
          <NavigationContainer>
              <Tab.Navigator
                  initialRouteName="Home"
                  activeColor="#003C43"
                  inactiveColor="#77B0AA"
                  barStyle={{ backgroundColor: '#135D66'}}
                  shifting={true}

              >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: <Text style={styles.tabBarLabel}>Home</Text>,
                        tabBarIcon: ({ color }) => (
                          <MaterialCommunityIcons name="home" color={color} size={26} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="History"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: <Text style={styles.tabBarLabel}>History</Text>,
                      tabBarIcon: ({ color }) => (
                          <MaterialCommunityIcons name="history" color={color} size={26} />
                      ),
                    }}
                />
                <Tab.Screen
                    name="Favorites"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: <Text style={styles.tabBarLabel}>Favorites</Text>,
                      tabBarIcon: ({ color }) => (
                          <MaterialCommunityIcons name="heart" color={color} size={26} />
                      ),
                    }}
                />
                  <Tab.Screen
                      name="Plants"
                      component={HomeScreen}
                      options={{
                          tabBarLabel: <Text style={styles.tabBarLabel}>Plants</Text>,
                          tabBarIcon: ({ color }) => (
                              <MaterialCommunityIcons name="format-list-bulleted" color={color} size={26} />
                          ),
                      }}
                  />
                  <Tab.Screen
                    name="About"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: <Text style={styles.tabBarLabel}>About</Text>,
                      tabBarIcon: ({ color }) => (
                          <MaterialCommunityIcons name="information" color={color} size={26} />
                      ),
                    }}
                />
              </Tab.Navigator>
          </NavigationContainer>
      </Provider>
  );
}
const styles = StyleSheet.create({
    tabBarLabel: {
        fontSize: 14,
        color: '#E3FEF7',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});
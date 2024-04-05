import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from "react-native";
import './src/i18n/i18n.config'
import { useTranslation } from 'react-i18next';
import { color } from './src/utils/color';
import HomeStackScreen from './src/screens/StackScreen/HomeStackScreen';
import StudyStackScreen from './src/screens/StackScreen/StudyStackScreen';
import HomeScreen from './src/screens/StackScreen/HomeScreen';
import SettingScreen from './src/screens/DetailtScreen/setting/SettingScreen';

function MyTabs() {
  const Tab = createBottomTabNavigator();
  const listTab = [
    {label: 'Home', name: 'Home',icon: 'home',component: HomeStackScreen},
    {label: 'Study', name: 'Study',icon: 'lead-pencil',component: StudyStackScreen},
    {label: 'Course', name: 'Course',icon: 'book-open',component: HomeScreen},
    {label: 'Document', name: 'Document',icon: 'file-document',component: HomeScreen},
    {label: 'About', name: 'About',icon: 'information',component: SettingScreen}
  ]
  const { t } = useTranslation()
  return (
    <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: color.statusbar_bg,
            height: 50
          }
        }}
    >
          {listTab.map((tab,index)=> <Tab.Screen name={tab.name} component={tab.component} key={index}
                  options={{
                            tabBarIcon: ({ focused }) => (
                              <MaterialCommunityIcons 
                                    style={{fontSize: 18, position: 'absolute', bottom: 23}}
                                    name={tab.icon}
                                    color={focused?color.active_color:color.text_light}
                              />
                            ),
                            tabBarLabel: t(tab.label),
                  tabBarLabelStyle: {position: 'absolute', bottom: 4, fontSize: 12},
                  tabBarActiveTintColor: color.active_color,
                  tabBarInactiveTintColor: color.text_light
          }}/>)}
    </Tab.Navigator>
  );
}
export default function AppNavigation() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={color.statusbar_bg}/>
      <MyTabs/>
    </NavigationContainer>
  );
}

{
  "name": "my-app",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "expo start",
    "android": "expo run:android",
    "ios": "expo run:ios",
    "web": "expo start --web"
  },
  "dependencies": {
    "@react-navigation/bottom-tabs": "^6.5.20",
    "@react-navigation/native": "^6.1.17",
    "@react-navigation/native-stack": "^6.9.26",
    "@react-navigation/stack": "^6.3.29",
    "axios": "^1.6.8",
    "expo": "~50.0.14",
    "expo-av": "^13.10.5",
    "expo-status-bar": "~1.11.1",
    "i18next": "^23.10.1",
    "intl-pluralrules": "^2.0.1",
    "jwt-decode": "^4.0.0",
    "react": "18.2.0",
    "react-i18next": "^14.1.0",
    "react-native": "0.73.6",
    "react-native-alert-notification": "^0.4.0",
    "react-native-element-dropdown": "^2.10.4",
    "react-native-elements": "^3.4.3",
    "react-native-google-mobile-ads": "^13.1.0",
    "universal-cookie": "^7.1.4"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  },
  "private": true
}

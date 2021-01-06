/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Linking, Image,View, Alert} from 'react-native';
import {P} from './components/typo';
import * as Stl from './components/styles';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import store from './store/store';
import { Root } from "native-base";
import AsyncStorage from '@react-native-community/async-storage';

import { NavigationContainer, useNavigation, NavigationAction } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { 
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';

import Logo from './assets/img/logo.png'

//routes
import IntroScreen from './screens/Intro';
import RulesScreen from './screens/Rules';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import SchoolOnMap from './screens/School/map';
import EditLocation from './screens/School/editLocation';
import DedicateData from './screens/School/dedicateData';
import SchoolPhotos from './screens/School/photo';
import AppAlert from './utils';

// import PushPole from 'pushpole-react-native'

//
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export const navigationRef = React.createRef();


function DrawerScreen(props) {
    return (
        <Drawer.Navigator drawerPosition="right" drawerContent={props => <CustomDrawerContent {...props} />}> 
          <Drawer.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        </Drawer.Navigator>
      );
}

const App = () => {
  console.disableYellowBox = true;
  // PushPole.initialize(true);

    return ( 
      <Root>
        <Provider store={store}>
          <NavigationContainer ref={navigationRef}>
              <Stack.Navigator
                screenOptions={{
                  headerTitleStyle: {
                    fontFamily: Stl.font.fontFamily,
                    fontWeight: 'normal',
                  },
                  // headerBackTitleStyle:{
                  //   fontFamily: Stl.font.fontFamily,
                  //   fontWeight: 'normal',
                  // },
                  
                  headerBackTitle: 'بازگشت'
                }}
              >
                  <Stack.Screen name="Intro" component={IntroScreen}  options={{headerShown: false}} />
                  <Stack.Screen name="Rules" component={RulesScreen} options={{headerShown: false}}  />
                  <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}  />
                  <Stack.Screen name="DrawerScreen" component={DrawerScreen} options={{headerShown: false, title: ''}}/>
                  <Stack.Screen name="SchoolOnMap" component={SchoolOnMap} options={{title: 'موقعیت مدرسه روی نقشه'}}  />
                  <Stack.Screen name="EditSchoolLocation" component={EditLocation} options={{title: 'موقعیت مدرسه'}}  />
                  <Stack.Screen name="SchoolDedicateData" component={DedicateData} options={{title: 'اطلاعات مدرسه'}}  />
                  <Stack.Screen name="SchoolPhotos" component={SchoolPhotos} options={{title: 'تصاویر مدرسه'}}  />


              </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </Root>
    );
};


export default App;

function CustomDrawerContent(props) {
  const navigation = useNavigation()
  return (
    <DrawerContentScrollView {...props}>
      {/* <DrawerItemList {...props} /> */}
      <View style={{flexDirection: 'row-reverse', paddingHorizontal: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor:'#eee', marginBottom: 10, paddingBottom: 10}}>
        <Image source={Logo} style={{width:50,height:50}}/>
        <P style={{maxWidth: 140}}>سامانه بروزرسانی اطلاعات مدارس کل کشور</P>
      </View>
      {/* <DrawerItem
          style={{flexDirection: 'row-reverse', right: 0}}
          labelStyle={[Stl.font,{lineHeight:20}]}
          label="مشخصات مدارس"
          onPress={() => {AppAlert('info', 'به زودی...')}}
      /> */}
      <DrawerItem
          style={{flexDirection: 'row-reverse', right: 0}}
          labelStyle={[Stl.font,{lineHeight:20}]}
          label="تغییر مشخصات شخصی"
          onPress={() => {AppAlert('info', 'به زودی...')}}
      />
      <DrawerItem
          style={{flexDirection: 'row-reverse', right: 0}}
          labelStyle={[Stl.font,{lineHeight:20}]}
          label="بروزرسانی"
          onPress={() => {AppAlert('info', 'به زودی...')}}
      />
      <DrawerItem
          style={{flexDirection: 'row-reverse', right: 0}}
          labelStyle={[Stl.font,{lineHeight:20}]}
          label="راهنما"
          onPress={() => {AppAlert('info', 'به زودی...')}}
      />
      <DrawerItem
          style={{flexDirection: 'row-reverse', right: 0}}
          labelStyle={[Stl.font,{lineHeight:20}]}
          label="خروج"
          onPress={() => {
            Alert.alert(
              "خروج",
              "آیا از خروج از اپ مطمئن هستید؟",
              [
                {
                  text: "انصراف",
                  onPress: () => {},
                  style: "cancel"
                },
                { text: "بله", onPress: () => {
                  AsyncStorage.clear();
                  navigation.replace('Login')
                } }
              ],
              { cancelable: false }
            );
          }}
      />
    </DrawerContentScrollView>
  );
}
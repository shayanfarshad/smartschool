import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import {H4} from '../../components/typo'
import {getSchoolsList} from '../Home/_home_srv';
import introLogo from '../../assets/img/introLogo.png'
import Bg from '../../assets/img/bg.png';

function IntroScreen({navigation}) {
    const [state, setState] = useState(0)
    useEffect(() => {
        if(state !== 1){
            setTimeout(() => {
                setState(state + 0.25)
            }, 1000);
        }else{
            getSchoolsList().then(res=>{
                if(res.status === 200){
                    setTimeout(() => {
                        navigation.replace('DrawerScreen')
                    }, 2000);
                }else{
                    setTimeout(() => {
                        navigation.replace('Rules')
                    }, 2000);
                }
            }).catch(err=>{
                setTimeout(() => {
                    navigation.replace('Rules')
                }, 2000);
            })
            
        }
    }, [state]);
    return(
        <ImageBackground source={Bg} style={s.bgContainer} resizeMode="cover">
            <View style={s.container}>
                <View style={s.imgBg}>
                    <Image source={introLogo} resizeMode="contain" style={s.logo}/>
                </View>
                <H4 style={{color:'#fff'}}>درحال بارگذاری...</H4>
                <Progress.Bar progress={state} width={200} style={s.progress} borderRadius={0} unfilledColor={'rgba(0,53,128,0.23)'} color={'#003580'} borderWidth={0}/>
            </View>
        </ImageBackground>
    )
}

export default IntroScreen;


const s = StyleSheet.create({
    bgContainer:{
        width: '100%',
        height: '100%'
    },
    container:{
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center'
    },
    imgBg:{
        width:200,
        height:200,
        backgroundColor: 'rgba(255,255,255,0.7)',
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 20000,
        marginBottom: 40
    },
    logo:{

    },
    progress:{
        top: 40
    }
})
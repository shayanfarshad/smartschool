import React, { useState, useEffect } from 'react';
import { View, Text,BackHandler, SafeAreaView, ImageBackground, StyleSheet, Image, TouchableOpacity as TO, Keyboard, TouchableWithoutFeedback as TWF } from 'react-native';
import * as Stl from '../../components/styles';
import Bg from '../../assets/img/bg.png';
import {H4, SubLine, P} from '../../components/typo'
import CurvedBox from '../../components/curvedBox';
import InputBox,{InputRow} from '../../components/Inputs/InputBox';
import Btn,{BtnRow} from '../../components/Buttons';
import CountDown from 'react-native-countdown-component';
import { Icon } from 'react-native-elements'
import AppAlert from '../../utils';
import AsyncStorage from '@react-native-community/async-storage'
import {getCaptcha, authorize, login} from './_login_srv';
import DeviceInfo from 'react-native-device-info';
const uuid = DeviceInfo.getUniqueId();
function LoginScreen({navigation}) {
    const [mobile, setMobile] = useState('')
    const [securityCode, setSecurityCode] = useState('')
    const [captcha, setCaptcha] = useState(null);
    const [publicKey, setPublicKey] = useState(null);

    const [verifCode, setVerifCode] = useState('')
    const [codeSent, setCodeSent] = useState(false)
    const [reSendCode, setReSendCode] = useState(false)

    function regCode(){
        if(mobile === '' && securityCode !== ''){
            AppAlert('alert', 'لطفا شماره موبایل خود را وارد کنید')
        }else if(mobile !== '' && securityCode === ''){
            AppAlert('alert', 'لطفا کد امنیتی را وارد کنید')
        }else if(mobile === '' && securityCode === ''){
            AppAlert('alert', 'لطفا شماره موبایل خود و کد امنیتی را وارد کنید')
        }
        else{
            var data = new Object();
            data.mobile = mobile;
            data.captcha = securityCode;
            data.uuid = uuid;
            console.log('data',data)
            authorize(data).then(res=>{
                console.log('res',res)
                if(res.status === 200){
                    setCodeSent(true)
                    setReSendCode(false)
                }
            }).catch(err=>{
                AppAlert('err', err.response.data)
            })
            
        }
    }

    function ConfirmCode(){
        if(verifCode !== ''){
            var data = new Object();
            var code = parseInt(verifCode)
            data.mobile = mobile;
            data.code = code
            login(data).then(res=>{
                console.log(res)
                if(res.status === 200){
                    AsyncStorage.setItem('userToken', res.data)
                    navigation.replace('DrawerScreen')
                }
            }).catch(err=>{
                AppAlert('err', err.response.data)
            })
        }else{
            AppAlert('info', 'لطفا کد تایید را وارد کنید')
        }
    }

    const fetchCaptcha = ()=>{
        
        console.log('uuid',uuid)
        getCaptcha(uuid).then(res=>{
            if(res.status === 200){
                setCaptcha(res.data.image)
                setPublicKey(res.data.publicKey)
            }
        })
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // fetchCaptcha()
            const backAction = () => {
                return true;
            };
    
            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction 
            );
    
            return () => backHandler.remove();
        });
    
        return unsubscribe;
    }, [navigation]);
    
    useEffect(() => {
        if(captcha === null){
            fetchCaptcha()
        }
    }, [captcha]);

    return(
        <ImageBackground source={Bg} style={s.bgContainer} resizeMode="cover">
            <TWF onPress={Keyboard.dismiss}>
                <View style={s.container}>
                    <CurvedBox>
                        <H4>ورود به سامانه</H4>
                        <SubLine />
                        {
                            !codeSent ?
                            <>
                                <InputRow LeftIcon IconName="mobile" IconFamily="entypo" hint="شماره موبایل خود را وارد کنید">
                                    <InputBox 
                                        placeholder="شماره موبایل"
                                        value={mobile}
                                        keyboardType='phone-pad'
                                        onChangeText={(num)=>{setMobile(num)}}
                                    />
                                </InputRow>
                                <InputRow LeftIcon IconName="ios-key" IconFamily="ionicon" hint="کد تصویر زیر را وارد کنید">
                                    <InputBox 
                                        placeholder="کد امنیتی"
                                        value={securityCode}
                                        keyboardType='phone-pad'
                                        onChangeText={(code)=>{setSecurityCode(code)}}
                                    />
                                </InputRow>
                                {
                                    captcha !== null ? 
                                    <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                        <Image source={{uri: captcha}} style={{width: 100, height: 60, flex: 0.6}} resizeMode="contain" />
                                        <Icon
                                            name='reload1'
                                            type='antdesign'
                                            color='#517fa4'
                                            style={{flex: 0.4, paddingHorizontal: 20}}
                                            onPress={fetchCaptcha}
                                        />
                                    </View> : null
                                }
                                <BtnRow>
                                    <Btn title="دریافت کد" Primary TCenter onPress={()=>regCode()}/>
                                </BtnRow>
                            </> : null
                        }

                        {
                            codeSent ? 
                            <>
                                <InputRow LeftIcon IconName="mail" IconFamily="octicon" hint="کد تاییدیه ارسال شده به تلفن همراهتان را وارد کنید">
                                    <InputBox 
                                        placeholder="کد تاییدیه"
                                        value={verifCode}
                                        keyboardType='phone-pad'
                                        onChangeText={(num)=>{setVerifCode(num)}}
                                    />
                                </InputRow>
                                {
                                    !reSendCode ? <CountDown
                                        until={60}
                                        onFinish={() => setTimeout(() => {
                                            setReSendCode(true)
                                        }, 500)}
                                        size={20}
                                        digitStyle={{backgroundColor: 'rgba(0,0,0,0)'}}
                                        digitTxtStyle={{fontWeight: 'normal', textAlign: 'center', fontFamily: Stl.font.fontFamily, color: Stl.Primary.color}}
                                        timeToShow={['M', 'S']}
                                        timeLabels={{m: null, s: null}}
                                        separatorStyle={{color: '#000', top: -2}}
                                        showSeparator
                                    /> : 
                                    <BtnRow>
                                        <Btn title="ارسال مجدد کد تایید" Gray Light TCenter onPress={()=>regCode()}/>
                                    </BtnRow>

                                }
                                
                                <BtnRow>
                                    <Btn title="تایید کد ورود" Primary TCenter onPress={()=>ConfirmCode()}/>
                                </BtnRow>
                            </>: null
                        }
                    </CurvedBox>
                </View>
            </TWF>
        </ImageBackground>
    )
}

export default LoginScreen;


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
})
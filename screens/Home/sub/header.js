import React,{useState,useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet, TouchableOpacity as TO, Image, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import HeaderBg from '../../../assets/img/topBg.jpg'
import LinearGradient from 'react-native-linear-gradient';
import Btn,{BtnRow} from '../../../components/Buttons';
import {H4, H5, SubLine} from '../../../components/typo'
import {Icon} from 'react-native-elements';
import { Button, Overlay } from 'react-native-elements';
import Avater from '../../../assets/img/avatar.jpg';
import InputBox,{InputRow} from '../../../components/Inputs/InputBox';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setSchoolModirData} from '../../School/redux/actions';

function Header({manager, setSchoolModirData}){
    const navigation = useNavigation();
    const [modirName, setModirName] = useState('');
    const [modirCode, setModirCode] = useState('');
    const [modirMobile, setModirMobile] = useState('');
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(!visible);
    };

    useEffect(() => {
        setModirName(manager.Name)
        setModirCode(manager.Melli)
        setModirMobile(manager.Mobile)
    }, [manager]);

    const editData = () =>{
        setSchoolModirData({
            Name: modirName,
            Melli: modirCode,
            Mobile: modirMobile,
        })
        setVisible(false)
    }

    return(
        <View style={s.container}>
            <Overlay isVisible={visible} onBackdropPress={toggleOverlay}
                overlayStyle={{
                    borderRadius: 10,
                    width: 270,
                    maxHeight: 500
                }}
            >
              <>
                <H5>اصلاح اطلاعات مدیر</H5>
                <SubLine/>
                <InputRow label="نام و نام خانوادگی">
                    <InputBox 
                        placeholder="نام و نام خانوادگی خود را وارد کنید"
                        value={modirName}
                        onChangeText={(name)=>{setModirName(name)}}
                    />
                </InputRow>
                <InputRow label="شماره موبایل">
                    <InputBox 
                        placeholder="شماره موبایل خود را وارد کنید"
                        value={modirMobile}
                        editable={false}
                        onChangeText={(mobile)=>{setModirMobile(mobile)}}
                    />
                </InputRow>
                 <InputRow label="کد ملی">
                    <InputBox 
                        placeholder="کد ملی خود را وارد کنید"
                        value={modirCode}
                        onChangeText={(code)=>{setModirCode(code)}}
                    />
                </InputRow>
                <BtnRow>
                    <Btn title="تصحیح" Green Light TCenter onPress={editData}/>
                </BtnRow>
              </>
            </Overlay>
            <ImageBackground style={s.imgBack} source={HeaderBg} resizeMode="cover">
                <LinearGradient colors={['rgba(0,35,117,0.3)', 'rgba(0,8,10,0.75)']} style={{flex:1}}>
                    <View style={s.Menu}>
                        <TO style={{flex:0.2}} onPress={()=>{
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
                        }}>
                            <Icon
                                name='log-out'
                                type='feather'
                                color='#fff'
                                size={25}
                                style={s.tshadow}
                            />
                        </TO>
                        <View style={{flex:0.6}}><H4 style={[{textAlign: 'center', color: '#fff'}, s.tshadow]}>سامانه اطلاعات مدارس</H4></View>
                        <TO style={{flex:0.2}} onPress={()=>navigation.openDrawer()}>
                            <Icon
                                name='menu'
                                type='feather'
                                color='#fff'
                                size={25}
                                style={s.tshadow}
                            />
                        </TO>
                    </View>
                    <View style={s.infoBox}>
                        <TO style={s.logoBox}>
                            <Image source={Avater} style={s.userImg} resizeMode="contain" />
                        </TO>
                        <H5 style={s.userTitle}>
                            {manager !== null ? manager.Name : ''}
                        </H5>
                    </View>
                </LinearGradient>
            </ImageBackground>
            <BtnRow 
                CustomStyle={{
                    position: 'absolute',
                    bottom: 0,
                    alignSelf: 'center'
                }}
            >
                <Btn Primary title="تغییر مشخصات" TCenter TThird   onPress={()=>{setVisible(true)}} />
            </BtnRow>
        </View>
    )
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        setSchoolModirData
      },
      dispatch,
    );
  };

  const mapStateToProps = state => {
    return {
        manager: state.schoolHandle.schoolModirData
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(Header);

const s = StyleSheet.create({
    container:{
        height: 280,
    },
    imgBack:{
        height: 260,
        overflow: 'hidden',
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    Menu:{
        flexDirection: 'row',
        marginTop: 10
    },
    tshadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.55,
        shadowRadius: 3.84,

        elevation: 5,
    },
    infoBox:{
        justifyContent: 'center',
        flex: 1
    },
    logoBox:{
        backgroundColor: '#fff',
        width: 120,
        height: 120,
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius:100,
        alignItems: 'center'
    },
    userImg:{
        width: 100,
        height: 100,
        borderRadius:100,

    },
    userTitle:{
        color: '#fff',
        textAlign: 'center',
        marginVertical: 20
    }
})
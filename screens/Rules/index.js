import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, ImageBackground, StyleSheet, Image } from 'react-native';
import * as Stl from '../../components/styles'
import {H3, P} from '../../components/typo'
import Bg from '../../assets/img/bg.png';
import CurvedBox from '../../components/curvedBox';
import {CheckBox} from 'react-native-elements';
import Btn,{BtnRow} from '../../components/Buttons';

function RulesScreen({navigation}) {
    const [state, setState] = useState(false)
    function navigate(){
        if(state){
            navigation.navigate('Login')
        }
    }
    return(
        <ImageBackground source={Bg} style={s.bgContainer} resizeMode="cover">
            <View style={s.container}>
               <CurvedBox>
                    <H3 style={{textAlign: 'center'}}>
                        قوانین و مقررات
                    </H3>
                    <P style={{marginTop: 10, lineHeight: 25, color: 'gray'}}>
                    در راستای اجرای مفاد ماده 69 برنامه پنج ساله ششم توسعه اقتصادی، اجتماعی و فرهنگی جمهوری اسلامی ایران، وزارت ارتباطات و فناوری اطلاعات با همکاری وزارت آموزش و پرورش در نظر دارد اطلاعات مدارس کشور را جهت ایجاد دسترسی به شبکه ملی اطلاعات و هوشمندسازی مدارس
                                به روزرسانی و تکمیل نمایند. لذا ضمن تشکر از همکاری شما درخصوص تکمیل، اصلاح و به روزرسانی اطلاعات مندرج در فرم های پیش رو، خواهشمند است در تکمیل فرم های اطلاعاتی دقت لازم را مبذول نمائید.
                    </P>
                    <CheckBox
                        iconRight
                        title='قوانین و مقررات را مطالعه نموده و میپذیرم'
                        checked={state}
                        textStyle={[{color: 'green'},Stl.font]}
                        containerStyle={{backgroundColor: 'rgba(255,255,255,0)', borderWidth: 0}}
                        onPress={()=>setState(!state)}
                        fontFamily={'IRANSansWeb(FaNum)'}
                    />
                    <BtnRow>
                        <Btn title="دریافت کد" Primary={state} Secondary={!state} TCenter onPress={()=>navigate()}/>
                    </BtnRow>
               </CurvedBox>
            </View>
        </ImageBackground>
    )
}

export default RulesScreen;


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
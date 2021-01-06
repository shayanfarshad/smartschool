import React, { useState, useEffect } from 'react';
import {View, StyleSheet, ScrollView, KeyboardAvoidingView} from 'react-native';
import MapBox from '../../components/mapBox';
import {P, H4, SubLine, Label} from '../../components/typo';
import Btn,{BtnRow} from '../../components/Buttons';
import SelectBox from '../../components/Inputs/selectBox';
import InputBox,{InputRow} from '../../components/Inputs/InputBox';
import {getOstan, getShahrestan, getBakhsh, getDehestan, getAbadi, getAllCity} from './_srv_school';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setSchoolLocationData} from './redux/actions';
import AppAlert from '../../utils';

function EditLocation({navigation, route, schoolData, setSchoolLocationData}){
    const [isfirstrender, setfirstRender] = useState(true)
    const [ostans,setOstans] = useState(null);
    const [sharestans,setSharestans] = useState(null);
    const [bakhshs,setBakhshs] = useState(null);
    const [dehestans,setDehestans] = useState(null);
    const [roostas,setRoostas] = useState(null);
    const [cities,setCities] = useState(null);

    const [selectedOstan,setSelectedOstan] = useState(null);
    const [selectedSharestan,setSelectedSharestan] = useState(null);
    const [selectedBakhsh,setSelectedBakhsh] = useState(null);
    const [selectedDehestan,setSelectedDehestan] = useState(null);
    const [selectedRoosta,setSelectedRoosta] = useState(null);
    const [selectedCity,setSelectedCity] = useState(null);

    const [abadiCode, setAbadiCode] = useState(null)
    const [address, setAddress] = useState(null) 

    function calcLevel(amarcode, level){
      var length = 23
      switch (level) {
        case 1:
          length = 6
          break;
        case 2:
          length = 8
          break;
        case 3:
          length = 10
          break;
        case 4:
          length = 14
          break;
        case 5:
          length = 23
          break;
        default:
          length = 23
          break;
      }
      return amarcode.substring(0, length) // ostan
    }

    const fetchOstan = (amarcode) =>{
      console.log('fetch ostan')
      setSelectedOstan(null)
      setSelectedSharestan(null)
      setSelectedBakhsh(null)
      setSelectedDehestan(null)
      setSelectedRoosta(null)
      getOstan().then(res=>{
        console.log('ostan',res)
        setOstans(res.data.results)
        var item = null;
        if(amarcode !== null){
          item = res.data.results.filter(i=>i.id === calcLevel(amarcode, 1))[0]
        }
        setSelectedOstan(item)
        if(isfirstrender){
          fetchShahrestan(amarcode)
        }else{
          fetchShahrestan(item !== null ? item.id : null)
        }
      }).catch(err=>{
        // console.log(err.response, 'ostan err')
      })
    }
    const fetchShahrestan = (amarcode) =>{
      console.log('shahrestan')
      setSelectedSharestan(null)
      setSelectedBakhsh(null)
      setSelectedDehestan(null)
      setSelectedRoosta(null)
      getShahrestan(calcLevel(amarcode, 1)).then(res=>{
        console.log('shahr',res)
        var item = null;
        if(amarcode !== null){
          item = res.data.results.filter(i=>i.id === calcLevel(amarcode, 2))[0]
        }
        setSelectedSharestan(item)
        setSharestans(res.data.results)
        if(isfirstrender){
          fetchBakhsh(amarcode)
        }
      }).catch(err=>{
        // console.log(err.response, 'getShahrestan err')
      })
    }
    const fetchBakhsh = (amarcode) =>{
      setSelectedBakhsh(null)
      setSelectedDehestan(null)
      setSelectedRoosta(null)
      getBakhsh(calcLevel(amarcode, 2)).then(res=>{
        // console.log(res, 'getBakhsh')
        setBakhshs(res.data.results)
        if(isfirstrender){
          var item = null;
          if(amarcode !== null){
            item = res.data.results.filter(i=>i.id === calcLevel(amarcode, 3))[0]
          }
          setSelectedBakhsh(item)
         
          if(schoolData.isCity){
            fetchAllCities(amarcode)
          }else{
            fetchDehestan(amarcode)
          }
        }
      }).catch(err=>{
        console.log(err.response, 'getBakhsh err')
      })
    }

    const fetchAllCities = amarcode =>{
      setSelectedCity(null)
      console.log(amarcode, 'city error')
      getAllCity(amarcode).then(res=>{
        console.log(res, 'city results')
        setCities(res.data.results)
        if(isfirstrender){
          var item = null;
          if(amarcode !== null){
            item = res.data.results.filter(i=>i.id === calcLevel(amarcode, 4))[0]
          }
          setSelectedCity(item)
        }
      }).catch(err=>{
        console.log(err, 'city error')
        console.log(err.reponse, 'city error')
      })
    }

    const fetchDehestan = (amarcode) =>{
      setSelectedDehestan(null)
      setSelectedRoosta(null)
      getDehestan(calcLevel(amarcode, 3)).then(res=>{
        // console.log(res, 'getDehestan')
        setDehestans(res.data.results)
        if(isfirstrender){
          var item = null;
          if(amarcode !== null){
            item = res.data.results.filter(i=>i.id === calcLevel(amarcode, 4))[0]
          }
          setSelectedDehestan(item)
          fetchAbadi(amarcode)
        }
      }).catch(err=>{
        console.log(err.response, 'getDehestan err')
      })
    }
    const fetchAbadi = (amarcode) =>{
      setSelectedRoosta(null)
      getAbadi(calcLevel(amarcode, 4)).then(res=>{
        // console.log(res, 'getAbadi')
        setRoostas(res.data.results)
        if(isfirstrender){
          var item = null;
          if(amarcode !== null){
            item = res.data.results.filter(i=>i.id === calcLevel(amarcode, 5))[0]
          }
          setSelectedRoosta(item)
          setfirstRender(false)
        }
      }).catch(err=>{
        console.log(err.response, 'getAbadi err')
      })
    }

    // useEffect(() => {
    //   if(ostans === null){
    //     // fetchOstan('13982319020002020260530')
    //     fetchOstan(schoolData.AmarCode)
    //     setAddress(schoolData.Address);
    //     setAbadiCode(schoolData.AmarCode.toString());
    //   }
    // }, [ostans]);
    useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        // console.log('data',schoolData.AmarCode)
        fetchOstan(schoolData.AmarCode)
        setAddress(schoolData.Address);
        setAbadiCode(schoolData.AmarCode !== null ? schoolData.AmarCode.toString() : schoolData.AmarCode);
      });
  
  return unsubscribe;
  }, [navigation]);

    function submitLocData(){
      console.log('shahrestan',selectedSharestan)
      if(schoolData.isCity){
        if(selectedCity !== null && selectedCity !== undefined){
          setSchoolLocationData({
            AmarCode: abadiCode,
            AreaCode: abadiCode,
            Address: address,
            ostan: selectedOstan,
            shahrestan : selectedSharestan,
            dehestan : selectedCity,
            bakhsh: selectedBakhsh,
            abadi : selectedCity
          })
          navigation.navigate('SchoolDedicateData')
        }else{
          AppAlert('info', 'لطفا تمامی فیلدهای آدرس را پر کنید')
        }
      }else{
        if(selectedRoosta !== null){
          setSchoolLocationData({
            AmarCode: abadiCode,
            AreaCode: abadiCode,
            Address: address
          })
          navigation.navigate('SchoolDedicateData')
        }else{
          AppAlert('info', 'لطفا تمامی فیلدهای آدرس را پر کنید')
        }
      }
      
      // 
    }
    return(
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <ScrollView style={{flex: 1}}>
            <View style={{paddingHorizontal: 15, paddingVertical: 10, paddingBottom: 20}}>
                <H4>اطلاعات مکانی مدرسه</H4>
                <SubLine />
                <P style={{marginBottom: 20}}>خواهشمند است پس از مشخص کردن موقعیت مدرسه بر روی نقشه، در صورت مشاهده عدم انطباق هر یک از قسمت ها گزینه صحیح را انتخاب نمایید.</P>
                <SelectBox
                  current={selectedOstan}
                  setCurrent={setSelectedOstan}
                  items={ostans}
                  title="استان"
                  style={{marginBottom: 14}}
                  NameSelector="text"
                  pressCallBack={(e)=>fetchShahrestan(e.id)}
                />
                <SelectBox
                  current={selectedSharestan}
                  setCurrent={setSelectedSharestan}
                  items={sharestans}
                  title="شهرستان"
                  style={{marginBottom: 14}}
                  NameSelector="text"
                  pressCallBack={(e)=>fetchBakhsh(e.id)}
                />
                <SelectBox
                  current={selectedBakhsh}
                  setCurrent={setSelectedBakhsh}
                  items={bakhshs}
                  title="بخش"
                  style={{marginBottom: 14}}
                  NameSelector="text"
                  pressCallBack={(e)=>{
                    if(schoolData.isCity){
                      fetchAllCities(e.id)
                    }else{
                      fetchDehestan(e.id)
                    }
                  }}
                />
                {
                  schoolData.isCity ? 
                  <SelectBox
                    current={selectedCity}
                    setCurrent={setSelectedCity}
                    items={cities}
                    title="شهر"
                    style={{marginBottom: 14}}
                    NameSelector="text"
                    pressCallBack={(e)=>{setAbadiCode(e.id.toString())}}
                  /> :
                  <>
                    <SelectBox
                      current={selectedDehestan}
                      setCurrent={setSelectedDehestan}
                      items={dehestans}
                      title="دهستان"
                      style={{marginBottom: 14}}
                      NameSelector="text"
                      pressCallBack={(e)=>fetchAbadi(e.id)}
                    />
                    <SelectBox
                      current={selectedRoosta}
                      setCurrent={setSelectedRoosta}
                      items={roostas}
                      title="روستا"
                      style={{marginBottom: 14}}
                      NameSelector="text"
                      pressCallBack={(e)=>{setAbadiCode(e.id.toString())}}
                    />
                  </>
                }
                
                <InputRow hint="کدآبادی محل مدرسه را وارد نمایید">
                    <InputBox 
                        placeholder="کد آبادی"
                        value={abadiCode}
                        editable={false}
                        onChangeText={(code)=>{setAbadiCode(code)}}
                    />
                </InputRow>
                <InputRow hint="نشانی محل مدرسه را وارد نمایید">
                    <InputBox 
                        placeholder="نشانی"
                        value={address}
                        onChangeText={(addr)=>{setAddress(addr)}}
                    />
                </InputRow>
                <BtnRow>
                    <Btn title="تایید و ادامه" Green Light TCenter onPress={submitLocData}/>
                </BtnRow>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    )
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setSchoolLocationData
    },
    dispatch,
  );
};
const mapStateToProps = state => {
  return {
      schoolData: state.schoolHandle.schoolData
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditLocation);

const s = StyleSheet.create({

})
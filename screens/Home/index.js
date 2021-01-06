import React, { useState , useEffect} from 'react';
import { View, Text, SafeAreaView, ScrollView, Dimensions, BackHandler} from 'react-native';
import Header from './sub/header';
import SchoolList from './sub/headList';
const wh = Dimensions.get('window').height;
import AppAlert from '../../utils';

import {getSchoolsList} from './_home_srv';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {setSchoolMainData, setSchoolModirData} from '../School/redux/actions';

const HomeScreen = ({navigation, setSchoolMainData, schoolMainData, setSchoolModirData}) =>{
    const fetchSchool = () =>{
        getSchoolsList().then(res=>{
            if(res.status === 200){
                console.log(res.data)
                setSchoolMainData(res.data)
                setSchoolModirData({
                    Name: res.data[0].ManagerName,
                    Melli: res.data[0].ManagerNationalCode,
                    Mobile: res.data[0].ManagerMobile,
                })
            }
        }).catch(err=>{
            AppAlert('err', err.response.data)
        })
    }


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            fetchSchool()
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
          
      }, []);
    
    return(
        <SafeAreaView>
            <Header />
            <ScrollView style={{height: wh - 300}}>
                <View style={{paddingHorizontal: 20, marginBottom: 40}}>
                    <SchoolList list={schoolMainData}/>
                </View>
           </ScrollView>
        </SafeAreaView>
    )
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
      {
        setSchoolMainData,
        setSchoolModirData
      },
      dispatch,
    );
  };

  const mapStateToProps = state => {
    return {
        schoolMainData: state.schoolHandle.schoolMainData
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

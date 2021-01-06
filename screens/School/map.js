import React, { useState, useEffect } from 'react';
import { View, StyleSheet, BackHandler } from 'react-native';
import MapBox from '../../components/mapBox';
import { P } from '../../components/typo';
import Btn, { BtnRow } from '../../components/Buttons';
import { getSchoolData } from './_srv_school';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSchoolData, setSchoolCoords } from './redux/actions';
import { Spinner } from 'native-base';


function SchoolOnMap({ navigation, route, setSchoolData, setSchoolCoords, schoolCoords, schoolData }) {
    function submitLoc() {
        if (schoolCoords !== null) {
            navigation.navigate('EditSchoolLocation')
        }
    }
    const fetchSchoolData = async() => {
        console.log('called')
        getSchoolData(route.params.mainCode,route.params.data).then(res => {
            if (res.status === 200) {
                console.log(res.data, 'response')
                setSchoolData(res.data[0])
                // console.log(res.data)
                if (res.data.length > 0) {
                    if (res.data[0].Lng !== null && res.data[0].Lat !== null)
                        setSchoolCoords([res.data[0].Lng, res.data[0].Lat])
                }
            }
        }).catch(err => {
            console.log(err.response)
        })
    }

    // useEffect(() => {
    //     if(schoolData === null){
    //         fetchSchoolData()
    //     }
    // }, [schoolData]);
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {

            fetchSchoolData()
            const backAction = () => { navigation.goBack(); return true };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={{ flex: 1 }}>
            {schoolCoords == null ? (<Spinner color='black' />) :
                (
                    <View style={{ flex: 1 }}>

                        <View style={s.overTitle}>
                            <P>موقعیت مدرسه را روی نقشه نمایش انتخاب کنید</P>
                        </View>
                        <View style={s.nextLevelBtn}>
                            <BtnRow>
                                <Btn title="تایید موقعیت و ادامه" Gray Green={schoolCoords !== null ? true : false} Light TCenter onPress={() => submitLoc()} />
                            </BtnRow>
                        </View>
                        <MapBox
                            zoom={schoolData !== null ? schoolCoords !== null ? 14 : 4 : 4}
                            getCoords={(e) => setSchoolCoords(e.geometry.coordinates)}
                            selectedCoords={schoolCoords}
                            initialCenterCoordinate={schoolCoords}
                        >
                        </MapBox>
                    </View>)}
        </View>
    )
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setSchoolData,
            setSchoolCoords
        },
        dispatch,
    );
};
const mapStateToProps = state => {
    return {
        schoolData: state.schoolHandle.schoolData,
        schoolCoords: state.schoolHandle.schoolCoords
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SchoolOnMap);

const s = StyleSheet.create({
    overTitle: {
        position: 'absolute',
        zIndex: 1,
        top: '2%',
        backgroundColor: 'rgba(255,255,255,0.7)',
        left: 20,
        right: 20,
        borderRadius: 10,
        padding: 10
    },
    nextLevelBtn: {
        left: 20,
        right: 20,
        position: 'absolute',
        zIndex: 1,
        bottom: '5%'
    }
})
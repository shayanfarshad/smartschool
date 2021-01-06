import React, { Component } from 'react';
import { PermissionsAndroid, View, Platform, Alert } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import CircleBtn from '../../../ui/Buttons/CirlceBtn';
import { resetZoom } from '../../index';
import { setUserLocIcoVis } from '../actions';
import {SetLoader} from '../../../ui/Loader/actions';

class FindMyLocation extends Component {
    constructor(props) {
        super(props);
    }

    async requestLocationPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'بررسی موقعیت مکانی شما',
                    message:
                        'برای دریافت اطلاعات مکان فعلی شما نیازمند اجازه دسترسی تان هستیم ',
                    buttonNeutral: 'بعدا',
                    buttonNegative: 'اجازه نمی دهم',
                    buttonPositive: 'بسیار خب',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                // console.log('You can use the Location Now');
                Geolocation.getCurrentPosition(
                    (position) => {
                        resetZoom([position.coords.longitude, position.coords.latitude], 16)
                        setUserLocIcoVis(true)
                        SetLoader(false)
                    },
                    (error) => {
                        SetLoader(false)
                        // See error code charts below.
                        // console.log(error.code, error.message);
                        Alert.alert(
                            'مشکل در دریافت اطلاعات مکانی شما',
                            'قادر به دریافت اطلاعات مکانی شما نیسیتم. مجددا تلاش فرمایید',
                            [
                                { text: 'تایید', onPress: () => { } },
                            ]
                        );
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
                this.tracking()

            } else {
                SetLoader(false)
                // console.log('Camera permission denied');
                Alert.alert(
                    'مشکل در دریافت اطلاعات مکانی شما',
                    'اجازه دسترسی به موقعیت مکانی شما داده نشد',
                    [
                        { text: 'تایید', onPress: () => { } },
                    ]
                );
            }
        } catch (err) {
            console.warn(err);
            RNToasty.Error({
                title: 'اشکال در دریافت موقعیت مکانی شما، علمیات لغو شد. ',
                duration: 1
            });
        }
    }

    tracking() {
        Geolocation.watchPosition(
            position => {
                // console.log('watch',position.coords)
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
            })
    }

    findMe() {
        SetLoader(true)
        if (Platform.OS == 'ios') {
            Geolocation.getCurrentPosition(
                (position) => {
                    setTimeout(() => {
                        resetZoom([position.coords.longitude, position.coords.latitude], 16)
                        setUserLocIcoVis(true)
                        SetLoader(false)
                    }, 1000);
                },
                (error) => {
                    // See error code charts below.
                    // console.log(error.code, error.message);
                    // alert('erro')
                    SetLoader(false)
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
            this.tracking();
        } else {
            this.requestLocationPermission()
        }
    }

    render() {
        return (
            <CircleBtn
                press={() => this.findMe()}
                img={require('../img/loc.png')}
                bottom={20}
                right={20}
                left={'auto'}
                CirclSize={40}
                IcoSize={25}
            />

        )
    }
};

export default FindMyLocation;
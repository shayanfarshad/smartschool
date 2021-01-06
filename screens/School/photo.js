import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { H4, SubLine, Label, P } from '../../components/typo';
import InputBox, { InputRow } from '../../components/Inputs/InputBox';
import Btn, { BtnRow } from '../../components/Buttons';
import ImageSlider from './comp/imageSlider'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveForm } from './_srv_school';
import AppAlert from '../../utils';
import { setSchoolMainData, setSchoolData, setSchoolCoords, setSchoolLocationData, setSchoolDescData, setSchoolImages } from './redux/actions';

function SchoolPhotos({ navigation, school, setSchoolMainData, setSchoolData, setSchoolCoords, setSchoolLocationData, setSchoolDescData, setSchoolImages }) {


    const [schoolDesc, setSchoolDesc] = useState('')
    const [uploader, setUploader] = useState(false)
    const submitData = () => {
        function handlePhotos(e, e2) {
            if (e === null) {
                return e2
            } else if (e === 'del') {
                return null
            } else {
                return 'data:image/jpeg;base64,' + e
            }
        }
        console.log('simage', school.schoolImages)
        console.log('dimage', school.schoolData)
        if ((school.schoolImages.first || school.schoolImages.second || school.schoolImages.third) === 'del') {
            console.log('umadim tu')
            console.log('eerror avvali')
            AppAlert('alert', 'حداقل یک عکس برای ذخیره کردن بارگذاری کنید', 3000)
        }
        else {
            if (school.schoolImages.first == null && school.schoolImages.second == null && school.schoolImages.third == null && school.schoolData.Image1 == null && school.schoolData.Image2 == null && school.schoolData.Image3 == null) {
                // alert('حداقل یک عکس برای ذخیره کردن بارگذاری کنید')
                console.log('null budan hame')
                AppAlert('alert', 'حداقل یک عکس برای ذخیره کردن بارگذاری کنید', 3000)
            } else {
                setUploader(true)
                var fd = new FormData();
                fd.append('MainCode', school.schoolData.MainCode);
                fd.append('ManagerMobile', parseInt(school.schoolModirData.Mobile));
                fd.append('ManagerName', school.schoolModirData.Name);
                fd.append('ManagerNationalCode',school.schoolModirData.Melli.toString());
                fd.append('Lng', school.schoolCoords[0]);
                fd.append('Lat', school.schoolCoords[1]);
                fd.append('AmarCode', school.schoolLocation.AmarCode);
                fd.append('AreaCode', parseInt(school.schoolDesc.AreaCode));
                fd.append('Address', school.schoolLocation.Address);
                fd.append('OstanName', school.schoolLocation.ostan.text);
                fd.append('ShahrestanName', school.schoolLocation.shahrestan.text);
                fd.append('BakhshName', school.schoolLocation.bakhsh.text);
                fd.append('DehestanName', school.schoolLocation.dehestan.text);
                fd.append('AbadiName', school.schoolLocation.abadi.text);
                fd.append('AreaName', school.schoolDesc.AreaName);
                fd.append('SchoolCode', parseInt(school.schoolDesc.SchoolCode));
                fd.append('Name', school.schoolDesc.Name);
                fd.append('SubSet', school.schoolDesc.SubSet);
                fd.append('Gender', school.schoolDesc.Gender.Name);
                fd.append('StudyTime', school.schoolDesc.StudyTime);
                fd.append('Period', school.schoolDesc.Period);
                fd.append('TeacherCount', parseInt(school.schoolDesc.TeacherCount));
                fd.append('StudentCount', parseInt(school.schoolDesc.StudentCount));
                fd.append('Tell1', school.schoolDesc.Tell1);
                fd.append('Tell2', school.schoolDesc.Tell2);
                fd.append('Tell3', school.schoolDesc.Tell3);
                fd.append('PostalCode', school.schoolDesc.PostalCode);
                fd.append('MobileInternet', school.schoolDesc.MobileInternet.Name);
                fd.append('Adsl', school.schoolDesc.Adsl.Name);
                fd.append('Comment', schoolDesc);
                fd.append('BasicCount', school.schoolDesc.BasicCount);
                fd.append('Images', handlePhotos(school.schoolImages.first,school.schoolData.Image1));
                fd.append('Images', handlePhotos(school.schoolImages.second, school.schoolData.Image2));
                fd.append('Images', handlePhotos(school.schoolImages.third, school.schoolData.Image3));
                console.log('form:', fd)

                saveForm(fd).then(res => {
                    if (res.status === 200) {
                        AppAlert('ok', 'اطلاعات با موفقیت بارگذاری شد')
                        setSchoolImages({
                            first: null,
                            second: null,
                            third: null
                        })
                        setUploader(false)
                        setTimeout(() => {
                            navigation.navigate('Login')
                        }, 1000)
                    }
                }).catch(err => {
                    console.log(err.response)
                    setUploader(false)
                    AppAlert('err', err.response.data)
                })
            }
        }


    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSchoolDesc(school.schoolData !== null ? school.schoolData.Comment : '')
            console.log('school state',school.schoolImages)
            console.log('school data',school.schoolData)
        });

        return unsubscribe;
    }, [navigation]);

    function renderActivity() {
        if (uploader) {
            return (
                <View style={s.uploadContainer}>
                    <ActivityIndicator size="large" color="#0000ff" />
                    <Label>درحال بارگذاری اطلاعات...</Label>
                </View>
            )
        } else {
            return null
        }
    }
    return (
        <ScrollView style={{ flex: 1 }}>
            {renderActivity()}
            <View style={{ paddingHorizontal: 15, paddingVertical: 10, paddingBottom: 20 }}>
                <H4>بارگذاری تصاویر مدرسه</H4>
                <SubLine />
                <P>خواهشمند است تصاویری واضح از مدرسه را بارگذاری نمایید</P>
                <ImageSlider />
                <View style={{ marginTop: 10 }}>
                    <P>توضیحات:</P>
                    <InputRow>
                        <InputBox
                            placeholder="توضیحاتی در مورد مدرسه شما"
                            value={schoolDesc}
                            onChangeText={(txt) => setSchoolDesc(txt)}
                            style={{ height: 200 }}
                            multiline={true}
                        />
                    </InputRow>
                </View>
                <BtnRow>
                    <Btn title="تایید و ذخیره" Green Light TCenter onPress={submitData} />
                </BtnRow>
            </View>
        </ScrollView>
    )
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setSchoolMainData, setSchoolData, setSchoolCoords, setSchoolLocationData, setSchoolDescData, setSchoolImages
        },
        dispatch,
    );
};
const mapStateToProps = state => {
    return {
        school: state.schoolHandle,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SchoolPhotos);


const s = StyleSheet.create({
    uploadContainer: {
        backgroundColor: '#fff',
        maxWidth: 300,
        position: 'absolute',
        left: '32%',
        top: '45%',
        zIndex: 123123,
        borderRadius: 5,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    }
})
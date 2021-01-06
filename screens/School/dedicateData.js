import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import MapBox from '../../components/mapBox';
import { P, H4, SubLine, Label } from '../../components/typo';
import Btn, { BtnRow } from '../../components/Buttons';
import SelectBox from '../../components/Inputs/selectBox';
import Radio from '../../components/Inputs/Radio';
import Counter from '../../components/Inputs/counter';
import InputBox, { InputRow } from '../../components/Inputs/InputBox';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setSchoolDescData } from './redux/actions';
import AppAlert from '../../utils';
import MultiTag from '../../components/Inputs/multiTags';


function DedicateData({ navigation, schoolData, setSchoolDescData }) {

    const [schoolCode, setSchoolCode] = useState('')
    const [schoolName, setSchoolName] = useState('')
    const [selectedType, setSelectedType] = useState([])
    const [schoolType] = useState([
        'دولتی',
        'غیر دولتی',
        'مشارکت مردمی',
        'تیزهوشان',
        'شاهد',
        'فرهنگیان'
    ])
    const [schoolTime] = useState([
        'صبح',
        'عصر',
        'شبانه',
    ])
    const [gender, setGender] = useState('')
    const [genderList] = useState([
        { Name: 'دخترانه' },
        { Name: 'پسرانه' },
        { Name: 'مختلط' }
    ])
    const [nobat, setNobat] = useState('')
    const [dore, setDore] = useState('')
    const [tedadPaye, setTedadPaye] = useState('')
    const [tedadDabir, setTedadDabir] = useState('')
    const [tedadStd, setTedadStd] = useState('')
    const [tel1, setTel1] = useState('')
    const [tel2, setTel2] = useState('')
    const [tel3, setTel3] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [areaCode, setAreaCode] = useState('')
    const [areaName, setAreaName] = useState('')
    const [sabetOpt, setSabetOpt] = useState('')
    const [selectedSabetOpt] = useState([
        { Name: 'ندارد' },
        { Name: 'شاتل' },
        { Name: 'پارس آنلاین' },
        { Name: 'های وب' },
        { Name: 'مبین آسیاتک' },
        { Name: 'صبانت' },
        { Name: 'لایزر' },
        { Name: 'رهام داتک' },
        { Name: 'مخابرات' },
        { Name: 'حلما گستر' },
        { Name: 'فن آوا' },
        { Name: 'پیشگامان' },
        { Name: 'سایر' }
    ]);
    const [hamrahOpt, setHamrahOpt] = useState('')
    const [selectedHamrahOpt] = useState([
        { Name: 'ندارد' },
        { Name: 'همراه اول' },
        { Name: 'ایرانسل' },
        { Name: 'رایتل' },
        { Name: 'مبین نت' },
        { Name: 'شاتل' },
        { Name: 'سایر' }
    ])

    const tele1 = useRef(null)
    const tele2 = useRef(null)

    function submitDescData() {
        console.log('selected',selectedType)
        setSchoolDescData({
            SchoolCode: schoolCode,
            Name: schoolName,
            SubSet: selectedType.join(','),
            Gender: gender,
            StudyTime: nobat.join(','),
            Period: dore,
            BasicCount: tedadPaye,
            TeacherCount: tedadDabir,
            StudentCount: tedadStd,
            Tell1: tel1,
            Tell2: tel2,
            Tell3: tel3,
            PostalCode: postalCode,
            AreaCode: areaCode,
            AreaName: areaName,
            Adsl: sabetOpt,
            MobileInternet: hamrahOpt
        })
        console.log(selectedType.join(','))
        navigation.navigate('SchoolPhotos')
    }


    // if(isFocused){
    //     setSchoolCode(schoolData.SchoolCode.toString())
    //     setSchoolName(schoolData.Name)
    //     setSelectedType({Name: schoolData.SubSet})
    //     setGender({Name: schoolData.Gender})
    //     setNobat(schoolData.StudyTime)
    //     setDore(schoolData.Period)
    //     setTedadPaye(schoolData.BasicCount.toString())
    //     setTedadDabir(schoolData.TeacherCount.toString())
    //     setTedadStd(schoolData.StudentCount.toString())
    //     setTel1(schoolData.Tell1)
    //     setTel2(schoolData.Tell2)
    //     setTel3(schoolData.Tell3)
    //     setPostalCode(schoolData.PostalCode)
    //     setAreaCode(schoolData.AreaCode.toString())
    //     setAreaName(schoolData.AreaName)
    //     setSabetOpt({Name: schoolData.Adsl})
    //     setHamrahOpt({Name: schoolData.MobileInternet})
    // }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            var selectedLength = (schoolData.SubSet).length
            var timeLength = (schoolData.StudyTime).length
            setSchoolCode(schoolData.SchoolCode !== null ? schoolData.SchoolCode.toString() : schoolData.SchoolCode)
            setSchoolName(schoolData.Name)
            setSelectedType((schoolData.SubSet).split(',',selectedLength))
            setGender({ Name: schoolData.Gender })
            setNobat((schoolData.StudyTime).split(',',timeLength))
            setDore(schoolData.Period)
            setTedadPaye(schoolData.BasicCount !== null ? schoolData.BasicCount.toString() : schoolData.BasicCount)
            setTedadDabir(schoolData.TeacherCount !== null ? schoolData.TeacherCount.toString() : schoolData.TeacherCount)
            setTedadStd(schoolData.StudentCount !== null ? schoolData.StudentCount.toString() : schoolData.StudentCount)
            setTel1(schoolData.Tell1)
            setTel2(schoolData.Tell2)
            setTel3(schoolData.Tell3)
            setPostalCode(schoolData.PostalCode)
            setAreaCode(schoolData.AreaCode !== null ? schoolData.AreaCode.toString() : schoolData.AreaCode)
            setAreaName(schoolData.AreaName)
            setSabetOpt({ Name: schoolData.Adsl })
            setHamrahOpt({ Name: schoolData.MobileInternet })
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ paddingHorizontal: 15, paddingVertical: 10, paddingBottom: 20 }}>
                <H4>اطلاعات اختصاصی مدرسه</H4>
                <SubLine />
                {/* <P style={{marginBottom: 20}}>خواهشمند است پس از مشخص کردن موقعیت مدرسه بر روی نقشه، در صورت مشاهده عدم انطباق هر یک از قسمت ها گزینه صحیح را انتخاب نمایید.</P> */}
                <InputRow label="کد مدرسه">
                    <InputBox
                        placeholder="کد مدرسه"
                        editable={false}
                        value={schoolCode}
                        onChangeText={(code) => { setSchoolCode(code) }}
                    />
                </InputRow>
                <InputRow label="نام مدرسه">
                    <InputBox
                        placeholder="نام مدرسه"
                        value={schoolName}
                        onChangeText={(name) => { setSchoolName(name) }}
                    />
                </InputRow>
                <MultiTag
                    current={selectedType}
                    setCurrent={setSelectedType}
                    items={schoolType}
                    title="نوع مدرسه"
                    style={{ marginBottom: 14 }}
                    NameSelector="Name"
                />
             
                <Radio
                    current={gender}
                    setCurrent={setGender}
                    items={genderList}
                    title="جنسیت"
                    style={{ marginBottom: 14 }}
                />
                 <MultiTag
                    current={nobat}
                    setCurrent={setNobat}
                    items={schoolTime}
                    title="نوبت تحصیلی"
                    style={{ marginBottom: 14 }}
                    NameSelector="Name"
                />
                {/* <InputRow label="نوبت تحصیلی">
                    <InputBox
                        placeholder="نوبت تحصیلی"
                        value={nobat}
                        onChangeText={(nobat) => { setNobat(nobat) }}

                    /> */}
                {/* </InputRow> */}
                <InputRow label="دوره تحصیلی">
                    <InputBox
                        placeholder="دوره تحصیلی"
                        value={dore}
                        onChangeText={(period) => { setDore(period) }}
                    />
                </InputRow>
                <Counter
                    title="تعداد پایه"
                    current={tedadPaye}
                    setCurrent={setTedadPaye}

                />
                <Counter
                    title="تعداد دبیران"
                    current={tedadDabir}
                    setCurrent={setTedadDabir}
                />
                <Counter
                    title="تعداد دانش آموزان"
                    current={tedadStd}
                    setCurrent={setTedadStd}
                />
                <InputRow label="تلفن">
                    <InputBox
                        placeholder="تلفن ۱"
                        value={tel1}
                        onChangeText={(num) => { setTel1(num) }}
                    />
                </InputRow>
                <InputRow >
                    <InputBox
                        placeholder="تلفن ۲"
                        value={tel2}
                        onChangeText={(num) => { setTel2(num) }}
                    />
                </InputRow>
                <InputRow>
                    <InputBox
                        placeholder="تلفن ۳"
                        value={tel3}
                        onChangeText={(num) => { setTel3(num) }}
                    />
                </InputRow>
                <InputRow label="کدپستی">
                    <InputBox
                        placeholder="کدپستی"
                        value={postalCode}
                        onChangeText={(code) => { setPostalCode(code) }}
                    />
                </InputRow>
                <InputRow label="کد منطقه">
                    <InputBox
                        placeholder="کد منطقه"
                        value={areaCode}
                        onChangeText={(code) => { setAreaCode(code) }}
                    />
                </InputRow>
                <InputRow label="نام منطقه">
                    <InputBox
                        placeholder="نام منطقه"
                        value={areaName}
                        onChangeText={(code) => { setAreaName(code) }}
                    />
                </InputRow>
                <SelectBox
                    current={hamrahOpt}
                    setCurrent={setHamrahOpt}
                    items={selectedHamrahOpt}
                    title="اینترنت همراه"
                    style={{ marginBottom: 14 }}
                    NameSelector={"Name"}
                />
                <SelectBox
                    current={sabetOpt}
                    setCurrent={setSabetOpt}
                    items={selectedSabetOpt}
                    title="اینترنت ثابت"
                    style={{ marginBottom: 14 }}
                    NameSelector={"Name"}
                />
                <BtnRow>
                    <Btn title="تایید و ادامه" Green Light TCenter onPress={submitDescData} />
                </BtnRow>
            </View>
        </ScrollView>
    )
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            setSchoolDescData
        },
        dispatch,
    );
};
const mapStateToProps = state => {
    return {
        schoolData: state.schoolHandle.schoolData,
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DedicateData);

const s = StyleSheet.create({

})
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity as TO, ImageBackground, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setSchoolImages } from '../../School/redux/actions'
import imgbg from '../../../assets/img/imgbg.png'
import * as S from '../../../components/Inputs/styles'
// import AsyncStorage from '@react-native-community/async-storage';
import { Icon } from 'react-native-elements'
const options = {
  title: 'انتخاب تصویر پروفایل',
  // customButtons: [{name: 'delImg', title: 'حذف تصویر'}],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

function ImageSlider({ schoolData, schoolImages }) {
  var car;
  const scrollToEnd = () => car.scrollToEnd({ animated: false });
  const [firstPhoto, setFirstPhoto] = useState({ uri: schoolData.Image1 !== null ? schoolData.Image1 : '' });
  const [secondPhoto, setSecondPhoto] = useState({ uri: schoolData.Image2 !== null ? schoolData.Image2 : '' });
  const [thirdPhoto, setThirdPhoto] = useState({ uri: schoolData.Image3 !== null ? schoolData.Image3 : '' });
  function picker(selector) {
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        if (response.customButton === 'delImg') {
          console.log(response)
        }
        // console.log('User tapped custom button: ', response.customButton);
      } else {
        // const source = {uri: response.uri};
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        var temp = schoolImages;
        switch (selector) {
          case 'first':
            temp.first = response.data
            setFirstPhoto({ uri: 'data:image/jpeg;base64,' + response.data })
            break;
          case 'second':
            temp.second = response.data
            setSecondPhoto({ uri: 'data:image/jpeg;base64,' + response.data })
            break;
          case 'third':
            temp.third = response.data
            setThirdPhoto({ uri: 'data:image/jpeg;base64,' + response.data })
            break;
          default:
            break;
        }
        console.log('tempsssss',temp)
        setSchoolImages(temp)
      }
    });
  }
  function removeBtn(selector) {
    Alert.alert(
      "پاک کردن",
      "آیااز پاک کردن عکس مطمئن هستید؟",
      [
        {
          text: "انصراف",
          onPress: () => { },
          style: "cancel"
        },
        {
          text: "بله", onPress: () => {
            remove(selector);
          }
        }
      ],
      { cancelable: false }
    )
  }

  function remove(selector) {
    var img = schoolImages;
    switch (selector) {
      case 'first':
       { img.first = 'del'
        setFirstPhoto({uri:null})}
        break;
      case 'second':
      {  img.second = 'del'
        setSecondPhoto({uri:null})}
        break;
      case 'third':
        {img.third = 'del'
        setThirdPhoto({uri:null})}
        break;
      default:
        break;
    }
    console.log('imggggg',img)
    setSchoolImages(img)
  }

 


  return (
    <ScrollView
      style={s.container}
      horizontal={true}
      ref={it => { car = it }}
      contentContainerStyle={s.contentContainerStyle}
      onContentSizeChange={scrollToEnd}
      showsHorizontalScrollIndicator={false}
    >
      <TO style={s.ImgContainer}
        onPress={() => picker('third')}>
        <ImageBackground source={imgbg} style={s.imgbg} resizeMode="center">
          <Image source={thirdPhoto} style={s.img} resizeMode="cover" />
          {thirdPhoto.uri === '' || thirdPhoto.uri == null? (<View></View>) : (<TO
            style={S.deleteBtn}
            hitSlop={{ right: 10, top: 10 }}
            onPress={() => removeBtn('third')}>
            <Icon name='times' type='font-awesome-5' />
          </TO>)}

        </ImageBackground>
      </TO>
      <TO style={s.ImgContainer} onPress={() => picker('second')}>
        <ImageBackground source={imgbg} style={s.imgbg} resizeMode="center">
          <Image source={secondPhoto} style={s.img} resizeMode="cover" />
          {secondPhoto.uri === '' || secondPhoto.uri == null ? (<View></View>) : (<TO
            style={S.deleteBtn}
            hitSlop={{ right: 10, top: 10 }}
            onPress={() => removeBtn('second')}>
            <Icon name='times' type='font-awesome-5' />
          </TO>)}
        </ImageBackground>
      </TO>
      <TO style={s.ImgContainer} onPress={() => picker('first')}>
        <ImageBackground source={imgbg} style={s.imgbg} resizeMode="center">
          <Image source={firstPhoto} style={s.img} resizeMode="cover" />
          {firstPhoto.uri === '' || firstPhoto.uri == null ? (<View></View>) : (<TO
            style={S.deleteBtn}
            hitSlop={{ right: 10, top: 10 }}
            onPress={() => removeBtn('first')}>
            <Icon name='times' type='font-awesome-5' />
          </TO>)}
        </ImageBackground>
      </TO>
    </ScrollView >
  )
}


const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      setSchoolImages
    },
    dispatch,
  );
};

const mapStateToProps = state => {
  return {
    schoolData: state.schoolHandle.schoolData,
    schoolImages: state.schoolHandle.schoolImages
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageSlider);

const s = StyleSheet.create({
  container: {
    marginVertical: 20
  },
  ImgContainer: {
    height: 200,
    width: 200,
    borderWidth: 1,
    borderColor: '#afafaf',
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  contentContainerStyle: {
    flexDirection: 'row',
  },
  img: {
    width: '100%', height: '100%',
    overflow: 'hidden'
  },
  imgbg: {
    flex: 1,
    width: '100%',
    height: '100%',
    borderRadius: 20,
    overflow: 'hidden'
  }
})




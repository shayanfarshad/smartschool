import React,{Component} from 'react';
import {View} from 'react-native';


class AttachContainer extends Component{

    canselAttach = () =>{
        this.setState({
          isAttachingPopup: false,
          isAttaching: false,
          selectedLayerId: null,
          selectedObjectId: null,
          description: 'توضیحات فایل پیوست',
          attachUri: null,
          attachPhoto: null
        })
        this.mapPostMan('changeMapSelectType', null);
        this.mapPostMan('deleteOverlayLayer')
      }
      fillDesc = (txt) =>{
        this.setState({description: txt})
      }
      Attacher = () =>{
        ImagePicker.showImagePicker(options, (response) => {   
          if (response.didCancel) {
            // console.log('User cancelled image picker');
          } else if (response.error) {
            // console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            // console.log('User tapped custom button: ', response.customButton);
          } else {
            // const source = { uri: response.uri };
            
            // You can also display the image using data:
            const img = { uri: 'data:image/jpeg;base64,' + response.data };
            this.setState({
              attachUri: [response.path,  response.fileName],
              attachPhoto: img
            });
          }
        });
      }
      RenderAttacher(){
        return(
          <TouchableOpacity onPress={this.Attacher} style={{flexDirection: 'row-reverse', justifyContent: 'center', marginVertical: 10, borderRadius: 5, borderColor: '#eee', borderWidth: 1, paddingVertical: 10}}>
                <Icon
                    iconStyle={{marginLeft: 10, marginTop: 2}}
                    // underlayColor = 'rgba(0,0,0,0)'
                    size={16}
                    name='attachment'
                    type='entypo'
                    color={'#424a58'}
                />
            <Text style={[Stl.font]}>
              انتخاب فایل پیوست
            </Text>
          </TouchableOpacity>
        )
      }
      RenderAttachPopup(){
        return(
          <Overlay isVisible={this.state.isAttachingPopup} height={'auto'}
            overlayStyle={{
                maxHeight: 500
            }}
          >
            <Fragment>
              <View><Text style={[Stl.font, {fontSize: 16}]}>شماره لایه انخابی: {this.state.selectedLayerId}</Text></View>
              <View><Text style={[Stl.font, {fontSize: 16}]}>شماره عارضه انخابی: {this.state.selectedObjectId}</Text></View>
              {this.RenderAttacher()}
              {
                this.state.attachPhoto !== null ? 
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <Image source={this.state.attachPhoto} style={{width: 100, height: 100}}/>
                </View> : null
              }
    
              <TextInput
                style={[{ height: 60, borderColor: 'gray', borderWidth: 1, borderRadius: 5, borderColor: '#eee', paddingHorizontal: 15, paddingVertical: 5, fontSize: 14, marginVertical: 5 }, Stl.font]}
                multiline
                onChangeText={text => this.fillDesc(text)}
                value={this.state.description}
              />
              <BtnRow>
                <Btn onPress={this.submitAttach} title="اتصال فایل" Primary TCenter Size={12} isDisable={this.state.attachUri !== null ? false : true}/>
                <Btn onPress={this.canselAttach} title="انصراف" Secondary TCenter Size={12} />
              </BtnRow>
            </Fragment>
          </Overlay>
        )
      }
      RenderAttachSelector(){
        return(
          <Overlay isVisible={this.state.isSelectAttachMode} height={'auto'}
            overlayStyle={{
                maxHeight: 500
            }}
            onBackdropPress={()=>{this.setState({isSelectAttachMode: false})}}
          >
            <Fragment>
              <View><Text style={[Stl.font, {fontSize: 18, textAlign: 'center'}]}>سرویس فایل های پیوست لایه</Text></View>
              <View><Text style={[Stl.font, {fontSize: 14, textAlign: 'center'}]}>تمایل به استفاده از کدام خدمت زیر را دارید؟</Text></View>
              <BtnRow>
                <Btn onPress={this.selectLayer} title="اتصال فایل به لایه" Primary TCenter Size={12}/>
              </BtnRow>
              <BtnRow>
                <Btn onPress={this.GetAttachListGuid} title="نمایش فایل های متصل شده به لایه" Secondary TCenter Size={12} />
              </BtnRow>
            </Fragment>
          </Overlay>
        )
      }
    
      //Get Attachments
      GetAttachListGuid = () =>{
        if(this.state.isGetAttachGuid){
          Alert.alert(
            'راهنمای دریافت فهرست فایل های پیوست لایه',
            'لطفا پس از روشن کردن لایه مورد نظر از فهرست لایه ها، اقدام به انتخاب عارضه مورد نظرتان از روی نقشه جهت دریافت فهرست فایل‌های پیوست متصل به عارضه نمایید',
            [
              {text: 'متوجه شدم', onPress: () => {}},
              {text: 'دیگر این پیام را نمایش نده', onPress: () => {this.setState({isGetAttachGuid: false})}},
            ]
          );
        }
        this.mapPostMan('changeMapSelectType', 'vectorSelection')
        this.setState({
          isSelectAttachMode: false,
          mapSelectType: 'getAttachedFilesList'
        })
      }
      FetchAttachList(layerId, objectId){
        this.setState({loaders: true})
        getListOfAttachedFiles(layerId, objectId).then(res=>{
          if(res.status === 200){
            this.mapPostMan('deleteOverlayLayer')
            RNToasty.Success({
                title: 'فهرست فایل های عارضه' + objectId + 'دریافت شد' ,
                duration: 1
            });
            this.setState({isAttachListOpen: true, loaders:false, AttachadLayerList: res.data})
          }
        }).catch(err=>{
          this.mapPostMan('deleteOverlayLayer')
          this.setState({loaders:false})
          RNToasty.Error({
              title: 'اشکال در دریافت لیست، علمیات لغو شد. ',
              duration: 1
          });
        })
      }
      deleteAttachedFileAlert(fileId, fileName){
        Alert.alert(
          'حذف فایل پیوست',
          'آیا از حذف این فایل پیوست اطمینان دارید؟' + '\n اطلاعات فایل: \n لایه: ' + this.state.selectedLayerId + '\n عارضه: ' + this.state.selectedObjectId +  '\n نام فایل:' + fileName,
          [
            {text: 'بله', onPress: () => {this.commandDeleteAttachedFile(fileId)}},
            {text: 'منصرف شده ام', onPress: () => {}},
          ]
        );
      }
      commandDeleteAttachedFile(fileId){
        deleteAttachment(this.state.selectedLayerId, this.state.selectedObjectId, fileId).then(res=>{
          if(res.status === 200){
            RNToasty.Success({
              title: 'فایل پیوست مورد نظر با موفقیت حذف گردید' ,
              duration: 1
            });
            this.FetchAttachList(this.state.selectedLayerId, this.state.selectedObjectId)
          }
        }).catch(err=>{
          RNToasty.Error({
            title: 'اشکال در حذف فایل پیوست، علمیات لغو شد. ',
            duration: 1
        });
        })
      }
      RenderAttachedList(){
        const list = this.state.AttachadLayerList.length>0 ?
        this.state.AttachadLayerList.map((item,index)=>{
          return(
            <View style={{flexDirection:'row-reverse', borderBottomColor: '#eee', borderBottomWidth: 1, marginVertical: 5 }} key={index}>
              <TouchableOpacity style={{flex: 0.9}} onPress={()=>{Linking.openURL('https://gis.nlho.ir/api/MobAccount/Download?AttachId=' + item.Id)}}>
                <Text style={{textAlign: 'right'}}>
                  {item.FileName}
                </Text>
                <Text style={{textAlign: 'right'}}>
                  {item.Description}
                </Text>
              </TouchableOpacity>
              <View style={{flex: 0.1}}>
                <Icon
                      // iconStyle={{marginLeft: 10}}
                      underlayColor = 'rgba(0,0,0,0)'
                      size={20}
                      name='trash-2'
                      type='feather'
                      color={'red'}
                      onPress={()=>this.deleteAttachedFileAlert(item.Id,item.FileName)}
                  />
              </View>
            </View>
          )
        }) : null
        return(
          <Overlay isVisible={this.state.isAttachListOpen} height={'auto'}
            overlayStyle={{
                maxHeight: 500
            }}
            onBackdropPress={()=>{this.setState({isAttachListOpen: false, AttachadLayerList: []})}}
          >
            <Fragment>
              <View><Text style={[Stl.font, {fontSize: 14, textAlign: 'center'}]}> فایل های متصل به عارضه {this.state.selectedObjectId} از لایه {this.state.selectedLayerId}</Text></View>
              <ScrollView>
                {
                  list
                }
              </ScrollView>
            </Fragment>
          </Overlay>
        )
      }
    
    render(){
        return(
            <View>
    
            </View>
        )
    }
}

export default AttachContainer
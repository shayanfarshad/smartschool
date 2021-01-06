import React, { useState,useEffect } from 'react';
import { View, Text, TextInput } from 'react-native';
import { Radio, Picker,Icon } from 'native-base';
import * as Stl from '../../../styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Btn,{BtnRow} from '../../../ui/Buttons/Btn';
import AppAlert from '../../../../utils/utils';
import {getMapBounds,ConvertTo3857} from '../../index';

function PinForm(props) {
    const [value, changeText] = useState('');
    const [checked, setChecked] = useState('self');
    const [selectedUser, setSelectedUser] = useState(0);
    
    function submitLocation(){
        if(value === ''){
            AppAlert('info', 'نام نشان مورد نظر خود را وارد کنید')
        }else{
            getMapBounds().then(res=>{
                // var extent = {
                //     Xmin:res[1][0],
                //     Ymin:res[1][1],
                //     Xmax:res[0][0],
                //     Ymax:res[0][1]
                // }
                
                props.onSubmitForm(selectedUser, value, checked, ConvertTo3857(res[0],res[1]))
                changeText('');
                setSelectedUser(0)
            })
        }
        
        
    }

    return (
        <View style={{ flex: 1 }}>
            <TextInput
                style={[Stl.input, Stl.font, {
                    margin: 10,
                    marginLeft: 20,
                    marginRight: 0
                }]}
                onChangeText={text => changeText(text)}
                value={value}
                placeholder="نام نشان مورد نظر"
            />
            <TouchableOpacity style={Stl.checkBoxContainer} onPress={() => setChecked('self')}>
                <Radio
                    selected={checked === 'self' ? true : false}
                    style={Stl.checkBox}

                />
                <Text style={[Stl.checkBoxTxt, Stl.font, Stl.typo]}>ذخیره موقعیت فقط برای خودم</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Stl.checkBoxContainer} onPress={() => setChecked('general')}>
                <Radio
                    selected={checked === 'general' ? true : false}
                    style={Stl.checkBox}
                />
                <Text style={[Stl.checkBoxTxt, Stl.font, Stl.typo]}>این موقعیت عمومی است</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Stl.checkBoxContainer} onPress={() => {
                if(props.userList.length > 0){
                    setChecked('sendToUser')
                }else{
                    AppAlert('info', 'فهرست کاربران موجود نیست')
                }
            }}>
                <Radio
                    selected={checked === 'sendToUser' ? true : false}
                    style={Stl.checkBox}

                />
                <Text style={[Stl.checkBoxTxt, Stl.font, Stl.typo]}>ارسال موقعیت برای کاربر خاص</Text>
            </TouchableOpacity>
            {
                checked === 'sendToUser' ?
                    props.userList.length > 0 ?
                        <Picker
                            note
                            mode="dropdown"
                            placeholder="انتخاب کاربر"
                            placeholderStyle={[Stl.font,{textAlign: 'right', width: '100%'}]}
                            style={{ width: '100%', marginLeft: 10, borderWidth: 1, borderColor: '#eee', borderRadius: 5, height: 40}}
                            textStyle={[Stl.font,{textAlign: 'right', width: '100%',fontSize: 14}]}
                            selectedValue={selectedUser}
                            onValueChange={(id)=>setSelectedUser(id)}
                            itemTextStyle={[Stl.font,{width: '100%'}]}
                            iosIcon={<Icon name="arrow-down" />}
                            itemStyle={{
                                flexDirection: 'row-reverse'
                              }}
                        >
                            {
                                props.userList.map((item,index)=>{
                                    return <Picker.Item label={item.UserName} value={item.UserId} key={index} />
                                })
                            }
                        </Picker>
                        :null : null
            }
            <BtnRow Right>
                <Btn
                    title="ثبت موقعیت"
                    Primary
                    BtnStyle={{flex:0.4}}
                    TCenter
                    Size={14}
                    onPress={()=>{submitLocation()}}
                />
            </BtnRow>
        </View >
    )
}

export default PinForm;


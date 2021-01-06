import React,{useState} from 'react';
import {Alert} from 'react-native'
// import ToggleView from '../../../ui/toggleView';
import DrawerItem from '../../../Drawers/drawerItem'
import {openCloseDrawer} from '../../../Drawers/actions';
import {setAttachingActive} from '../actions';

function AttachFileBtn(props){
    const [showGuid, setGuid] = useState(true)
    function commandAttach(){
        openCloseDrawer(false);
        setTimeout(() => {
            setAttachingActive(true)
            if(showGuid){
                Alert.alert(
                  'راهنمای دریافت فهرست فایل های پیوست لایه',
                  'لطفا پس از روشن کردن لایه مورد نظر از فهرست لایه ها، اقدام به انتخاب عارضه مورد نظرتان از روی نقشه جهت دریافت فهرست فایل‌های پیوست متصل به عارضه نمایید',
                  [
                    {text: 'متوجه شدم', onPress: () => {}},
                    {text: 'دیگر این پیام را نمایش نده', onPress: () => {setGuid(false)} },
                  ]
                );
              }
        }, 1000);
    }
    return(
        <DrawerItem 
            Label="اتصال فایل پیوست به عارضه"
            RightIcon={{
                name:"attachment",
                type: 'entypo',
                size: 22
            }}
            onPress={()=>{commandAttach()}}
        />
    )
}

export default AttachFileBtn;
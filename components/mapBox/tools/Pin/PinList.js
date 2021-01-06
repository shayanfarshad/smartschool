import React, { useState } from 'react';
import {Alert} from 'react-native';
import * as Stl from '../../../styles';
import AppAlert from '../../../../utils/utils';
import ToggleView from '../../../ui/toggleView';
import DrawerItem from '../../../Drawers/drawerItem';
import {SetExtent} from '../../index';
import {openCloseDrawer} from '../../../Drawers/actions';

function PinnedList(props) {

    function RemoveItem(item){
        var id = item[props.ListItemIDSelector];
        Alert.alert(
            'حذف موقعیت نشان گذاری شده',
            `آیا از حذف موقعیت ${item[props.ListItemTitleSelector]} اطمینان دارید؟`,
            [
              {
                text: 'انصراف',
                onPress: () => {},
                style: 'cancel',
              },
              {text: 'بله', onPress: () => {props.OnRemove(id)}},
            ],
            {cancelable: true},
          );
        // 
    }

    function onClickItem(item){
        SetExtent({
            Xmax:item.Xmax,
            Xmin:item.Xmin,
            Ymax:item.Ymax,
            Ymin:item.Ymin
        })
        openCloseDrawer(false)
    }

    return (
        <ToggleView
            title="محدوده های نشان گذاری شده"
            RightIcon="location-pin"
            RightIconType="entypo"
        >
            {
                props.list.length > 0 ? props.list.map((item,index)=>{
                    return <DrawerItem 
                        styles={{marginLeft: -10, marginRight: 10}}
                        key={index}
                        Label={item[props.ListItemTitleSelector]}
                        RightIcon={{
                            name: 'map-pin',
                            type: 'font-awesome',
                            size: 20
                        }}
                        LeftIcon={{
                            name: 'remove',
                            type: 'font-awesome',
                            size: 20
                        }}
                        LeftIconColor="red"
                        onPress={()=>{onClickItem(item)}}
                        OnLeftPress={()=>{RemoveItem(item)}}
                    />
                }) : null
            }
        </ToggleView>
    )
}

export default PinnedList;


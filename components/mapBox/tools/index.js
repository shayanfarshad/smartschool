import React from 'react';
import CircleBtn from '../../ui/Buttons/CirlceBtn';
import {setDrawerContent,openCloseDrawer} from '../../Drawers/actions';

export default function OpenMapTools({status}) {
    function handleBtn(){
        setDrawerContent('MapTools');
        openCloseDrawer(!status);
    }
    return (
        <CircleBtn
            press={()=>handleBtn()}
            img={require('./img/tools.png')}
            bottom={20}
            left={20}
            right={'auto'}
            CirclSize={40}
            IcoSize={25}
        /> 
    )
}

export function OpenMapLayers({status}) {
    function handleBtn(){
        setDrawerContent('MapLayers');
        openCloseDrawer(!status);
    }
    return (
        <CircleBtn
            press={()=>handleBtn()}
            img={require('./img/layers.png')}
            bottom={70}
            left={20}
            right={'auto'}
            CirclSize={40}
            IcoSize={25}
        />
    )
}
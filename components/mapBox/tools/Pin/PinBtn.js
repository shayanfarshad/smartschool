import React from 'react';
import ToggleView from '../../../ui/toggleView';
import PinForm from './PinForm';

function PinExtent(props){
    return(
        <ToggleView
            title="نشانه گذاری محدوده"
            RightIcon="pin"
            RightIconType="entypo"
        >
            <PinForm 
                userList={props.userList}
                onSubmitForm={props.onSubmitForm}
            />
        </ToggleView>
    );
}

export default PinExtent;
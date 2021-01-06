import React, { Component } from 'react';
import CircleBtn from '../../../ui/Buttons/CirlceBtn';
import {setUserLocIcoVis} from '../actions';
import { resetZoom } from '../../index';

class BackToIran extends Component {
    backToIranView = () =>{
        setUserLocIcoVis(false)
        resetZoom();
    }
    render() {
        return (
            <CircleBtn
                press={this.backToIranView}
                img={require('../img/iran.png')}
                bottom={70}
                right={20}
                left={'auto'}
                CirclSize={40}
                IcoSize={25}
            />

        )
    }
};

export default BackToIran;
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import * as Stl from '../../../styles';

export default class TocFlatItem extends Component {
    render() {
        return (
            <View 
                style={[s.Container, this.props.styles ? this.props.styles : {}]}
            >
                <TouchableOpacity
                    onPress={this.props.onPress}
                    style={{flexDirection: "row-reverse", flex:0.9}}
                >
                    <View style={{ flex: 0.1 }}>
                        <Icon
                            name={this.props.Selcted? 'checkbox-marked' : 'checkbox-blank-outline'}
                            type={'material-community'}
                            color={this.props.Selcted? '#2089dc' : 'gray'}
                            size={20}
                        />
                    </View>
                    <View style={{ flex: 0.1 }}>
                        <Image source={{uri: this.props.Img}} style={{width: 15, height: 15, alignSelf: 'center'}} />
                    </View>
                    <View style={{ flex: 0.8 }}>
                        <Text style={[Stl.font, Stl.typo, s.Text]}>{this.props.Label}</Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity style={{ flex: 0.1 }} onPress={this.props.OnLeftPress}>
                    <Icon
                        name={'zoom-in'}
                        type={'feather'}
                        color={Stl.primary.color}
                        size={20}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const s = StyleSheet.create({
    Container: {
        flexDirection: 'row-reverse',
        marginRight: 0,
        marginLeft: 0,
        paddingHorizontal: 2,
        paddingVertical: 10,
        borderBottomColor: '#eee',
        borderBottomWidth: 1
    },
    Text: {
        fontSize: 14,
        textAlign: 'right'
    }
})
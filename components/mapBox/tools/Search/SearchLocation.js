import React, { Component, Fragment } from 'react';
import { View, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Body, List, ListItem, Text } from 'native-base';
import { Overlay, Icon } from 'react-native-elements'
import * as Stl from '../../../styles';

class SearchLocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputVal: ''
        }
    }

    onChangeText = (txt) => {
        this.setState({
            inputVal: txt
        })
    }

    submitEdit = () => {
       this.props.onChangeTextSubmit(this.state.inputVal)
    }

    onItemClick = (item) => {
        this.props.onResultItemClick(item)
    }

    renderSearchResult() {
        const res = this.props.resultList.map((item, index) => {
            return (
                <ListItem onPress={() => this.onItemClick(item)} key={index}>
                    <Body>
                        <Text style={[Stl.font, s.listItem]}>{item[this.props.resultItemSelector]}</Text>
                        <Text style={[Stl.font, s.listItem, {fontSize: 13}]}>{item[this.props.resultSubItemSelector]}</Text>
                    </Body>
                </ListItem>
            )
        })
        return (
            <Overlay isVisible={this.props.overlay} onBackdropPress={() => this.props.setOverlay(false)} height={'auto'}
                overlayStyle={{
                    maxHeight: 500
                }}
            >
                <Fragment>
                    <ScrollView>
                        <List>
                            {res}
                        </List>

                    </ScrollView>
                </Fragment>
            </Overlay>
        )
    }
    render() {
        return (
            <>
                <View style={s.container}>
                    <TextInput
                        style={[s.input, Stl.font]}
                        onChangeText={text => this.onChangeText(text)}
                        value={this.state.inputVal}
                        placeholder="جستجو بر اساس نام"
                        onSubmitEditing={this.submitEdit}
                        returnKeyType="search"
                    />
                    {
                        this.props.resultList.length > 0 ?
                            <TouchableOpacity
                                style={s.listView}
                                onPress={() => this.props.setOverlay(true)}
                            >
                                <Icon
                                    name='list-alt'
                                    type='font-awesome'
                                    color='#000'
                                />
                            </TouchableOpacity>
                            : null
                    }


                </View>
                {this.props.resultList.length > 0 ? this.renderSearchResult() : null}
            </>
        )
    }
}

export default SearchLocation;


const s = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 10,
        right: 10,
        top: 10,
        zIndex: 1
    },
    input: {
        borderRadius: 10,
        backgroundColor: '#fff',
        paddingVertical: 8,
        paddingHorizontal: 15,
        textAlign: 'right',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    listView: {
        position: 'absolute',
        left: 10,
        top: 10,
        zIndex: 20
    },
    listItem:{
        textAlign: 'right'
    }
})  
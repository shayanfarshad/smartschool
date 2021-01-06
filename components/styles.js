'use strict';
import {Platform} from 'react-native'

var React = require('react-native');
var {StyleSheet} = React;

export const txtAl = Platform.select({
  ios: 'right',
  android: 'left'
});

module.exports = StyleSheet.create({
    font:{
        fontFamily: 'IRANSansWeb(FaNum)',
        textAlign: 'right'
    },
    h1:{
        fontSize:24
    },
    h2:{
        fontSize:22
    },
    h3:{
        fontSize:20
    },
    h4:{
        fontSize:18
    },
    h5:{
        fontSize:16
    },
    Label:{
        fontSize:12
    },
    Paragraph:{
        fontSize:14
    },
    BgPrimary:{
        backgroundColor: '#F1AB49'
    },
    BgLight:{
        backgroundColor: '#fff'
    },
    BgSecondary:{
        backgroundColor: 'rgba(241,171,73,0.5)'
    },
    BgGray:{
        backgroundColor: '#959595'
    },
    BgGreen:{
        backgroundColor: '#36D631'
    },
    Primary:{
        color: '#F1AB49'
    },
    Secondary:{
        color: 'rgba(241,171,73,0.5)'
    },
    Third:{
        color: '#2C3E50'
    },
    Light:{
        color: '#fff'
    }
});
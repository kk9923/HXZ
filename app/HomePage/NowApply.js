/**
 * Created by xiakai on 2017/7/7.
 */
'use strict';
import React, {Component} from 'react';
import {Text, StyleSheet, Image,WebView,View} from 'react-native';

export default class NowApply extends Component {
    static defaultProps = {};

    static navigationOptions = ({ navigation }) => ({
        title: `${navigation.state.params.name}`,
    });
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const  {params} = this.props.navigation.state
        return (
        <View style={{flex:1,flexDirection:'column'}}>
            {/*<Text>dffdfddf {params.applyUrl}</Text>*/}
            <WebView
        style={styles.webview_style}
        source={{uri:params.applyUrl,method: 'GET'}}
        startInLoadingState={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
            />
        </View>

    );
    }

    componentWillMount() {

    }
}

const styles = StyleSheet.create({
    tabbar: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9'
    },

    webview_style:{
        //backgroundColor:'#00ff00',
    }
});
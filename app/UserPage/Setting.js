/**
 * Created by xiakai on 2017/7/7.
 */
'use strict';
import React, {Component} from 'react';
import {Text, StyleSheet, Image,View,TouchableWithoutFeedback,Dimensions,AlertIOS} from 'react-native';
var ScreenWidth = Dimensions.get('window').width;
export default class Setting extends Component {
    static defaultProps = {};
    static navigationOptions = {
        title: '设置',
    };
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const  {navigate} = this.props.navigation
        return (
            <View>
                <TouchableWithoutFeedback
                    onPress={()=>{
                        AlertIOS.alert('设置密码')
                    }}
                >
                    <View style={styles.item}>
                        <Text style={styles.text}>设置密码</Text>
                        <Image  style={styles.arrow} source={(require('./icon_right.png'))}/>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{height:12,width:ScreenWidth,backgroundColor:'#efefef'}}/>
                <TouchableWithoutFeedback
                    onPress={()=>{
                        navigate('NowApply',{name:'产品介绍',applyUrl:'https://jk.suyijia.com//loan/i/html5/productIntro?appCode=HXK1.3.0&xyOrQh=1&oldOrNewH5=2'})
                    }}
                >
                    <View style={styles.item}>
                        <Text style={styles.text}>产品介绍</Text>
                        <Image  style={styles.arrow} source={(require('./icon_right.png'))}/>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{height:0.5,width:ScreenWidth,backgroundColor:'#d9d9d9'}}/>
                <TouchableWithoutFeedback
                    onPress={()=>{
AlertIOS.alert('商务合作')
                    }}
                >
                    <View style={styles.item}>
                        <Text style={styles.text}>商务合作</Text>
                        <Image  style={styles.arrow} source={(require('./icon_right.png'))}/>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{height:0.5,width:ScreenWidth,backgroundColor:'#d9d9d9'}}/>
                <TouchableWithoutFeedback
                    onPress={()=>{
                        navigate('NowApply',{name:'关于我们',applyUrl:'https://jk.suyijia.com//loan/i/html5/about?appCode=HXK1.3.0&xyOrQh=1&oldOrNewH5=2'})
                    }}
                >
                    <View style={styles.item}>
                        <Text style={styles.text}>关于我们</Text>
                        <Image  style={styles.arrow} source={(require('./icon_right.png'))}/>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    componentWillMount() {

    }
}

const styles = StyleSheet.create({
    item: {
        alignItems: 'center',
        //width:ScreenWidth,
        height:47,
        flexDirection:'row',
        backgroundColor:'#fff'
    },
    image: {
        width:22,
        height:20,
        resizeMode:'stretch',
        marginLeft:15
    },text: {
        fontSize:15,
        marginLeft:10,
        color:'#333'
    },arrow:{
        position:'absolute',
        right:16,
        width:25,
        height:25,
        resizeMode:'stretch',
    }


});
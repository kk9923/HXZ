/**
 * Created by xiakai on 2017/7/3.
 */
import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,Image,
    View,ScrollView,Dimensions,TouchableWithoutFeedback,Linking,AlertIOS
} from 'react-native';
var ScreenWidth = Dimensions.get('window').width;
export default class GXS extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    };

    render() {

        return (
            <ScrollView style={{flex:1,backgroundColor:'#efefef'}}>
            <View style={styles.container}>
            <Text>我是二个页面</Text>
                <View style={{height:14,width:ScreenWidth,backgroundColor:'#efefef'}}/>

                <View style={styles.item}>
                    <Image  style={styles.image} source={(require('./icon.png'))}/>
                    <Text style={styles.text}>个人信息</Text>
                    <Image  style={styles.arrow} source={(require('./icon_right.png'))}/>
                </View>
                <View style={{height:0.9,width:ScreenWidth,backgroundColor:'#d9d9d9'}}/>

                <TouchableWithoutFeedback
                onPress={()=>{
                    const  navigate= this.props.navigate;
                    navigate('ApplyJiLU')
                }}
                >
                    <View style={styles.item}>
                        <Image  style={styles.image} source={(require('./icon.png'))}/>
                        <Text style={styles.text}>申请记录</Text>
                        <Image  style={styles.arrow} source={(require('./icon_right.png'))}/>
                    </View>
                </TouchableWithoutFeedback>

                <View style={{height:14,width:ScreenWidth,backgroundColor:'#efefef'}}/>
                <TouchableWithoutFeedback
                onPress={()=>{
                    const  navigate= this.props.navigate;
                    navigate('NowApply',{name:'常见问题',applyUrl:'https://jk.suyijia.com//loan/i/html5/commonProblem?appCode=HXK1.3.0&xyOrQh=1&oldOrNewH5=2'})
                }}
                >
                    <View style={styles.item}>
                        <Image  style={styles.image} source={(require('./icon.png'))}/>
                        <Text style={styles.text}>常见问题</Text>
                        <Image  style={styles.arrow} source={(require('./icon_right.png'))}/>
                    </View>

                </TouchableWithoutFeedback>

                <View style={{height:0.9,width:ScreenWidth,backgroundColor:'#d9d9d9'}}/>
                <TouchableWithoutFeedback
                onPress={()=>{
                    AlertIOS.alert('','400-063-8909',[
                        {
                            text: '取消',
                            onPress:function(){
                                //alert('取消');
                            }
                        },

                        {
                            text: '呼叫',
                            onPress:function(){
                                Linking.openURL('tel:'+110).catch(e=>AlertIOS.alert(''+e))
                            }
                        }

                    ]);

                }}
                >
                    <View style={styles.item}>
                        <Image  style={styles.image} source={(require('./icon.png'))}/>
                        <Text style={styles.text}>联系客服</Text>
                        <Image  style={styles.arrow} source={(require('./icon_right.png'))}/>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{height:0.9,width:ScreenWidth,backgroundColor:'#d9d9d9'}}/>
                <TouchableWithoutFeedback
                    onPress={()=>{
                        const  navigate= this.props.navigate;
                        navigate('Setting')
                    }}
                >
                <View style={styles.item}>
                     <Image  style={styles.image} source={(require('./icon.png'))}/>
                     <Text style={styles.text}>设置</Text>
                     <Image  style={styles.arrow} source={(require('./icon_right.png'))}/>
                </View>
                </TouchableWithoutFeedback>
            </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop:20,
        backgroundColor:'#fff'
    },
    item: {
        alignItems: 'center',
        width:ScreenWidth,
        height:47,
        flexDirection:'row'
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

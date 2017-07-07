/**
 * Created by xiakai on 2017/7/6.
 */
'use strict';
import React, {Component} from 'react';
import {Text, StyleSheet, Image,AlertIOS,View,ScrollView,TouchableWithoutFeedback} from 'react-native';
import JsonUtils from '../utils/JsonUtil'
export default class TabBar extends Component {
    static defaultProps = {};
    static navigationOptions = {
        title: '贷款详情',
    };
    constructor(props) {
        super(props);
        this.state = {
            id : this.props.navigation.state.params.id,
            rowData :null,
            loading:true
        }
    }

    //发起网络请求，获取数据
    componentDidMount() {
        this.getLoanLists(false)
    }
    /**
     * 请求网络
     */
    getLoanLists(booble){
        AlertIOS.alert(''+this.state.id)
        const map2 = new Map().set('apiVersion', '1.3.0').set('appCode','HXK1.3.0').set('appName','43').set('channel','ios').set('id',this.state.id).set('version','1.3.0').set('key','fEBRtWCX5PDFpJazDqZgHLgGPz0rdaSVf8/reeHkExkumh98/fEsiurXyaOnSKd3qwZ1btuDuJ3jAutzeHQS3gB9ctOwNLi9B5vSOgv3e+I=');
        const json = JsonUtils.mapToJson(map2)
        const url = 'https://jk.suyijia.com/loan/i/loan/detail';
        fetch(url, {
            method: 'POST',      //请求方式
            body: json
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if('1'===responseJson.code){
                    this.setState({
                        rowData:responseJson.record,
                        loading:false
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        const  {navigate} = this.props.navigation
        const  loading = this.state.loading;
        if(loading){
            return (
                <Text>正在加载中{this.state.id}</Text>
            )
        }else {

        return (
        <View style={{flex:1}}>
        <ScrollView style={{flex:1,backgroundColor:'#fff'}}>
            <View >
                <View style={{height:1,backgroundColor:'#d9d9d9'}}/>
                <View style={styles.listViewItem}>
                    <Image style={styles.image} resizeMode='stretch' source={{uri:'https://www.baidu.com/img/bd_logo1.png'}}/>
                    {/*<Image style={styles.image} resizeMode='stretch' source={{uri:rowData.imageUrl}}/>*/}
                    <View>
                        <Text style={styles.title}>{this.state.rowData.title}</Text>
                        <Text style={styles.content}>{this.state.rowData.content}</Text>
                    </View>
                </View>
                <View style={styles.line}/>
                <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10,alignItems:'center'}}>
                    {/*{loanLabelList}*/}
                    <Text>成功申请</Text>
                    <View style={{flexDirection:'row',position:'absolute',right:12}}>
                        <Text>成功申请</Text>
                        <Text style={styles.peopleNumber}>{this.state.rowData.peopleNumber}</Text>
                        <Text>人</Text>
                    </View>
                </View>
                <View style={{height:1,backgroundColor:'#d9d9d9'}}/>
                <View style={{height:12,backgroundColor:'#efefef'}}/>
                <View>
                    <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10,alignItems:'center',marginLeft:8}}>
                        <View style={{backgroundColor:'#f00',width:3,height:18,borderRadius:5}}/>
                        <Text style={{fontSize:15,color:'#333',marginLeft:6}}>申请条件</Text>
                    </View>
                    <Text style={{fontSize:13,color:'#999',marginLeft:17,marginTop:7,paddingBottom:30}}>{this.state.rowData.applyContent}</Text>
                    <View style={{height:1,backgroundColor:'#d9d9d9'}}/>
                </View>

                <View>
                    <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10,alignItems:'center',marginLeft:8}}>
                        <View style={{backgroundColor:'#f00',width:3,height:18,borderRadius:5}}/>
                        <Text style={{fontSize:15,color:'#333',marginLeft:6}}>所需材料</Text>
                    </View>
                    <Text style={{fontSize:13,color:'#999',marginLeft:17,marginTop:7,paddingBottom:30}}>{this.state.rowData.applyData}</Text>
                    <View style={{height:1,backgroundColor:'#d9d9d9'}}/>
                </View>

                <View>
                    <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10,alignItems:'center',marginLeft:8}}>
                        <View style={{backgroundColor:'#f00',width:3,height:18,borderRadius:5}}/>
                        <Text style={{fontSize:15,color:'#333',marginLeft:6}}>产品介绍</Text>
                    </View>
                    <Text style={{fontSize:13,color:'#999',marginLeft:17,marginTop:7,paddingBottom:30}}>{this.state.rowData.proIntroduction}</Text>
                    <View style={{height:1,backgroundColor:'#d9d9d9'}}/>
                </View>
                <View>
                    <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10,alignItems:'center',marginLeft:8}}>
                        <View style={{backgroundColor:'#f00',width:3,height:18,borderRadius:5}}/>
                        <Text style={{fontSize:15,color:'#333',marginLeft:6}}>产品介绍</Text>
                    </View>
                    <Text style={{fontSize:13,color:'#999',marginLeft:17,marginTop:7,paddingBottom:30}}>{this.state.rowData.proIntroduction}</Text>
                    <View style={{height:1,backgroundColor:'#d9d9d9'}}/>
                </View>

            </View>
        </ScrollView>
        <TouchableWithoutFeedback
            onPress={()=>{
                //this.getBa''+this.state.bannerSource.length)
                //const  navigate  = this.props.navigate;
                //navigate('NowApply')
            this.applyLoan(navigate)
                //
            }}>
        <View style={{
                borderRadius:20,
                    borderWidth:0.5,
                    borderColor:'#f00',
                    //width:ScreenWidth,
                    height:35,
                    alignItems:'center',
                    backgroundColor:'#f00',
                    justifyContent:'center',
                    marginRight:50,
                    marginLeft:50,
                     marginTop:10,
                     marginBottom:10
            }}>
        <Text style={styles.shenqing}>立即申请</Text>
            </View>
            </TouchableWithoutFeedback>
        </View>
        );
        }
    }

    applyLoan(navigate){
        //AlertIOS.alert(''+this.state.id)
        const map2 = new Map().set('apiVersion', '1.3.0').set('appCode','HXK1.3.0').set('appName','43').set('channel','ios').set('loanId',this.state.id).set('userId','61258').set('version','1.3.0').set('key','fEBRtWCX5PDFpJazDqZgHLgGPz0rdaSVf8/reeHkExkumh98/fEsiurXyaOnSKd3qwZ1btuDuJ1FQwFBsktvmFYH8rCdaO1gOcgIkkPC54/fZ24xbBZvvXoVJ0MBActy');
        const json = JsonUtils.mapToJson(map2)
        const url = 'https://jk.suyijia.com/loan/i/loan/applyLoan';
        fetch(url, {
            method: 'POST',      //请求方式
            body: json
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if('1'===responseJson.code){
                    navigate('NowApply',{name:''+this.state.rowData.title,applyUrl:responseJson.data.applyUrl})
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

}

const styles = StyleSheet.create({
    listViewItem: {
        paddingLeft:15,
        paddingTop:15,
        flexDirection:'row'
    },
    image : {
        height: 60,
        width:60,
        marginBottom:15
    },
    title:{
        marginLeft:8,
        fontSize:16,
        color:'#333'
    },content:{
        marginLeft:8,
        marginTop:11,
        fontSize:13,
        color:'#999'
    },line:{
        height:1,
        backgroundColor:'#d9d9d9'
    },peopleNumber:{
        color:'#ff0000'
    },shenqing:{
        //width:200,
        // height:40,
        fontSize:18,
        color:'#fff',
        textAlign:'center',
        //textAlignVertical:'center',
        //backgroundColor:'#f0f'
        alignItems:'center',
        //backgroundColor:'#333',
        justifyContent:'center',
       // borderRadius:20,
       // borderWidth:0.5,
        //borderColor:'#f00',
    }

});
/**
 * Created by xiakai on 2017/7/3.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,BackHandler,
    View,Image,ScrollView,Slider,Dimensions,Button,TouchableWithoutFeedback,AlertIOS
} from 'react-native';
var ScreenWidth = Dimensions.get('window').width;
import JsonUtils from '../utils/JsonUtil'
import AllPage from './Allpage'
import ScrollableTabView , {DefaultTabBar, }  from 'react-native-scrollable-tab-view';
export default class GXS extends Component {
    constructor(props) {
        super(props);
        const lists = [];
        this.state = {
             value:1,
            bannerSource:lists
        }
    };
//发起网络请求，获取数据
    componentDidMount() {
       // this.getBannerList()
        BackHandler.addEventListener('hardwareBackPress',this._handBack)
    }

    /**
     * 首页广告banner
     */
    getBannerList(){
        const map2 = new Map().set('apiVersion', '1.3.0').set('appCode','HXK1.3.0').set('appName','43').set('channel','ios').set('flag','').set('loanType','').set('orderBy','1').set('page','1').set('pageSize','10')
            .set('version','1.3.0').set('key','fEBRtWCX5PDFpJazDqZgHLgGPz0rdaSVf8/reeHkExkumh98/fEsiurXyaOnSKd3qwZ1btuDuJ0FXhsYE5PTtUxdblAmKHPXUUp4iatLPTA3FkreRMhVJRNn3Ba9cn/TdIEYWsaMLRPorsfHznMozRY4ViKNAzFn');
        const json = JsonUtils.mapToJson(map2)
        const url = 'https://jk.suyijia.com/loan/i/banner/getBannerList';
        fetch(url, {
            method: 'POST',      //请求方式
             body: json
        })
            .then((response) => response.json())
            .then((responseJson) => {
            AlertIOS.alert(''+responseJson.success)
                if('1'===responseJson.code){
                   // this.setState({
                        //bannerSource: responseJson.rows,
                   // });
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        if (this.state.bannerSource.length <0){
            return (
                <Text>正在加载中</Text>
            )
        }
        const  banners = [];
        for (let i = 0; i < this.state.bannerSource.length;i++){
            const  item = this.state.bannerSource[i].picture;
            banners.push(
                <TouchableWithoutFeedback  key={i} onPress={()=>{
                    AlertIOS.alert('图片地址 =   '+item)
                }}>
                    <Image resizeMode='stretch'
                        style={styles.image} source={{uri:item+''}}/>
                </TouchableWithoutFeedback>
            )
        }
        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                <View style={styles.status}>
                    <Text style={styles.title}>产品大全</Text>
                    <TouchableWithoutFeedback
                    onPress={()=>{
                        this._handBack()
                    }}
                    >
                    <Image style={{width:18,height:18,resizeMode:'stretch', position:'absolute',left:20,top:25}} source={(require('./user.png'))}/>
                    </TouchableWithoutFeedback>
                </View>
                <ScrollableTabView
                    style={{marginTop: 0, }}
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarActiveTextColor='#f00'
                    tabBarTextStyle={{fontSize:17,alignItems:'center',justifyContent:'center'}}
                    tabBarUnderlineStyle={{backgroundColor:'#f00',height:2,alignItems:'center',justifyContent:'center'}}
                >
                    <AllPage tabLabel='全部'/>
                    <Text tabLabel='新口子'>favorite</Text>
                </ScrollableTabView>

            </View>

        );
    }
    componentWillUnMount(){
        BackHandler.removeEventListener('hardwareBackPress',this._handBack)
    }
    _handBack(){
        const navigator = this.props.navigator;
        if(navigator && navigator.getCurrentRoutes().length >1){
            navigator.pop()
            return true;
        }
        return false;
    }
}
const styles = StyleSheet.create({

    status: {
        width:ScreenWidth,
        height:55,
        backgroundColor: '#f00',
        paddingTop:20,
        paddingBottom:10,
        alignItems:'center',
        justifyContent:'center',
        flexDirection:'row'
    },
    title: {
        color:'#fff',
        fontSize:18,
       // height:30,
       // width:ScreenWidth,
       // textAlign:'center',
       // backgroundColor: '#333',
       // textAlignVertical:'center'

    },


});

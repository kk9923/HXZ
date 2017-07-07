/**
 * Created by xiakai on 2017/7/3.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,Image,ScrollView,Slider,Dimensions,Button,TouchableWithoutFeedback,AlertIOS
} from 'react-native';
var ScreenWidth = Dimensions.get('window').width;
import JsonUtils from '../utils/JsonUtil'
import  Swiper from  'react-native-swiper'
import ProductCenter from './ProductCenter'
export default class GXS extends Component {
    constructor(props) {
        super(props);
        const lists = [];
        this.state = {
            shenQingMoney:1000,
            HuankuanMoney:1000,
            HuankuanMonth:1,
            value:1,
            bannerSource:lists
        }
    };
//发起网络请求，获取数据
    componentDidMount() {
        this.getBannerList()
    }

    /**
     * 首页广告banner
     */
    getBannerList(){
        const map2 = new Map().set('apiVersion', '1.3.0').set('appCode','HXK1.3.0').set('appName','43').set('channel','ios')
            .set('version','1.3.0').set('key','fEBRtWCX5PDFpJazDqZgHLgGPz0rdaSVf8/reeHkExkumh98/fEsiurXyaOnSKd3qwZ1btuDuJ1jr3Uuyia8ARQ9mVpOatnW');
        const json = JsonUtils.mapToJson(map2)
        //AlertIOS.alert(''+json)
        const url = 'https://jk.suyijia.com/loan/i/banner/getBannerList';
        fetch(url, {
            method: 'POST',      //请求方式
             body: json
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if('1'===responseJson.code){
                    this.setState({
                        bannerSource: responseJson.rows,
                    });
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
            const  item = this.state.bannerSource[i];
            banners.push(
                <TouchableWithoutFeedback  key={i} onPress={()=>{
                   // AlertIOS.alert('图片地址 =   '+item)
                    const  navigate  = this.props.navigate;
                    navigate('NowApply',{name:''+item.title,applyUrl:item.url})
                }}>
                    <Image resizeMode='stretch'
                        style={styles.image} source={{uri:item.picture}}/>
                </TouchableWithoutFeedback>
            )
        }
        return (
        <ScrollView style={{flex:1,backgroundColor:'#efefef'}}>
            <View style={{flexDirection:'column',flex:1,backgroundColor:'#fff'}}>
                <Text style={styles.title}>好下款</Text>

                <View style={{height:130,backgroundColor:'#f00',flexDirection:'row',justifyContent:'center',paddingTop:10,paddingBottom:6}}>
                <View style={{flexDirection:'column',backgroundColor:'#f00',justifyContent:'space-between',alignItems:'center',flex:1}}>
                    <Image  resizeMode='stretch' style={{height:25,height:35}} source={require('./user.png')}/>
                    <Text style={{color:'#fff',fontSize:14}}>申请金额（元）</Text>
                    <Text style={{color:'#fff',fontSize:18}}>{this.state.shenQingMoney}</Text>
                </View>
                    <View style={{flexDirection:'column',backgroundColor:'#f00',justifyContent:'space-between',alignItems:'center',flex:1}}>
                        <Image  resizeMode='stretch' style={{height:25,height:35}} source={require('./user.png')}/>
                        <Text style={{color:'#fff',fontSize:14}}>还款金额（元）</Text>
                        <Text style={{color:'#fff',fontSize:18}}>{(this.state.shenQingMoney *1.049/ this.state.HuankuanMonth).toFixed(2)}</Text>
                    </View>
                    <View style={{flexDirection:'column',backgroundColor:'#f00',justifyContent:'space-between',alignItems:'center',flex:1}}>
                        <Image  resizeMode='stretch' style={{height:25,height:35}} source={require('./user.png')}/>
                        <Text style={{color:'#fff',fontSize:14}}>还款期数（月）</Text>
                        <Text style={{color:'#fff',fontSize:18}}>{this.state.HuankuanMonth}</Text>
                    </View>
                </View>
                <View style={styles.sliderMoney}>
                    <Text>1000</Text>
                <Slider
                    style={{flex:1}}
                    maximumValue={20000}
                    minimumValue={1000}
                    step={1000}
                    value={1}
                    //onSlidingComplete={(value)=>this.setState({value:value})}
                    onValueChange={(value)=>this.setState({shenQingMoney:value})}
                    //thumbImage={require('./user.png')}
                />
                    <Text>20000</Text>
                </View>
                <Text style={{fontSize:16,color:'#333',marginLeft:50,marginBottom:20}}>还款期限</Text>
                <View style={styles.sliderMonth}>
                    <Text>1</Text>
                    <Slider
                        style={{flex:1}}
                        maximumValue={24}
                        minimumValue={1}
                        step={1}
                        value={1}
                        //onSlidingComplete={(value)=>this.setState({value:value})}
                        onValueChange={(value)=>this.setState({HuankuanMonth:value})}
                        //thumbImage={require('./user.png')}
                    />
                    <Text>24</Text>
                </View>
                <TouchableWithoutFeedback
                onPress={()=>{
                    const  navigate  = this.props.navigate;
                    navigate('ProductCenter')
                    //
                }}>
                <View style={{
                    borderRadius:20,
                    borderWidth:0.5,
                    borderColor:'#f00',
                    //width:ScreenWidth,
                    height:40,
                    alignItems:'center',
                    backgroundColor:'#f00',
                    justifyContent:'center',
                    marginRight:50,
                    marginLeft:50,
                    marginBottom:25
                   }}>
                    <Text style={styles.shenqing}>立即申请</Text>
                </View>
                </TouchableWithoutFeedback>
                <Swiper
                    height={150}
                    autoplay={true}
                    autoplayTimeout={2.5}>
                    {banners}
                </Swiper>

            </View>

        </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    image:{
        width:ScreenWidth,
        height:150
    },
    title: {
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: '#f00',
        paddingTop:30,
        paddingBottom:25,
        color:'#fff',
        fontSize:20
    },
    sliderMoney:{
        flexDirection:'row',
        height:90,
        marginLeft:50,marginRight:50,width:ScreenWidth *3/5,
        justifyContent:'center',
        alignItems:'center',
    } ,sliderMonth:{
        flexDirection:'row',
        height:70,
        justifyContent:'center',
        marginLeft:50,marginRight:50,width:ScreenWidth *3/5,
        //alignItems:'center',

    },
    shenqing:{
        //width:200,
       // height:40,
        fontSize:18,
        color:'#fff',
        textAlign:'center',
        //textAlignVertical:'center',
        //backgroundColor:'#f0f'


    }

});

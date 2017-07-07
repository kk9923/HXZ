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
import AllPage1 from './Allpage1'
import NewKouZi from './NewKouZi'
import ListViewPage from './ListView'
import ListViewPage2 from './ListView2'
import ScrollableTabView , {DefaultTabBar, }  from 'react-native-scrollable-tab-view';
export default class GXS extends Component {
    static navigationOptions = {
        title: '产品大全',
    };
    constructor(props) {
        super(props);
        this.state = {
             value:1,
        }
    };
    render() {


        return (
            <View style={{flex:1,backgroundColor:'#fff'}}>
                {/*<View style={styles.status}>*/}
                    {/*<Text style={styles.title}>产品大全</Text>*/}
                    {/*<TouchableWithoutFeedback*/}
                    {/*onPress={()=>{*/}
                        {/*this._handBack()*/}
                    {/*}}*/}
                    {/*>*/}
                    {/*<Image style={{width:18,height:18,resizeMode:'stretch', position:'absolute',left:20,top:25}} source={(require('./user.png'))}/>*/}
                    {/*</TouchableWithoutFeedback>*/}
                {/*</View>*/}
                <ScrollableTabView
                    style={{marginTop: 0, }}
                    renderTabBar={() => <DefaultTabBar />}
                    tabBarActiveTextColor='#f00'
                    tabBarTextStyle={{fontSize:17,alignItems:'center',justifyContent:'center'}}
                    tabBarUnderlineStyle={{backgroundColor:'#f00',height:2,alignItems:'center',justifyContent:'center'}}
                >
                    {/*<AllPage tabLabel='全部'/>
                     <ListViewPage2 tabLabel='全部1'/>
                     <ListViewPage tabLabel='全部2'/>
                    */}
                    <AllPage1 tabLabel='全部' navigate={this.props.navigation.navigate} />
                    <NewKouZi tabLabel='新口子' navigate={this.props.navigation.navigate} />
                </ScrollableTabView>

            </View>

        );
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

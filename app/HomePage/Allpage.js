/**
 * Created by xiakai on 2017/7/5.
 */
'use strict';
import React, {Component} from 'react';
import {Text, StyleSheet, Image,ListView,AlertIOS,View} from 'react-native';
import PullRefreshScrollView from 'react-native-pullrefresh-scrollview';
import JsonUtils from '../utils/JsonUtil'
export default class TabBar extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(['row 1', 'row 2','row 1', 'row 2','row 1', 'row 2','row 1', 'row 2','row 1', 'row 2','row 1', 'row 2','row 1', 'row 2','row 1', 'row 2','row 1', 'row 2','row 1', 'row 2','row 1', 'row 2','row 1', 'row 2',]),
            page:1
        };
    }
//发起网络请求，获取数据
    componentDidMount() {
        this.getBannerList()
    }

    /**
     * 首页广告banner
     */
    getBannerList(){
        const map2 = new Map().set('apiVersion', '1.3.0').set('appCode','HXK1.3.0').set('appName','43').set('channel','ios').set('flag','').set('loanType','').set('orderBy','1').set('page',this.state.page).set('pageSize','10')
            .set('version','1.3.0').set('key','fEBRtWCX5PDFpJazDqZgHLgGPz0rdaSVf8/reeHkExkumh98/fEsiurXyaOnSKd3qwZ1btuDuJ0FXhsYE5PTtUxdblAmKHPXUUp4iatLPTA3FkreRMhVJRNn3Ba9cn/TdIEYWsaMLRPorsfHznMozRY4ViKNAzFn');
        const json = JsonUtils.mapToJson(map2)
        const url = 'https://jk.suyijia.com/loan/i/loan/getLoanList';
        fetch(url, {
            method: 'POST',      //请求方式
            body: json
        })
            .then((response) => response.json())
            .then((responseJson) => {
                //AlertIOS.alert(''+responseJson.code)
                if('1'===responseJson.code){
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(responseJson.rows)
                   });
                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        return (
            <ListView
                renderScrollComponent={(props) => <PullRefreshScrollView
                    onLoadMore={(PullRefresh)=>this.onLoadMore(PullRefresh)} {...props}

                    useLoadMore={true}
                    onRefresh={(PullRefresh)=>this.onRefresh(PullRefresh)} {...props}/>
                }
                dataSource={this.state.dataSource}
                renderRow={this._renderRow }
            />
        );
    }
    _renderRow(rowData){
       // AlertIOS.alert((rowData.loanLabelList[0].name)+'')
        // if(rowData.loanLabelList.length>0){
        // for(let i =0 ; i < rowData.loanLabelList.length;i++){
        //     const  item  = rowData.loanLabelList[i];
        //     loanLabelList.push(
        //         <Text key={i}>{item.name}</Text>
        //     )
        //  }
        // }
        return(
        <View>
            <View style={{height:12,backgroundColor:'#efefef'}}/>
            <View style={styles.listViewItem}>
                <Image style={styles.image} source={{uri:'https://www.baidu.com/img/bd_logo1.png'}}></Image>
                <View>
                    <Text style={styles.title}>{rowData.title}</Text>
                    <Text style={styles.content}>{rowData.content}</Text>
                </View>
            </View>
            <View style={styles.line}/>
            <View style={{flexDirection:'row',paddingTop:10,paddingBottom:10,alignItems:'center'}}>
                {/*{loanLabelList}*/}
                <Text>成功申请</Text>
                <View style={{flexDirection:'row',position:'absolute',right:12}}>
                <Text>成功申请</Text>
                <Text style={styles.peopleNumber}>{rowData.peopleNumber}</Text>
                <Text>人</Text>
                </View>
            </View>
        </View>

        )
    }
    onRefresh(PullRefresh){
        PullRefresh.onRefreshEnd();
    }
    onLoadMore(PullRefresh){
        PullRefresh.onLoadMoreEnd()
    }
    componentWillMount() {

    }
}

const styles = StyleSheet.create({
    listViewItem: {
        paddingLeft:15,
        paddingTop:15,
       // height: 85,
        //alignItems: 'center',
        //justifyContent: 'center',
        //backgroundColor: '#f0f',
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
    }


});
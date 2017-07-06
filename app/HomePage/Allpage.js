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
    let dataList = [];
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataList : dataList,
            dataSource:new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
          //  dataSource: ds.cloneWithRows(['row 1', 'row 2','row 1', 'row 2','row 1', 'row 2','row 1', 'row 2','row 1', 'row 2','row 1', 'row 2','row 1', 'row 2','row 1', 'row 2','row 1', 'row 2','row 1', 'row 2','row 1', 'row 2','row 1', 'row 2',]),
            page:1
        };
    }
//发起网络请求，获取数据
    componentDidMount() {
        this.getLoanLists()
    }
    /**
     * 请求网络
     */
    getLoanLists(){
        const map2 = new Map().set('apiVersion', '1.3.0').set('appCode','HXK1.3.0').set('appName','43').set('channel','ios').set('flag','').set('loanType','').set('orderBy','1').set('page','1').set('pageSize','10')
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


                    for(let  i = 0 ; i <= responseJson.rows.length;i++){
                        this.state.dataList.push(responseJson.rows[i]);
                        //tempDataSources.concat(this.state.dataSource);
                        // }

                    }
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(responseJson.rows),
                        //page:page
                    });

                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    /**
     * 请求网络
     */
    getLoanList(isRefresh,page,PullRefresh){
        AlertIOS.alert('shuaixn shuju=  ' +page)
        const map2 = new Map().set('apiVersion', '1.3.0').set('appCode','HXK1.3.0').set('appName','43').set('channel','ios').set('flag','').set('loanType','').set('orderBy','1').set('page',page).set('pageSize','10')
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
                    //if(!isRefresh){
                     //   this.setState({
                     //       dataSource: this.state.dataSource.cloneWithRows(responseJson.rows),
                     //       page:page
                    //    });
                    //        this.dataList = responseJson.rows
//
                    //    PullRefresh.onRefreshEnd();
                 //   }else {
                        const  datas = responseJson.rows;
                       // AlertIOS.alert(''+datas[0].content)
                       // var  tempDataSources = this.state.dataSource;
                        for(let  i = 0 ; i <= datas.length;i++){
                            this.state.dataList.push(datas[i]);
                            //tempDataSources.concat(this.state.dataSource);
                        }
                       // for(let  i = 0 ; i <= this.state.dataSource.length;i++){
                        //    this.state.dataList.push(this.state.dataSource[i]);
                            //tempDataSources.concat(this.state.dataSource);
                       // }
                       // this.state.dataList.concat(this.state.dataSource)
                        //AlertIOS.alert('a3=   '+this.state.dataSource.length)
                        this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(this.state.dataList),
                            page:page
                        });
                    if(!isRefresh){
                        PullRefresh.onRefreshEnd();
                    }else {
                        PullRefresh.onLoadMoreEnd()
                    }

                   // }


                }

            })
            .catch((error) => {
                console.error(error);
            });
    }
    render() {
        if (this.state.dataSource.length <= 0){
            return (
                <Text>正在加载</Text>
            )
        }else {
            return (
                <ListView
                    renderScrollComponent={(props) => <PullRefreshScrollView
                        onLoadMore={(PullRefresh)=>this.onLoadMore(PullRefresh)} {...props}

                        useLoadMore={1}
                        onRefresh={(PullRefresh)=>this.onRefresh(PullRefresh)} {...props}/>
                    }
                    renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} style={styles.separator} />}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow }
                />
            );
        }

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
                <Image style={styles.image} resizeMode='stretch' source={{uri:'https://www.baidu.com/img/bd_logo1.png'}}></Image>
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
        this.getLoanList(false,1,PullRefresh)

    }
    onLoadMore(PullRefresh){
        const  page = this.state.page +1;
        this.getLoanList(true,page,PullRefresh)

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
        //backgroundColor: '#f0f',ddddddddd
        flexDirection:'row'
    },
    separator: {
        height: 1,
        backgroundColor: '#CCCCCC',
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
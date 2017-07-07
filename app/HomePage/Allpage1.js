/**
 * Created by 31716 on 2017/6/19.
 */
import React, {Component} from 'react';
import {
    View, Text, StyleSheet, ListView, ToastAndroid, TouchableNativeFeedback, Image, ScrollView,TouchableOpacity,
    Dimensions,
    RefreshControl,
    StatusBar,
    Alert,
    ActivityIndicator,
    ProgressBarAndroid,
    Platform
} from 'react-native';
const ScreenWidth = Dimensions.get('window').width/3;
import JsonUtils from '../utils/JsonUtil'
import  ProductDetail from './ProductDetail'
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview'
export default class HomePage extends Component {
    constructor(props) {
        super(props);
        let dataList = []
        this.defaultIndex = 0;
        this.state = {
            data: null,
            dataList: dataList,
            bannerSource:dataList,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            refreshing: true,
            pageNum: 1,
            currentCount:0,
            totalCount:1,
        };
    }

    //发起网络请求，获取数据
    componentDidMount() {
        this.getLoanLists(false)
    }
    /**
     * 请求网络
     */
    getLoanLists(booble){
        const map2 = new Map().set('apiVersion', '1.3.0').set('appCode','HXK1.3.0').set('appName','43').set('channel','ios').set('flag','').set('loanType','').set('orderBy','1').set('page',this.state.pageNum).set('pageSize','10')
            .set('version','1.3.0').set('key','fEBRtWCX5PDFpJazDqZgHLgGPz0rdaSVf8/reeHkExkumh98/fEsiurXyaOnSKd3qwZ1btuDuJ0FXhsYE5PTtUxdblAmKHPXUUp4iatLPTA3FkreRMhVJRNn3Ba9cn/TdIEYWsaMLRPorsfHznMozRY4ViKNAzFn');
        const json = JsonUtils.mapToJson(map2)
        const url = 'https://jk.suyijia.com/loan/i/loan/getLoanList';
        fetch(url, {
            method: 'POST',      //请求方式
            body: json
        })
            .then((response) => response.json())
            .then((responseJson) => {
                if('1'===responseJson.code){
                    const  data = responseJson.rows;
                    if(! booble){
                        this.state.dataList= [];
                    }
                    for (let i=0; i < data.length; i++) {
                        this.state.dataList.push( data[i] );
                    }
                    this.setState({
                        dataSource: this.state.dataSource.cloneWithRows(this.state.dataList),
                        pageNum:this.state.pageNum +1,
                        refreshing:false,
                        totalCount:responseJson.total
                    });
                    if (!booble){                                           //第一次进入和下啦刷新
                        this._pullToRefreshListView.endRefresh()
                        this.setState({
                            currentCount:data.length,
                        });
                    }else {
                        this.setState({
                            currentCount:data.length+this.state.currentCount,
                        });

                        this._pullToRefreshListView.endLoadMore(this.state.currentCount >= this.state.totalCount)
                    }

                    //this.setState({
                   //     dataSource: this.state.dataSource.cloneWithRows(responseJson.rows),
                  //      refreshing: false,
                  //  });

                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    //Using ListView
    render() {
        const  isLoading = this.state.refreshing;
        if(isLoading){
            return (
                <Text style={styles.containers}>
                    正在加载数据.....
                </Text>
            );
        }
        return (

                <PullToRefreshListView
                    style={{flex: 1}}
                    ref={ (component) => this._pullToRefreshListView = component }
                    viewType={PullToRefreshListView.constants.viewType.listView}
                    // contentContainerStyle={{backgroundColor: 'yellow', }}
                    //style={{marginTop: Platform.OS == 'ios' ? 64 : 56, }}
                    // initialListSize={20}
                    enableEmptySections={true}
                    enabledPullUp={true}
                    //  enabledPullDown={false}
                    dataSource={this.state.dataSource}
                    pageSize={20}
                    renderRow={this._renderItem.bind(this)}
                    renderHeader={this._renderHeader}
                    renderFooter={this._renderFooter}
                    //renderSeparator={(sectionID, rowID) => <View style={styles.separator} />}
                    onRefresh={this._onRefresh}
                    onLoadMore={this._onLoadMore}
                    pullUpDistance={35}
                    pullUpStayDistance={50}
                    pullDownDistance={35}
                    pullDownStayDistance={50}
                />
        )
    }


    /**
     * 下拉刷新的头布局
     * @param viewState
     * @returns {XML}
     * @private
     */
    _renderHeader = (viewState) => {
        let {pullState, pullDistancePercent} = viewState
        let {refresh_none, refresh_idle, will_refresh, refreshing,} = PullToRefreshListView.constants.viewState
        pullDistancePercent = Math.round(pullDistancePercent * 100)
        switch (pullState) {
            case refresh_none:
                return (            //backgroundColor: 'pink',
                    <View style={{justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={{height: 35}}>下拉刷新</Text>
                    </View>
                )
            case refresh_idle:
                return (
                    <View style={{justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={{height: 35}}>下拉刷新{pullDistancePercent}%</Text>
                    </View>
                )
            case will_refresh:
                return (
                    <View style={{justifyContent: 'center', alignItems: 'center',}}>
                        <Text style={{height: 35}}>松手刷新{pullDistancePercent > 100 ? 100 : pullDistancePercent}%</Text>
                    </View>
                )
            case refreshing:
                return (            // flexDirection: 'row',
                    <View style={{height: 35, justifyContent: 'center', alignItems: 'center',}}>
                        {this._renderActivityIndicator()}<Text style={{height: 35}}>正在刷新</Text>
                    </View>
                )
        }
    }
    /**
     * 上啦加载更多的尾布局
     * @param viewState
     * @returns {XML}
     * @private
     */
    _renderFooter = (viewState) => {
        let {pullState, pullDistancePercent} = viewState
        let {load_more_none, load_more_idle, will_load_more, loading_more, loaded_all,} = PullToRefreshListView.constants.viewState
        pullDistancePercent = Math.round(pullDistancePercent * 100)
        switch (pullState) {
            case load_more_none:
                return (
                    <View
                        style={{height: 35, justifyContent: 'center', alignItems: 'center', }}>
                        <Text>pull up to load more</Text>
                    </View>
                )
            case load_more_idle:
                return (
                    <View    //backgroundColor: 'pink',
                        style={{height: 35, justifyContent: 'center', alignItems: 'center', }}>
                        <Text>pull up to load more{pullDistancePercent}%</Text>
                    </View>
                )
            case will_load_more:
                return (
                    <View   //backgroundColor: 'pink',
                        style={{height: 35, justifyContent: 'center', alignItems: 'center', }}>
                        <Text>release to load more{pullDistancePercent > 100 ? 100 : pullDistancePercent}%</Text>
                    </View>
                )
            case loading_more:
                return (
                    <View style={{
                        flexDirection: 'row',
                        height: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        //backgroundColor: 'pink',
                    }}>
                        {this._renderActivityIndicator()}<Text>loading</Text>
                    </View>
                )
            case loaded_all:
                return (
                    <View      //backgroundColor: 'pink',
                        style={{height: 35, justifyContent: 'center', alignItems: 'center', }}>
                        <Text>已全部加载完毕</Text>
                    </View>
                )
        }
    }
    /**
     * 下拉刷新的方法
     * @private
     */
    _onRefresh = () => {
        this.setState({
            pageNum: 1
        })
        this.getLoanLists(false)
    }
    /**
     * 加载更多的方法
     * @private
     */
    _onLoadMore = () => {
        this.getLoanLists(true)
    }

    _renderActivityIndicator() {
        return ActivityIndicator ? (
            <ActivityIndicator
                style={{marginRight: 10,}}
                animating={true}
                color={'#ff0000'}
                size={'small'}/>
        ) : Platform.OS == 'android' ?
            (
                <ProgressBarAndroid
                    style={{marginRight: 10,}}
                    color={'#ff0000'}
                    styleAttr={'Small'}/>

            ) : (
                <ActivityIndicatorIOS
                    style={{marginRight: 10,}}
                    animating={true}
                    color={'#ff0000'}
                    size={'small'}/>
            )
    }

    /**
     * listview 的 Item
     * @param rowData
     * @param sectionID
     * @param rowID
     * @param highlightRow
     * @returns {XML}
     * @private
     */
    _renderItem(rowData, sectionID, rowID, highlightRow) {
        return (
            <TouchableOpacity
                  onPress={this._itemClickCallback.bind(this, rowData)}
            >
                {this._renderItemContent(rowData)}
            </TouchableOpacity>
        );
    }

    /**
     * listview  的 item  点击事件
     * @param rowData
     * @private
     */
    _itemClickCallback(rowData) {
        const  id  = rowData.id;
        const  navigate  = this.props.navigate;
        navigate('ProductDetail', { id: ''+id })

    }


    /**
     * Listview  的item 具体内容
     * @param rowData
     * @returns {XML}
     * @private
     */
    _renderItemContent(rowData) {
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

})

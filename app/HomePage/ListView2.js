/**
 * Created by xiakai on 2017/7/6.
 */
'use strict';
import React, {Component} from 'react';
import {Text, StyleSheet, Image,View,Dimensions} from 'react-native';

var RefreshableListView = require('react-native-sk-refreshable-listview');
var {width, height} = Dimensions.get('window');
var dataUrl = 'https://raw.githubusercontent.com/shigebeyond/react-native-sk-refreshable-listview/master/test.json';
var data = [
    {id: 1, text: 'row 1'},
    {id: 2, text: 'row 2'},
    {id: 3, text: 'row 3'},
    {id: 4, text: 'row 4'},
    {id: 5, text: 'row 5'},
    {id: 6, text: 'row 6'},
    {id: 7, text: 'row 7'},
    {id: 8, text: 'row 8'},
    {id: 9, text: 'row 9'},
    {id: 10, text: 'row 10'},
];
// simulate fetch()
function skFetch(url){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, 1000)
    });
}
export default class TabBar extends Component {
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            dataSource : new RefreshableListView.DataSource({rowHasChanged : (row1, row2) =>  row1 !== row2}),
        }
    }

    componentDidMount() {
        this.fetchData(true);
    }

    /**
     * load data
     * @param bool refresh: whether to refresh data, or load more data
     * @return Promise
     */
    fetchData(refresh){
        if(refresh){
            this.nextPage = 1;
        }
        // get the data url of next page
        var nextDataUrl = dataUrl + '?page=' + this.nextPage;
        // I use skFetch() to simulate fetch()
        return skFetch(nextDataUrl)
            .then((result) => {
                var newRows;
                if(refresh){ // set rows of dataSource
                    newRows = result;
                }else{// add new rows into dataSource
                    newRows = this.getRows().concat(result);
                }
                var newDataSource = this.state.dataSource.cloneWithRows(newRows);
                this.setState({
                    dataSource: newDataSource,
                });
                this.nextPage++;
            }).catch((e)=>{
                console.log(e);
            });
        //.done();
    }

    // get all rows of dataSource
    getRows() {
        var result = this.state.dataSource && this.state.dataSource._dataBlob && this.state.dataSource._dataBlob.s1;
        return result ? result : [];
    }

    // whether no row in dataSource
    isEmpty(){
        return this.getRows().length == 0;
    }

    renderRow(row) {
        return (
            <View style={styles.row} >
                <Text>{row.text}</Text>
            </View>
        );
    }

    render() {
        if(this.isEmpty()){
            return (
                <View style={styles.emptyBox}>
                    <Text style={styles.emptyTxt}>{'Please pull down to fresh data, \n pull up to load more data'}</Text>
                </View>
            )
        }
        return (
            <RefreshableListView
                style={styles.container}
                dataSource={this.state.dataSource} // set dataSource
                onRefresh={() => this.fetchData(true)} // callback to refresh data (load first page of data), which should return a Promise, I use this promise to tell when to stop loading (render loading view).
                onLoadMore={() => this.fetchData(false)} // callback to load more data (load next page of data), which should return a Promise, I use this promise to tell when to stop loading (render loading view)
                showLoadMore={true}
                renderRow={this.renderRow}
            />
        );
    }
}

const styles = StyleSheet.create({
    emptyBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyTxt: {
        fontSize: 23,
        fontWeight: 'bold'
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    row: {
        padding: 10,
        height: height / 10,
        backgroundColor: 'yellow',
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
    },


});
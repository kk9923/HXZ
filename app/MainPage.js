/**
 * Created by 31716 on 2017/6/15.
 */
'use strict';
import React, {Component} from 'react';
import {Text, StyleSheet, Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import HomeFragment from  '../app/HomePage/HomeFragment'
import UserFragment from  '../app/UserPage/UserFragment'
export default class TabBar extends Component {
    static defaultProps = {
        selectedColor: '#00ff00',
        //selectedColor: '#f00',
        normalColor: '#a9a9a9'
    };
    constructor(props){
        super(props);
        this.state = {
            selectedTab: 'home',
            tabName: ['好下款','我的'],

        }
    }
    render(){
        const {selectedColor} = this.props; // 将 props定义的 selectedColor赋值给{selectedColor}中的selectedColor
        const {tabName} = this.state;   // 将 state中的集合tabName赋值给   {tabName}  中的 tabName
        return(
            <TabNavigator
                tabBarStyle={styles.tabbar}
                sceneStyle={{ paddingBottom: styles.tabbar.height }}>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[0]}
                    selected={this.state.selectedTab === 'home'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab}  resizeMode="stretch" source={require('../image/home.png')}  />}
                    renderSelectedIcon={() => <Image style={styles.tab} resizeMode="stretch"   source={require('../image/home_select.png')} />}
                    onPress={() => this.setState({ selectedTab: 'home' })}>
                    {<HomeFragment navigator={this.props.navigator}/>}

                </TabNavigator.Item>
                <TabNavigator.Item
                    tabStyle={styles.tabStyle}
                    title={tabName[1]}
                    selected={this.state.selectedTab === 'me'}
                    selectedTitleStyle={{color: selectedColor}}
                    renderIcon={() => <Image style={styles.tab}  resizeMode="stretch" source={require('../image/user.png')}  />}
                    renderSelectedIcon={() => <Image style={styles.tab} resizeMode="stretch"  source={require('../image/user_select.png')}  />}
                    onPress={() => this.setState({ selectedTab: 'me' })}>
                    {<UserFragment navigator={this.props.navigator}/>}

                </TabNavigator.Item>
            </TabNavigator>
        );
    }

    componentWillMount() {

    }
}

const styles = StyleSheet.create({
    tabbar: {
        height: 50,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9'
    },
    tabStyle:{
        // padding: px2dp(
        alignItems:'center'
    },
    tab: {
        width: 25,
        height: 25,
    }
});

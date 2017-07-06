/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {Navigator} from 'react-native-deprecated-custom-components';
import MainPage from './app/MainPage';
import ProductCenter from './app/HomePage/ProductCenter';
import ProductDetail from './app/HomePage/ProductDetail';
import { StackNavigator } from 'react-navigation';
export default class HXZ extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    };
    render() {
        return (
            <Navigator
                initialRoute={{component: MainPage}}
                renderScene={(route, navigator) => {
                    return <route.component navigator={navigator} {...route.args}/>
                }
                }/>
        );
    }
}

const SimpleApp = StackNavigator({
    Home: { screen: MainPage },
    ProductCenter: { screen: ProductCenter },
    ProductDetail: { screen: ProductDetail },
});
AppRegistry.registerComponent('HXZ', () => SimpleApp);
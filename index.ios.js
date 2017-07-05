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


AppRegistry.registerComponent('HXZ', () => HXZ);
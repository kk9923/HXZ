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
import MainPage from './app/MainPage';
import ProductCenter from './app/HomePage/ProductCenter';
import ProductDetail from './app/HomePage/ProductDetail';
import NowApply from './app/HomePage/NowApply';
import ApplyJiLU from './app/UserPage/ApplyJiLU';
import Setting from './app/UserPage/Setting';
import { StackNavigator } from 'react-navigation';

const SimpleApp = StackNavigator({
    Home: { screen: MainPage },
    ProductCenter: { screen: ProductCenter },
    ProductDetail: { screen: ProductDetail },
    NowApply: { screen: NowApply },
    ApplyJiLU: { screen: ApplyJiLU },
    Setting: { screen: Setting },
});
AppRegistry.registerComponent('HXZ', () => SimpleApp);
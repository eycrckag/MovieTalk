'use strict';

import React from 'react';
import {
  View,
  Text,
  Navigator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import styles from '../styles/main';
import MovieList from './MovieList';
import navStyle from '../styles/nav';
import UsBox from './UsBox';
import Search from './Search';



// 导航栏的Mapper
var NavigationBarRouteMapper = {
  // 左键
  LeftButton(route, navigator, index, navState) {
    if (index > 0) {
      return (
        <View >
          <TouchableOpacity
            underlayColor='transparent'
            onPress={() => {if (index > 0) {navigator.pop()}}}>
            <Text style={navStyle.leftNavButtonText}>
              后退
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  },
  // 右键
  RightButton(route, navigator, index, navState) {
    if (route.onPress)
      return (
        <View style={navStyle.navContainer}>
          <TouchableOpacity
            onPress={() => route.onPress()}>
            <Text style={navStyle.rightNavButtonText}>
              {route.rightText || '右键'}
            </Text>
          </TouchableOpacity>
        </View>
      );
  },
  // 标题
  Title(route, navigator, index, navState) {
    return (
        <View style={navStyle.titleContainer}>
          <Text style={navStyle.title}>
            {route.name}
          </Text>
        </View>
    );
  }
};
class Featured extends React.Component {

  constructor(props){
    super(props);

  }

  /**
   * 使用动态页面加载
   * @param route 路由
   * @param navigator 导航器
   * @returns {XML} 页面
   */
  renderScene(route, navigator) {
    return <route.component navigator={navigator}  {...route.passProps} />;
  }

  //场景动画
  /*
  configureScene(route, routeStack) {
    if (route.type == 'Modal') {
      return Navigator.SceneConfigs.FloatFromBottom;
    }
    return Navigator.SceneConfigs.PushFromRight;
  }
  */

  // 选择控件
  ChooseComponent(){
    if(this.props.TabContent == 'MovieList')
      return MovieList;
    else if (this.props.TabContent == 'UsBox') {
      return UsBox;
    }else if (this.props.TabContent == 'Search') {
      return Search;
    }
  }

  render() {
    return (
      <Navigator
        style={{flex:1}}
        initialRoute={{name: this.props.tabName, component: this.ChooseComponent()}}
        // configureScene={this.configureScene}
        renderScene={this.renderScene}
        navigationBar={
          <Navigator.NavigationBar
            style={navStyle.navContainer}
            routeMapper={NavigationBarRouteMapper}/>}
        />

    );
  }
}

export { Featured as default };

'use strict';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  ListView,
} from 'react-native';
import styles from './app/styles/main';
import MovieList from './app/component/MovieList';
import UsBox from './app/component/UsBox';
import TabNavigator from 'react-native-tab-navigator';
import icons from './app/assets/Icons';
import Featured from './app/component/Featured';


class MovieTalk extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectTab:'Home',
    }
  }

  onPress(tabName){
    if(tabName){
      this.setState({
        selectTab:tabName,
      });
    }
  }


  //选择使用哪个空间
  ChooseComponent(TabContent){

    if(TabContent == 'MovieList'){
      return (<Featured TabContent='MovieList' tabName='推荐电影'/>);
    }else if (TabContent == 'UsBox') {
      return (<Featured TabContent={TabContent} tabName='北美票房'/>);
    }else if (TabContent == 'Search'){
      return (<Featured TabContent={TabContent} tabName='搜索'/>);
    }
  }

  renderTabView(title,TabName,TabContent){
    var renderIconUrl ;
    var renderSelectedIconUrl ;
    switch (TabName) {
      case 'Home':
        renderIconUrl = icons.star;
        renderSelectedIconUrl = icons.starActive;
        break;
      case 'UsBox':
          renderIconUrl = icons.board;
          renderSelectedIconUrl = icons.boardActive;
          break;
      case 'Search':
          renderIconUrl = icons.search;
          renderSelectedIconUrl = icons.search;
          break;
      case 'About':
          renderIconUrl = './images/tabbar4.png';
          renderSelectedIconUrl = './images/tabbar4_press.png';
          break;
    }

    return (
      <TabNavigator.Item
        title={title}
        selected = {this.state.selectTab === TabName}
        renderIcon={() => <Image style={[styles.tabIcon,{tintColor:'#ccc'}]} source={{uri:renderIconUrl}}  />}
        renderSelectedIcon={() => <Image style={[styles.tabIcon,{tintColor:'white'}]} source={{uri:renderSelectedIconUrl}} />}
        selectedTitleStyle={{color:'#fff'}}
        titleStyle={{color:'#ccc',marginTop:0}}
        onPress={()=>this.onPress(TabName)}
        >
        {this.ChooseComponent(TabContent)}
      </TabNavigator.Item>
    );
  }

  render() {
    return (
      // <MovieList></MovieList>

      <TabNavigator  tabBarStyle={styles.tab}   hidesTabTouch={false} >
        {this.renderTabView('推荐电影','Home','MovieList')}
        {this.renderTabView('北美票房','UsBox','UsBox')}
        {this.renderTabView('搜索','Search','Search')}

        {/* {this.renderTabView('Featured','Featured','Featured')} */}


      </TabNavigator>
    );
  }
}



AppRegistry.registerComponent('MovieTalk', () => MovieTalk);

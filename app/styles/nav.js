'use strict';

import {StyleSheet } from 'react-native';

let navStyle = StyleSheet.create({
  // 导航栏
  navContainer: {
    backgroundColor: 'rgb(72,61,139)',
    alignItems:'center',
    justifyContent:'center',
    height:45,
    opacity:0.8,
  },

  // 导航栏文字
  headText: {
    color: '#ffffff',
    fontSize: 22
  },
  // 按钮
  button: {
    height: 60,
    marginTop: 10,
    justifyContent: 'center', // 内容居中显示
    backgroundColor: '#ff1049',
    alignItems: 'center'
  },
  // 按钮文字
  buttonText: {
    fontSize: 18,
    color: '#ffffff'
  },
  // 左面导航按钮
  leftNavButtonText: {
    color: '#ffffff',
    fontSize: 18,
    marginLeft: 13,
    marginTop:10

  },
  // 右面导航按钮
  rightNavButtonText: {
    color: '#ffffff',
    fontSize: 18,
    marginRight: 13
  },
  // 标题
  title: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    paddingTop:22,
  },
  titleContainer:{
    alignItems:'center',
    justifyContent:'center',
    width:220
  }
});

export { navStyle as default};

'use strict';

import {StyleSheet} from 'react-native';

let styles = StyleSheet.create({
  delete:{
    width:16,
    height:16,
    marginLeft:10,
    paddingTop:2,
    marginTop:4,
    opacity:0.8,
    tintColor:'red',
  },
  searchHistoryHeader:{
    fontSize:17,
    color:'rgba(0,0,0,0.8)',
    marginLeft:6,
    marginTop:15,
    marginBottom:20,
  },
  item:{
    flexDirection:'row',
    borderBottomWidth:1,
    borderColor:'rgba(100,53,201,0.1)',
    paddingBottom:6,
    paddingTop:6,

  },
  itemContent:{
    marginLeft:10,
    flex:1,
  },
  itemHeader:{
    fontSize:16,
    fontWeight:'300',
    color:'#6435c9',
    fontFamily:'Helvetial Neue',
    marginBottom:6,
    padding:0,
  },
  itemMeta:{
    fontSize:16,
    color:'rgba(0,0,0,0.6)',
    marginBottom:6,
  },
  redText:{
    color:'#db2828',
    fontSize:15,
  },
  itemImage:{
    width:78,
    height:110,
  },
  itemText:{
    fontSize:16,
    fontWeight:'300',
    fontFamily:'Helvetial Neue',
    lineHeight:26,
    color:'rgba(0,0,0,0.8)',
  },
  image:{
    width:78,
    height:108,

  },
  loading:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  tab:{
    height: 52,
    alignItems:'center',
    // backgroundColor:'#f4f5f6',
    backgroundColor:'darkslateblue',

  },
  tabIcon:{
    width:26,
    height:26,
  },

  container:{
    flex:1,
    backgroundColor:'#eae7ff',
    marginTop:44,
  }
});

export { styles as default}

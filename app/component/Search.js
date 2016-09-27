'use strict';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  ListView,
  TouchableHighlight,
  Image,
  AsyncStorage,

} from 'react-native';
import styles from '../styles/main';
import icons from '../assets/Icons';
import SearchResult from './SearchResult';

class Search extends React.Component {
  constructor(props) {
    super(props);

    // AsyncStorage.setItem('name','MovieTalk')
    //   .then(()=> {
    //     AsyncStorage.getItem('name')
    //       .then((value)=>{
    //         console.log(value)
    //       })
    //   });



    //搜索历史ListView
    this.dataSource = new ListView.DataSource({
      rowHasChanged:(row1,row2) => row1 !== row2
    });

    this.state = {
      query:'',
      loaded:false,
      searchHistory: [],
    }

    AsyncStorage.getItem('searchHistory')
      .then((searchHistory)=> {
        if(searchHistory){
          this.setState({
            searchHistory: JSON.parse(searchHistory)
          })
        }
      });
  }

  searchHistory() {
    let newSearchHistory = [...new Set([
      this.state.query,...this.state.searchHistory
    ])];
    this.setState({
      searchHistory:newSearchHistory,
    });
    console.log(JSON.stringify(newSearchHistory));

    AsyncStorage.setItem('searchHistory',JSON.stringify(newSearchHistory));
  }

  fetchData() {
    this.searchHistory()

    this.setState({
      loaded:!this.state.loaded,
    });
    const REQUEST_URL = `http://api.douban.com/v2/movie/search?q=${this.state.query}`;
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          loaded:!this.state.loaded,
        });
        this.props.navigator.push({
          component:SearchResult,
          passProps: {
            result: responseData.subjects
          },
          name:responseData.title,
        })

      })
      .done();
  }

  async search(item){
    try {
      await this.setState({
        query:item,
      });

      this.fetchData();
    } catch (error) {
      console.error(error);
    }

  }

  deleteSearchItem(item) {
    let newSearchHistoryItem = new Set(this.state.searchHistory);
    newSearchHistoryItem.delete(item);

    this.setState({
      searchHistory:[...newSearchHistoryItem],
    })

    AsyncStorage.setItem(
      'searchHistory',
      JSON.stringify([...newSearchHistoryItem])
    )
  }

  renderSearchHistoryListView(item) {
    return (
      <TouchableHighlight underlayColor="rgba(34,26,38,0.1)" onPress={()=>{ this.search(item)  }} >
        <View style={styles.item}>
          <TouchableHighlight
            underlayColor="rgba(34,26,38,0.1)"
            onPress={() => {this.deleteSearchItem(item)}}
          >
            <Image source={{uri:icons.clear}} style={styles.delete} />
          </TouchableHighlight>
          <View style={styles.itemContent}>
            <Text style={styles.itemHeader}>{item}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{paddingTop:0,paddingLeft:6,paddingRight:6,height:45,borderColor: 'rgba(100,53,201,0.1)', borderBottomWidth: 1}}>
          <TextInput
            value={this.state.query}
            style={{height: 45,fontSize:16, }}
            placeholder="搜索"
            underlineColorAndroid='transparent'
            onChangeText={(query) => {
              this.setState({
                query:query
              });
            }}
            onSubmitEditing={this.fetchData.bind(this)}
          />

          <ActivityIndicator
            animating={this.state.loaded}
            color = '#6435c9'
            size = 'small'
            style= {
              {
                position:'absolute',
                right:20,
                top:15
              }
            }
          />
        </View>
        <Text style={styles.searchHistoryHeader}>搜索历史</Text>
        <ListView
          dataSource={
            this.dataSource.cloneWithRows(this.state.searchHistory)
          }
          renderRow={this.renderSearchHistoryListView.bind(this)}
        />
      </View>
    );
  }
}

export { Search as default };

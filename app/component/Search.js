'use strict';

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles/main';
import SearchResult from './SearchResult';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      query:'',
      loaded:true
    }
  }

  fetchData() {
    this.setState({
      loaded:false,
    });
    const REQUEST_URL = `http://api.douban.com/v2/movie/search?q=${this.state.query}`;
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          loaded:true,
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

  render() {
    return (
      <View style={styles.container}>
        <View style={{paddingTop:0,paddingLeft:6,paddingRight:6,height:45,borderColor: 'rgba(100,53,201,0.1)', borderBottomWidth: 1}}>
          <TextInput
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
            color = '#6435c9'
            size = 'small'
            animating={!this.state.loaded}
            style= {
              {
                position:'absolute',
                right:20,
                top:15
              }
            }
          />
        </View>
      </View>
    );
  }
}

export { Search as default };

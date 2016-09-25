'use strict';

import React from 'react';

import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles/main';

class MovieDetail extends React.Component {
  constructor(props){
    super(props);

    // console.log(this.props.movie);
    this.state = {
      MovieDetail: '',
      loaded:true,
    };
    const REQUEST_URL = `https://api.douban.com/v2/movie/subject/${this.props.movie.id}`;
    this.fetchData(REQUEST_URL);
  }

  fetchData(REQUEST_URL){
    fetch(REQUEST_URL)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          MovieDetail: responseData,
          loaded:false,
        });
      })
      .done();

  }



  render() {
    if(this.state.loaded){
      return (
        <View style={styles.container}>
          <View style={styles.loading}>
          <ActivityIndicator
            color='#6435c9'
            size="large"
          />
          </View>
        </View>
      );
    }
    let MovieDetail = this.state.MovieDetail;
    let summary = MovieDetail.summary.split(/\n/).map(paragraph => {
      return (
        <View style={{marginBottom:15,paddingLeft:8,paddingRight:8}}>
          <Text style={styles.itemText}>{paragraph}</Text>
        </View>
      );
    })
    return (
      <View style={styles.container}>
        <View style={[styles.item,{flexDirection:'column'}]}>
          {summary}
        </View>
      </View>
    );
  }
}

export {MovieDetail as default};

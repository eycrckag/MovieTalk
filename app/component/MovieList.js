'use strict';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import {
  Text,
  View,
  Image,
  ListView,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import styles from '../styles/main';
import MovieDetail from './MovieDetail';

const REQUEST_URL = "https://api.douban.com/v2/movie/top250";
class MovieList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      movies: [],
      loaded: true,
      count:20,
      start:0,
      total:0,
    };

    this.REQUEST_URL = "https://api.douban.com/v2/movie/top250";
    this.dataSource = new ListView.DataSource({
      rowHasChanged:(row1,row2) => row1 !== row2
    });
    this.fetchData();
  }

  RequestUrl(url = this.REQUEST_URL,count = this.state.count,start = this.state.start){
    return (
      `${url}?start=${start}&count=${count}`
    );
  }

  fetchData() {
    fetch(this.RequestUrl())
      .then(response => response.json())
      .then(responseData => {
        let newStart = responseData.start + responseData.count ;
        this.setState({
          movies:responseData.subjects,
          loaded:false,
          total:responseData.total,
          start:newStart,
        });
      })
      .done();

  }

  showMovieDetail(movie){
    this.props.navigator.push({
      component:MovieDetail,
      type:'Model',
      passProps: {movie},
      name:movie.title,
    })
  }

  renderMovieList(movie){
    return (
      <TouchableHighlight underlayColor="rgba(34,26,38,0.1)" onPress={()=>{ this.showMovieDetail(movie) }} >
        <View style={styles.item}>
          <View style={styles.itemImage}>
            <Image source={{uri:movie.images.large}} style={styles.image}/>
          </View>
          <View style={styles.itemContent}>
            <Text style={styles.itemHeader}>{movie.title}</Text>
            <Text style={styles.itemMeta}>{movie.original_title} ({movie.year})</Text>
            <Text style={styles.redText}>{movie.rating.average}</Text>
          </View>
        </View>
      </TouchableHighlight>

    );
  }

  loadMore(){
    fetch(this.RequestUrl())
      .then(response => response.json())
      .then(responseData => {
        let newStart = responseData.start + responseData.count ;
        this.setState({
          movies:[...this.state.movies,...responseData.subjects],
          start:newStart,
        });
      })
      .done();
  }

  onEndReached() {
    console.log(`到底了 开始：${this.state.start}  , total:${this.state.total}`);

    if(this.state.total > this.state.start){
      this.loadMore()
    }
  }

  renderFooter() {
    if(this.state.total > this.state.start){
      return (
        <View style={
          { marginVertical:15,alignSelf:'center'}
        }>
          <ActivityIndicator
            color='#6435c9'
            size="small"
          />
        </View>
      );
    }else{
      return (
        <View style={
          { marginTop:10,marginBottom:10,alignSelf:'center'}
        }>
          <Text style={{color:'rgba(0,0,0,0.3)'}}>已经没有加载的内容了！</Text>
        </View>
      );
    }
  }

  render() {
    if(this.state.loaded){
      return (
        <View style={styles.container}>
          <View style={styles.loading}>
          <ActivityIndicator
            color='#6435c9'
            size="small"
          />
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <ListView  dataSource={this.dataSource.cloneWithRows(this.state.movies)}
          initialListSize={this.state.count}
          pageSize={this.state.count}
          renderFooter={this.renderFooter.bind(this)}
          onEndReachedThreshold={30}
          onEndReached={this.onEndReached.bind(this)}
          renderRow={this.renderMovieList.bind(this)}
        />
      </View>

    );
  }
}

export { MovieList as default};

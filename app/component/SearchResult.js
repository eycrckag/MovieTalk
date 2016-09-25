'use strict' ;


import React from 'react';
import {
  View,
  Text,
  ListView,
  TouchableHighlight,
  Image,
} from 'react-native';
import styles from '../styles/main';
import MovieDetail from './MovieDetail.js';

class SearchResult extends React.Component {

  constructor(props){
    super(props);
    console.log(this.props.result);

    //先定义一个listView,判断每一行的数据是否发生变化
    let dataSource = new ListView.DataSource({
      rowHasChanged:(row1,row2) => row1 !== row2
    });
    //
    // //设置状态，让搜索出来的结果放在listview
    this.state = {
      movies:dataSource.cloneWithRows(this.props.result)
    }
    console.log(this.state.movies);
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

  render() {
    return (
      <View style={styles.container}>
        <ListView  dataSource={this.state.movies}
          renderRow={this.renderMovieList.bind(this)}
        />
      </View>
    );
  }
}

export { SearchResult as default};

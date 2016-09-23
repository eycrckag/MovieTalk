# MovieTalk
React Native 做的 android版 MovieTalk

#### 所用到的组件

* TabNavigator  底部 tabbar
* ListView      垂直的滚动列表
* TouchableHighlight  点击高亮
* ActivityIndicator 加载时 相当于有一个加载进度条 
* Navigator     导航器，用于顶部

#### 做的时候遇到的坑

* navigator 导航器做导航栏 关于title 在导航栏不居中，
    * 我的解决方法是，给title添加一个width，让title在width中居中
* tintColor 可以设置tabbar中的image icon的颜色
* fetch 的使用方法，返回的是一个promise ，回调给参数进行数据的处理
* Navigator 的用法当时看了很久，[参考资料](https://github.com/SpikeKing/WclNavigator) 或者 [简书](http://www.jianshu.com/p/91fa0f34895e),[还有](http://bbs.reactnative.cn/topic/20/%E6%96%B0%E6%89%8B%E7%90%86%E8%A7%A3navigator%E7%9A%84%E6%95%99%E7%A8%8B)
* 关于在tabbar中选择的控件，同样在navigator中使用，也就是在底部点击北美票房的时候，顶部title显示相应的文字，并且，得到相应的json数据。
    * 我的做法是 navigator的initialRoute 中component 执行一个方法，让他根据属性值去选择控件


以上是个人的做法，如果有更好的方法，希望提一下

以下是一些作品的图片

<img src="images/1.png" width="200" height="300">    <img src="images/2.png" width="200" height="300">     <img src="images/3.png" width="200" height="300">




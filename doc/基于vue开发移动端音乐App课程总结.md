# 基于vue开发移动端音乐App课程总结
[toc]
##效果图
![Image text]![此处输入图片的描述][1] | ![此处输入图片的描述][2]| ![此处输入图片的描述][3] | ![此处输入图片的描述][4] | ![此处输入图片的描述][5] | ![此处输入图片的描述][6] | ![此处输入图片的描述][7] | ![此处输入图片的描述][8]
##vue知识点概述
###什么是vue.js
1. 采用自底向上增量开发设计轻量级MVVM框架
2. 数据驱动+组件化的前端框架

###vue.js的优势
1.Vue.js更轻量，gzip只有20k的大小。比其他两种框架小了一半还多
2.相较于其他前端框架，更易上手

###核心思想
1.数据驱动——双向绑定

> Vue是一种MVVM框架。而DOM是数据的一个种自然映射。传统的模式是通过Ajax请求从model请求数据，然后手动的触发DOM传入数据修改页面。Vue中，Directives对view进行了封装，当model里的数据发生变化是，Vue就会通过Directives指令去修改DOM。同时也通过DOM Listener实现对视图view的监听，当DOM改变时，就会被监听到，实现model的改变，实现数据的双向绑定。

![Image text]![此处输入图片的描述][9]


2.组件化

> 组件化实现了扩展HTML元素，封装可用的代码。页面上每个独立的可视/可交互区域视为一个组件；每个组件对应一个工程目录，组件所需要的各种资源在这个目录下就近维护；页面不过是组件的容器，组件可以嵌套自由组合形成完整的页面

![Image text]![此处输入图片的描述][10]


##vuex
###什么是vuex
1.官方说法：vuex是Vue.js应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化
2.个人理解：vuex是用来管理组件之间通信的一个插件，在项目结构较复杂，组件通信频繁时调用

###注册vuex
vuex一般有个入口文件index.js，用于注册vuex，实例化生成store，并导出store，eg：

    import Vue from 'vue'
    import Vuex from 'vuex'
    import * as actions from './actions'
    import * as getters from './getters'
    import mutations from './mutations'
    import state from './state'
    import createLogger from 'vuex/dist/logger'
    
    Vue.use(Vuex)
    
    const debug = process.env.NODE_ENV !== 'production'
    
    export default new Vuex.Store({
      actions,
      mutations,
      state,
      getters,
      strict: debug,
      plugins: debug ? [createLogger()] : []
    })

###核心概念
####**state**
负责存储整个应用的状态数据，一般需要在使用的时候在跟节点注入store对象，后期就可以使用this.$store.state直接获取状态，也可以利用vuex提供的mapState辅助函数将state映射到计算属性中去，eg：

    //我是组件
    import {mapState} from 'vuex'
    export default {
      computed: mapState({
        count: state => state.count
      })
    }

####**mutations（同步）**
本质就是用来处理数据的函数，其接收唯一参数值state，利用它可以更改状态，vuex提供辅助函数mapMutations直接将触发函数映射到methods上，这样就能在元素事件绑定上直接使用了，eg：

    import {mapMutations} from 'vuex'
    
    //我是一个组件
    export default {
      methods: mapMutations([
        'mutationName'
      ])
    }

####**actions**
actions也可以用于改变状态，mutations只能实现同步更改，但actions可以实现异步更改状态的操作， eg：

    //定义Actions
    const actions = {
      actionName({ commit }) {
        //dosomething
        commit('mutationName')
      }
    }
    
在组件中使用

    import {mapActions} from 'vuex'
    
    //我是一个组件
    export default {
      methods: mapActions([
        'actionName',
      ])
    }

####**getters**
相当于vuex中计算属性，对数据做二次处理，vuex提供辅助函数mapGetters将其映射到本地计算属性中去，eg：

    import {mapGetters} from 'vuex'
    
    //我是一个组件
    export default {
      computed: mapGetters([
        'strLength'
      ])
    }

###**Plugins插件**
插件就是一个钩子函数，在初始化store的时候引入即可。比较常用的是内置的logger插件，用于作为调试使用，eg：

    import createLogger from 'vuex/dist/logger'
    const store = Vuex.Store({
      ...
      plugins: [createLogger()]
    })
    
##**better-scroll**
###**什么是better-scroll**
better-scroll 是一款重点解决移动端各种滚动场景需求的插件，是基于原生 JS 实现的，不依赖任何框架，在[这里][11]可以详细学习better-scroll


###**滚动原理**
父容器固定高度，并设置属性overflow:hidden，使得子元素高度超出容器后能被隐藏，当我们的视口展示不下内容的时候，会通过滚动条的方式让用户滚动屏幕看到剩余的内容
![Image text]![此处输入图片的描述][12]

###**Options 参数**

>   - probeType
>  -  1 滚动的时候会派发scroll事件，会截流

>  -  2滚动的时候实时派发scroll事件，不会截流

>  -  3除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件

>   - click：true 是否派发click事件项

>   - snapLoop: false 是否可以无缝循环轮播

>   - 详见[better-scroll官方文档][13]

###**Events 事件**

>  - beforeScrollStart - 滚动开始之前触发

>  - scrollStart - 滚动开始时触发

>  - scroll - 滚动时触发

>  - scrollCancel - 取消滚动时触发

>  - scrollEnd - 滚动结束时触发

>  - touchend - 手指移开屏幕时触发

>  - flick - 触发了 fastclick 时的回调函数

>  - refresh - 当 better-scroll 刷新时触发

>  - destroy - 销毁 better-scroll 实例时触发


###**函数列表**

>   - scrollTo(x, y, time, easing)
>  - 滚动到某个位置，x,y 代表坐标，time 表示动画时间，easing 表示缓动函数 scroll.scrollTo(0, 500)

>   - scrollToElement(el, time, offsetX, offsetY, easing)
>  - 滚动到某个元素，el（必填）表示 dom 元素，time 表示动画时间，offsetX 和 offsetY 表示坐标偏移量，easing 表示缓动函数

>   - refresh()
>  - 强制 scroll 重新计算，当 better-scroll 中的元素发生变化的时候调用此方法

>   - getCurrentPage()
>  - snap 为 true 时，获取滚动的当前页，返回的对象结构为 {x, y, pageX, pageY}，其中 x,y 代表滚动横向和纵向的位置；pageX，pageY 表示横向和纵向的页面索引。用法如：getCurrentPage().pageX

>   - goToPage(x, y, time, easing)
>  - snap 为 true，滚动到对应的页面，x 表示横向页面索引，y 表示纵向页面索引， time 表示动画，easing 表示缓动函数（可省略不写）

>   - enable()
>  - 启用 better-scroll，默认开启

>   - disable()  
>  - 禁用 better-scroll

>   - destroy() 
>  - 销毁 better-scroll，解绑事件

 
 
  
 
###**vue碰见bette-scroll**
####**scroll 组件的抽象和封装**
利用vue的slot插槽，灵活指定scroll组件的DOM 结构，eg：

    <template>
      <div ref="wrapper">
        <slot></slot>
      </div>
    </template>
    
再进行js的编写(详见[此处][14]），eg：

    <script type="text/ecmascript-6">
      import BScroll from 'better-scroll'
    
      export default {
        props: {
          ...
        },
        mounted() {
          // 保证在DOM渲染完毕后初始化better-scroll
          setTimeout(() => {
            this._initScroll()
          }, 20)
        },
        methods: {
          _initScroll() {
            ...
            }
            ...
          }
        },
        watch: {
        
      }
    </script>


####**scroll组件的引用**
只需在其他组件import scroll 组件即可，并传入所需props

    <template>
    //scroll只作用于第一个子元素，即这里的ul
      <scroll class="wrapper"
              :data="data"
              :pulldown="pulldown"
              @pulldown="loadData">
        <ul class="content">
          <li v-for="item in data">{{item}}</li>
        </ul>
        <div class="loading-wrapper"></div>
      </scroll>
    </template>
    <script>
      import BScroll from './scroll'
      export default {
        data() {
          return {
            data: [],
            pulldown: true
          }
        }
      }
      
##**跨域请求音乐数据**
###**jsonp方式**
####**什么是jsonp**

> JSONP(JSON with Padding)是JSON的一种“使用模式”，可用于解决主流浏览器的跨域数据访问的问题

####为什么要用jsonp
由于同源策略，一般来说位于server1.example.com的网页无法与不是server1.example.com的服务器沟通，而 HTML 的<script> 元素是一个例外。

####**jsonp的原理**

> jsonp的核心则是动态添加<script>标签来调用服务器提供的js脚本，允许用户传递一个callback参数给服务端，然后服务端返回数据时会将这个callback参数作为函数名来包裹住JSON数据，这样客户端就可以随意定制自己的函数来自动处理返回数据了,eg:

    //jsonp的抽象与封装
    import originJSONP from 'jsonp'
    
    export default function jsonp(url, data, option) {
      url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
    
      return new Promise((resolve, reject) => {
        originJSONP(url, option, (err, data) => {
          if (!err) {
            resolve(data)
          } else {
            reject(err)
          }
        })
      })
    }
    
    function param(data) {
      let url = ''
      for (var i in data) {
        let value = data[i] !== undefined ? data[i] : ''
        url += `&${i}=${encodeURIComponent(value)}`
      }
      return url ? url.substring(1) : ''
    }
    
    //运用api获取推荐页数据的例子
    export function getRecommend() {
      const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'
      const data = Object.assign({}, commonParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
      })
      return jsonp(url, data, options)
    }
    

    
####**node的express**
####**Express概述**

> Express是目前最流行的基于Node.js的Web开发框架，可以快速地搭建一个完整功能的网站

####**Express原理**
[Express框架][15]建立在node.js内置的http模块上，等于在http模块之上，加了一个中间件处理HTTP请求的函数，向响应头里添加一些东西，干掉同源策略，eg：

    var app = express()
    
    var apiRoutes = express.Router()
    
    apiRoutes.get('/getDiscList', function (req, res) {
      var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
      axios.get(url, {
        headers: {
          referer: 'https://c.y.qq.com/',
          host: 'c.y.qq.com'
        },
        params: req.query
      }).then((response) => {
        res.json(response.data)
      }).catch((e) => {
        console.log(e)
      })
    })
    app.use('/api', apiRoutes)
    
    //运用express获取推荐列表的例子
    export function getDiscList() {
      const url = '/api/getDiscList'
    
      const data = Object.assign({}, commonParams, {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'
      })
    
      return axios.get(url, {
        params: data
      }).then((res) => {
        return Promise.resolve(res.data)
      })
    }


##**本地存储搜索历史**
1.安装依赖good-storage
2.

    import storage from 'good-storage'
    //运用storage.get获取本地缓存，运用storage.set创建缓存
    const SEARCH_KRY = '_search_'
    const SEARCH_MAX_LENGTH = 15
    
    const PLAY_KEY = '_play_'
    const PLAY_MAX_LENGTH = 200
    
    const FACORITE_KEY = '_favorite_'
    const FACORITE_MAX_LENGTH = 200
    //歌曲的插入
    function insertArray(arr, val, compare, maxLen) {
      const index = arr.findIndex(compare)
      if (index === 0) {
        return
      }
      if (index > 0) {
        arr.splice(index, 1)
      }
      arr.unshift(val)
      if (maxLen && arr.length > maxLen) {
        arr.pop()
      }
    }
    //歌曲的删除
    function deleteFromArray(arr, compare) {
      const index = arr.findIndex(compare)
      if (index > -1) {
        arr.splice(index, 1)
      }
    }
    //本地存储搜索结果
    export function saveSearch(query) {
      let searches = storage.get(SEARCH_KRY, [])
      insertArray(searches, query, (item) => {
        return item === query
      }, SEARCH_MAX_LENGTH)
      storage.set(SEARCH_KRY, searches)
      return searches
    }
    
    export function loadSearch() {
      return storage.get(SEARCH_KRY, [])
    }
    //本地删除搜索历史
    export function deleteSearch(query) {
      let searches = storage.get(SEARCH_KRY, [])
      deleteFromArray(searches, (item) => {
        return item === query
      })
      storage.set(SEARCH_KRY, searches)
      return searches
    }
    //清空所有历史
    export function clearSearch() {
      storage.remove(SEARCH_KRY)
      return []
    }
    
##**关闭移动端的点击延迟3秒**

    //在main.js引入fastclick实现
    import Vue from 'vue'
    import App from './App'
    import fastclick from 'fastclick'
    import router from './router'
    import VueLazyload from 'vue-lazyload'
    import store from './store'
    
    import 'common/stylus/index.styl'
    
    fastclick.attach(document.body)
    
    Vue.use(VueLazyload, {
      loading: require('common/image/default.png')
    })
    
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
    
##**图片懒加载**
  

     //在main.js引入VueLazyload实现,并注册
        import Vue from 'vue'
        import App from './App'
        import fastclick from 'fastclick'
        import router from './router'
        import VueLazyload from 'vue-lazyload'
        import store from './store'
        
        import 'common/stylus/index.styl'
        
        fastclick.attach(document.body)
        
        Vue.use(VueLazyload, {
          loading: require('common/image/default.png')
        })
        
        /* eslint-disable no-new */
        new Vue({
          el: '#app',
          router,
          store,
          render: h => h(App)
        })
        
##**lyric-parser解析歌词**
1.npm install lyric-parser
2.用法

     import Lyric from 'lyric-parser'
     let lyric = new Lyric(lyricStr, handler)
    
     function hanlder({lineNum, txt}){
         //使歌词滚动到当前播放的一句歌词
       this.currentLineNum = lineNum
        if (lineNum > 5) {
          let lineEl = this.$refs.lyricLine[lineNum - 5]
          this.$refs.lyricList.scrollToElement(lineEl, 1000)
        } else {
          this.$refs.lyricList.scrollTo(0, 0, 1000)
        }
        this.playingLyric = txt
     }
3.API

    //播放歌词
    play()
    
    //暂停歌词
    stop()
    
    //歌词跳转
    seek(startTime)
    
    //切换播放/暂停状态
    toggelePlay()
        
##个人体会
在这个项目中，体会很深的有以下几点

 1. 运用vuex，进行便捷的组件通信
 
 2. 引入better-scroll插件，实现各种强大的滚动效果
 
 3. 将复用性较强的code抽象和封装，减少代码量，优化性能
 
 4. 利用jsonp和node的express框架跨域抓取音乐数据


  [1]: http://otn4yvz23.bkt.clouddn.com/QQ%E5%9B%BE%E7%89%8720171011211330.jpg
  [2]: http://otn4yvz23.bkt.clouddn.com/QQ%E5%9B%BE%E7%89%8720171011212024.png
  [3]: http://otn4yvz23.bkt.clouddn.com/QQ%E5%9B%BE%E7%89%8720171011212020.png
  [4]: http://otn4yvz23.bkt.clouddn.com/QQ%E5%9B%BE%E7%89%8720171011212014.png
  [5]: http://otn4yvz23.bkt.clouddn.com/QQ%E5%9B%BE%E7%89%8720171011212009.jpg
  [6]: http://otn4yvz23.bkt.clouddn.com/QQ%E5%9B%BE%E7%89%8720171011211942.jpg
  [7]: http://otn4yvz23.bkt.clouddn.com/QQ%E5%9B%BE%E7%89%8720171011211935.png
  [8]: http://otn4yvz23.bkt.clouddn.com/QQ%E5%9B%BE%E7%89%8720171011212004.png
  [9]: http://img.blog.csdn.net/20170217105047104?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTFiMjU1/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center
  [10]: http://img.blog.csdn.net/20170217105324962?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYTFiMjU1/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center
  [11]: https://ustbhuangyi.github.io/better-scroll/#/zh
  [12]: http://static.galileo.xiaojukeji.com/static/tms/shield/scroll-4.png
  [13]: https://ustbhuangyi.github.io/better-scroll/#/
  [14]: https://zhuanlan.zhihu.com/p/27407024
  [15]: http://www.cnblogs.com/mq0036/p/5243312.html#toc0
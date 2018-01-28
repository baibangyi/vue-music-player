<template>
  <transition name="list-fade">
    <div class="mask" @click.stop="hide" v-if="showFlag">
      <div class="left-menu" ref="MenuL" @click.stop>
        <div class="userInfo">
          <p class="userImg"></p>
          <span class="username">小白菜</span>
        </div>
         <div class="optionsList">
          <ul @click.stop.prevent="hover" class='options'>
            <li>个性装扮</li>
            <li>会员中心</li>
            <li>消息中心</li>
            <li>定时开关</li>
            <li>听歌偏好</li>
            <li>导入外部歌单</li>
            <li>帮助与反馈</li>
            <li>关于QQ音乐</li>
          </ul>
        </div>
      </div>
     </div> 
  </transition>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        showFlag: false,
        activeName: ''
      }
    },
    methods: {
      show() {
        this.showFlag = true
      },
      hide() {
        this.showFlag = false
      },
      hover() {
        var ev = ev || window.event
        var target = ev.target || ev.srcElement
        var aLi = document.getElementsByClassName('options')[0].getElementsByTagName('li')
        for (var i = 0; i < aLi.length; i++) {
          if (aLi[i].getAttribute('class') === 'hoverLi') {
            aLi[i].style.background = '#e5ecf4'
          }
        }
        if (target.nodeName.toLowerCase() === 'li') {
          target.classList.add('hoverLi')
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  
  .mask
    position: absolute
    top: 0
    left: 0
    z-index: 200
    width: 100%
    height: 667px
    .left-menu
      width: 80%
      max-width: 375px
      height: 667px
      background: #e5ecf4
      z-index: 400
      .userInfo
        width: 100%
        height: 200px
        background: #ffffff
        display: flex
        justify-content: center
        align-items: center
        .userImg
          display: inline-block
          width: 60px
          height: 60px
          background: #e5ecf4
          border-radius: 50%
          border: 1px solid #525a64
          margin-right: 30px
        .username
          font-size: 22px
          color: #525a64
          font-weight: bold
      .optionsList
        width: 100%
        ul
          width: 100%
          li
            width: 100%
            box-sizing: border-box
            vertical-align: center
            font-size: 18px
            color: #081d35
            padding: 14px 0 14px 30px
            text-align: left
          .hoverLi
            background: #ffffff
</style>
<template>
  <div class="m-header">
    <img class="meun" src="./menu.png" @click="showMenu"/>
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
    <left-menu ref="menuList"></left-menu>
  </div>
</template>

<script type="text/ecmascript-6">
  import LeftMenu from 'components/menu/menu'
  export default {
    methods: {
      showMenu() {
        this.$refs.menuList.show()
      }
    },
    components: {
      LeftMenu
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    .meun
      position:absolute
      top: 10px
      left: 10px
      width: 24px
      height: 24px
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 30px
      height: 32px
      margin-right: 9px
      bg-image('logo')
      background-size: 30px 32px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>
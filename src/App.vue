<template>
  <div id="app">
     <m-header></m-header>
     <tab></tab>
     <keep-alive>
        <router-view></router-view>
     </keep-alive>
     <player></player>
  </div>
</template>

<script type="text/ecmascript-6">
import Player from 'components/player/player'
import MHeader from 'components/mHeader/mHeader'
import Tab from 'components/tab/tab'
export default {
  name: 'app',
  components: {
    MHeader,
    Tab,
    Player
  }
}
</script>

<style scpoed lang="stylus" rel="stylesheet/stylus">
 
</style>

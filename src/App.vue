<template>
  <div id="app">
     <m-header></m-header>
     <tab></tab>
     <keep-alive>
        <router-view></router-view>
     </keep-alive>
  </div>
</template>

<script type="text/ecmascript-6">
import MHeader from 'components/mHeader/mHeader'
import Tab from 'components/tab/tab'
export default {
  name: 'app',
  components: {
    MHeader,
    Tab
  }
}
</script>

<style scpoed lang="stylus" rel="stylesheet/stylus">
 
</style>

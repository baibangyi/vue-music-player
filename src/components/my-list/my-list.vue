<template>
  <div class="my-list">
    <ul class="all-list">
			<li class="every-list">
				<div class="title-box">
					<img class="title-pic" v-lazy=""/>
					<h1 class="title">我的歌单</h1>
				</div>
				<div class="detail-box">
				  <a class="delete">删除</a>
	        <a class="detail">去看看</a>
				</div>
			</li>
		</ul>
		<div class="create-box">
			<h1 class="create">创建歌单</h1>
		</div>
	</div>
</template>

<script type="text/ecmascript-6"></script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .my-list
    width: 100%
    height: 220px
    overflow: hidden
    padding: 0 220px
    .all-list
      .every-list
        width: 100%
        height: 64px
        display: flex
        justify-content: space-between
        padding: 10px 0
        .title-box
          .title-pic
            width: 50px
            height: 50px
            vertical-align: baseline
          .title
            font-size: 14px
            color: #ffffff
        .detail-box
          .detail
            font-size: 14px
            color: #ffffff 
 <style>

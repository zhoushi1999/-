<template>
  <div>
    <van-nav-bar title="标题" fixed>
      <template #title>
        <van-button type="info" icon="search" class="search-btn" to='/search'
          >搜素</van-button
        >
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" animated>
      <van-tab :title="item.name" v-for="item in channelslist" :key="item.id">
        <ArticleList :id="item.id"></ArticleList>
      </van-tab>
      <template #nav-right>
        <div class="menu" @click="isChannelPanelShouw = true">
          <i class="toutiao toutiao-gengduo"></i>
        </div>
        <div class="menu1"></div>
      </template>
    </van-tabs>
    <van-popup
      v-model="isChannelPanelShouw"
      position="bottom"
      :style="{ height: '100%', paddingTop: '1rem' }"
      close-icon-position="top-left"
      closeable
      ><ChannelPanel
        :channelslist="channelslist"
        :active="active"
        @change-active="
          active = $event;
          isChannelPanelShouw = false;
        "
        @del-event="active = $event"
      ></ChannelPanel
    ></van-popup>
  </div>
</template>

<script>
import ChannelPanel from '@/views/home/components/ChannelPanel.vue'
import ArticleList from '@/components/ArticleList.vue'
import { getMyChannels } from '@/api/home'
import { setItem } from '@/utils/storage'
const CHANNELSLIST = 'channelslist'
export default {
  name: 'home',
  created () { this.getMyChannels() },
  data () {
    return {
      active: 0,
      channelslist: [],
      isChannelPanelShouw: false
    }
  },
  methods: {
    async getMyChannels () {
      // 未登录并且本地存储没有频道数据的情况
      const channels = setItem(CHANNELSLIST)
      if (!(this.$store.state.user && this.$store.state.user.token) && channels) { this.channelslist = channels } else {
        try {
          const res = await getMyChannels()
          console.log(res)
          this.channelslist = res.data.data.channels
        } catch (err) { console.log(err) }
      }
    }
  },
  computed: {},
  filters: {},
  components: { ArticleList, ChannelPanel }
}
</script>

<style scoped lang='less'>
.search-btn {
  width: 555px;
  height: 64px;
  border-radius: 32px;
  background-color: rgba(255, 255, 255, 0.2);
}
/deep/.van-nav-bar__title {
  max-width: unset;
}
/deep/ .van-tabs__wrap--scrollable .van-tab {
  padding: 0 69px;
  border-right: 1px solid #edeff3;
}
/deep/.van-tabs__line {
  width: 31px;
  height: 6px;
  background-color: #3296fa;
  border-radius: 3px;
}
.menu {
  width: 66px;
  height: 82px;
  background-color: rgba(251, 249, 249, 0.9);
  position: fixed;
  right: 0;
  text-align: center;
  line-height: 82px;
  .toutiao {
    font-size: 33px;
  }
}
.menu1 {
  width: 66px;
  height: 82px;
  background-color: rgba(251, 249, 249, 0.9);
}
/deep/.van-tabs__wrap {
  width: 750px;
  position: fixed;
  top: 92px;
  z-index: 1;
  border-bottom: 1px solid #fff;
}
// 解决滚动内容问题
/deep/.van-pull-refresh {
  height: calc(100vh - 274px);
  overflow: auto;
}
</style>

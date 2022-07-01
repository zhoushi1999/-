<template>
  <van-cell-group
    ><van-pull-refresh v-model="refreshing" @refresh="onRefresh"
      ><van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        ref="pullrefresh"
      >
        <!-- <van-cell
          v-for="(item, index) in articleList"
          :key="index"
          :title="item.title"
          value="内容"
          label="描述信息" /> -->
        <ArticleItem
          v-for="(item, index) in articleList"
          :key="index"
          :article="item"
        ></ArticleItem> </van-list
    ></van-pull-refresh>
  </van-cell-group>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
// 全局
import { getArticleList } from '@/api/home'
// 这二个没有必要放在data里面，需要去响应式数据
let ele = null
let scrollTop = 0
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () { this.getArticleList() },

  mounted () {
    ele = this.$refs.pullrefresh.$el
    // 设置记住首页滚动的位置，切换后数据依然显示在原来的位置
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () { scrollTop = this.scrollTop })
  },
  activated () {
    // 缓存
    ele.scrollTop = scrollTop
  },
  data () {
    return {
      // 定义时间戳
      timestamp: Date.now(),
      // 接受数据
      articleList: [],

      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async getArticleList () {
      try {
        if (this.refreshing) {
          this.articleList = []
          this.refreshing = false
        }
        // 把接口的数据赋值
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        console.log(res)
        this.timestamp = res.data.data.pre_timestamp

        // 数据已全部加载完毕，则直接将 finished 设置成 true
        if (this.timestamp === null) {
          this.finished = true
        }
        // 保留原来页面的数据
        this.articleList.push(...res.data.data.results)
        // 数据更新完毕后，将 loading 设置成 false 即可
        this.loading = false
      } catch (err) { console.log(err) }
    },
    onLoad () {
      // 拿到加载的数据
      this.getArticleList()
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      // 定义时间
      this.timestamp = Date.now()
      // 重新拿到数据，
      this.getArticleList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
</style>

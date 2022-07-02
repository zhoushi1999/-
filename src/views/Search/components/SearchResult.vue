<template>
  <div class="container">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(item, index) in list"
          :key="index"
          :article="item"
        ></ArticleItem></van-list
    ></van-pull-refresh>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
import ArticleItem from '@/components/ArticleItem'
export default {
  props:
  {
    searchText:
      { type: String, required: true }
  },
  created () {
    this.getSearchResult()
  },
  data () {
    return {
      page: 1,
      per_page: 20,
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    // 结果请求方法
    async getSearchResult () {
      try {
        const res = await getSearchResult({ page: this.page, per_page: this.per_page, q: this.searchText })
        console.log(res)
        // 判断数据加载完毕,把finished变成true
        if (res.data.data.results.length === 0) {
          this.finished = true
          return
        }
        // 保留原来的数据,在后面添加新的数据
        this.list.push(...res.data.data.results)
        // 数据已全部加载完毕，则直接将 finished 设置成 true
        this.loading = false
        // 在事件的回调函数中可以进行同步或异步操作，操作完成后将 v-model 设置为 false，表示加载完成。
        this.refreshing = false
      } catch (err) { console.log(err) }
    },
    onLoad () {
      // 每次到底部页码值加1,请求下一页数据
      this.page++
      this.getSearchResult()
    },
    // 下拉刷新事件
    onRefresh () {
      this.list = []
      this.page = 1
      this.getSearchResult()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { ArticleItem }
}
</script>

<style scoped lang='less'>
.container {
  overflow: auto;
  height: calc(100vh - 108px);
}
</style>

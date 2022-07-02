<template>
  <div>
    <form action="/">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @cancel="$router.back()"
        @search="onSearch"
        @focus="isSearch = false"
      />
    </form>
    <SearchHistory v-if="searchText === ''" @search="onSearch"></SearchHistory>
    <template v-else>
      <SearchResult v-if="isSearch" :searchText="searchText"></SearchResult>
      <SearchSuggest
        v-else
        :searchText="searchText"
        @search="onSearch"
      ></SearchSuggest>
    </template>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory'
import SearchResult from './components/SearchResult'
import SearchSuggest from './components/SearchSuggest'
export default {
  created () { },
  data () {
    return { searchText: '', isSearch: false }
  },
  methods: {
    // 給搜素添加一个点击事件
    onSearch (item) {
      // 搜素内容变成下面的搜素建议同步
      this.searchText = item
      // enter事件
      this.isSearch = true
      this.$store.commit('searchHistoryList', item)
    }
  },
  computed: {

  },
  watch: {},
  filters: {},
  components: { SearchSuggest, SearchResult, SearchHistory }
}
</script>

<style scoped lang='less'>
</style>

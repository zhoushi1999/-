<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in searchSuggest"
      :key="index"
      @click="$emit('search', item)"
    >
      <template #title><span v-html="highlight(item)"></span> </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestList } from '@/api/search'
let timer = null
export default {
  props: {
    searchText:
      { type: String, required: true }
  },
  created () { },
  data () {
    return {
      searchSuggest: []
    }
  },
  methods: {
    // 需要給搜素定位关键字添加样式,还有渲染的不是普通的字符串,必须用v-html,它是属性绑定,不能用过滤器写
    highlight (str) {
      // 这是正则的另一种写法
      const reg = new RegExp(this.searchText, 'g')
      return str.replace(reg, `<span style="color: red">${this.searchText}</span>`)
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler (newval) {
        // 防抖
        clearTimeout(timer)
        timer = setTimeout(async () => {
          try {
            const res = await getSuggestList(newval)
            console.log(res)
            this.searchSuggest = res.data.data.options
          } catch (err) { console.log(err) }
        }, 900)
      },
      immediate: true
    }
  },
  beforeDestroy () {
    // 清楚定时器
    clearTimeout(timer)
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>

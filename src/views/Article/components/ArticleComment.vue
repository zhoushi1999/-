<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="(item, index) in commentList"
        :key="index"
        :item="item"
        @replsy-show="$emit('replsy-show',$event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from './CommentItem'
import { getComment } from '@/api/comment'
export default {
  props: {
    type: {
      type: String,
      required: true,
      validator (value) { return ['a', 'c'].indexOf(value) !== -1 }
    },
    source: {
      type: [Number, String],
      required: true
    },
    commentList: { type: Array, default: () => [] }
  },
  created () { this.getComment() },
  data () {
    return {
      paramsObj: {
        type: this.type,
        source: this.source,
        limit: 5,
        offset: null
      },
      // commentList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getComment () {
      try {
        const res = await getComment(this.paramsObj)
        console.log('res', res)
        // 若数据已全部加载完毕，则直接将 finished 设置成 true 即
        if (res.data.data.results.length === 0) {
          this.finished = true
        }
        this.$emit('set-count', res.data.data.total_count)
        this.commentList.push(...res.data.data.results)
        // 本次返回结果的最后一个评论id，作为请求下一页数据的offset参数，若本次无具体数据，则值为NULL
        this.paramsObj.offset = res.data.data.last_id
        // 数据更新完毕后，将 loading 设置成 false 即可。
        this.loading = false
      } catch (err) { console.log(err) }
    },
    onLoad () { this.getComment() }
  },
  computed: {},
  watch: {},
  filters: {},
  components: { CommentItem }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>

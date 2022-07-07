<template>
  <van-button
    :loading="isAjax"
    :disabled="isAjax"
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    :plain="value"
    :icon="value ? '' : 'plus'"
    @click="onClick"
    >{{ value ? "已关注" : "关注" }}</van-button
  >
</template>

<script>
import { addUser, delUser } from '@/api/article'
export default {
  name: 'FollowUser',
  props: {
    value: { type: Boolean, required: true },
    target: { type: [String, Number], required: true }
  },
  created () { },
  data () {
    return { isAjax: false }
  },
  methods: {
    async onClick () {
      // 防止用户疯狂点击切换
      this.isAjax = true
      // 如果已关注，调用取消关注接口
      if (this.value) {
        try {
          await delUser(this.target)
          this.$emit('input', !this.value)
        } catch (err) { console.log(err) }
      } else {
        // 如果未关注，调用关注接口
        try {
          await addUser(this.target)
          this.$emit('input', !this.value)
        } catch (err) { }
      }
      this.isAjax = false
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>

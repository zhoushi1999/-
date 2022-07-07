<template>
  <div>
    <van-field
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
      center
      ref="field"
      ><template #extra
        ><van-button
          type="default"
          @click="onClick"
          :disabled="message.length === 0"
          >发布</van-button
        ></template
      >
    </van-field>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  props: {
    target: { type: [String, Number], required: true }, art_id: { type: [String, Number] }
  },
  created () { },
  data () {
    return { message: '' }
  },
  mounted () {
    this.$refs.field.$el.querySelector('textarea').focus()
  },
  methods: {
    async onClick () {
      try {
        const res = await addComment({ target: this.target, content: this.message, art_id: this.art_id })
        console.log('1', res)
        // 把数据直接添加到评论的第一个里面
        this.$emit('add-comment', res.data.data.new_obj)
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-button {
  border: none;
}
</style>

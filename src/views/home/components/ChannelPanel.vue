<template>
  <div>
    <div class="channels-container">
      <div class="title">
        <h3>我的频道</h3>
        <van-button
          type="danger"
          round
          plain
          size="mini"
          @click="isCloseShow = !isCloseShow"
          >{{ isCloseShow ? "完成" : "编辑" }}</van-button
        >
      </div>
      <van-row>
        <van-col span="6" v-for="(item, index) in channelslist" :key="item.id"
          ><div
            @click="onClick(index)"
            class="inner"
            :style="{ color: active === index ? 'red' : '' }"
          >
            {{ item.name }}
            <van-icon
              name="close"
              v-if="index !== 0"
              v-show="isCloseShow"
            /></div
        ></van-col>
      </van-row>
    </div>

    <div class="channels-container">
      <div class="title">
        <h3>推荐频道</h3>
      </div>
      <van-row>
        <van-col span="6" v-for="item in tuijian" :key="item.id"
          ><div class="inner" @click="add(item.id)">
            {{ item.name }}
          </div></van-col
        >
      </van-row>
    </div>
  </div>
</template>

<script>
import { setItem } from '@/utils/storage'
import { getAllArticleList, saveChannels } from '@/api/home'
const CHANNELSLIST = 'channelslist'
export default {
  props: {
    channelslist: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  created () { this.getAllArticleList() },
  data () {
    return { tuijian: [], isCloseShow: false }
  },
  methods: {
    // 定义推荐频道的内容
    async getAllArticleList () {
      try {
        const res = await getAllArticleList()
        console.log(res)
        this.tuijian = res.data.data.channels.filter(item => this.channelslist.every(item1 => item1.id !== item.id))
      } catch (err) { console.log(err) }
    },
    // 根据id找索引值
    add (id) {
      const index = this.tuijian.findIndex(item => item.id === id)
      this.channelslist.push(this.tuijian[index])
      this.tuijian.splice(index, 1)
    },
    onClick (index) {
      if (this.isCloseShow) {
        // 删除
        const obj = this.channelslist[index]
        this.channelslist.splice(index, 1)
        this.tuijian.push(obj)
        if (index < this.active) { this.$emit('del-event', this.active - 1) }
      } else { this.$emit('change-active', index) }
    }
  },
  computed: {},
  watch: {
    // 不同状态下{登录,未登录}的时候用本地存储
    channelslist:
    {
      async handler (newval) {
        // 登录下
        if (this.$store.state.user && this.$store.state.user.token) {
          // 把数据处理
          const arr = []
          newval.forEach((item, index) => {
            arr.push({ id: item.id, seq: index })
          }
          )
          console.log(arr)
          // 把数据存贮到本地里面
          try {
            const res = await saveChannels(arr)
            console.log(res)
          } catch (err) { console.log(err) }
        } else {
          // 没有登录
          setItem(CHANNELSLIST, newval)
        }
      },
      deep: true
    }
  },
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.channels-container {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 24px;
    padding-right: 16px;
    padding-bottom: 22px;
  }
  h3 {
    width: 133px;
    height: 32px;
    font-size: 32px;
    line-height: 36px;
    color: #333333;
  }
  .van-button {
    width: 104px;
    height: 48px;
    border-radius: 20px;
    font-size: 15px;
  }
}
.van-col {
  margin-bottom: 22px;
}
.inner {
  width: 160px;
  height: 86px;
  background-color: #f4f5f6;
  border-radius: 6px;
  font-size: 28px;
  line-height: 86px;
  text-align: center;
  color: #222222;
  margin-left: 14px;
  position: relative;
}
.van-icon {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}
</style>

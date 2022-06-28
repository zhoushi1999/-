<template>
  <div>
    <router-view class='main'/>
    <van-tabbar route >
      <van-tabbar-item replace to="/home"
        >首页
        <!-- <i class="toutiao toutiao-shouye" slot="icon"></i> -->
        <template #icon><i class="toutiao toutiao-shouye" ></i> </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/video"
        >视频<i class="toutiao toutiao-shipin" slot="icon"></i
      ></van-tabbar-item>
      <van-tabbar-item replace to="/question"
        >问答<i class="toutiao toutiao-wenda" slot="icon"></i
      ></van-tabbar-item>
      <van-tabbar-item replace to="/my"
        >我的<i class="toutiao toutiao-wode" slot="icon"></i
      ></van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 40px;
}
/deep/.van-tabbar-item__text {
  font-size: 20px;
}
.main{
  background-color: #F5F7F9;
  padding-bottom: 100px;
}
</style>

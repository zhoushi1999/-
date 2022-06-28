<template>
  <div>
    <!-- 登录后 -->
    <div class="header header-login" v-if="user && user.token">
      <div class="avatar">
        <div class="left">
          <van-image
            width="1.76rem"
            height="1.76rem"
            round
            :src="userinfo.photo"
          />
          <span>{{userinfo.name}}</span>
        </div>
        <div class="button">编辑资料</div>
      </div>
      <div>
        <ul class="list">
          <li>
            <p>{{userinfo.art_count}}</p>
            <p>头条</p>
          </li>
          <li>
            <p>{{userinfo.fans_count}}</p>
            <p>关注</p>
          </li>
          <li>
            <p>{{userinfo.follow_count}}</p>
            <p>粉丝</p>
          </li>
          <li>
            <p>{{userinfo.like_count}}</p>
            <p>点赞</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 未登录 -->
    <div class="header header-notlogin" v-else>
      <div @click="$router.push('/login')">
        <img src="@/assets/mobile.png" alt="" />
        <p>登录/注册</p>
      </div>
    </div>
    <van-grid :column-num="2">
      <van-grid-item text="收藏">
        <template #icon> <i class="toutiao toutiao-shoucang"></i></template>
      </van-grid-item>

      <van-grid-item text="历史"
        ><template #icon> <i class="toutiao toutiao-lishi"></i></template
      ></van-grid-item>
    </van-grid>
    <van-cell-group>
      <van-cell title="单元格" is-link />
      <van-cell title="单元格" is-link />
    </van-cell-group>
    <van-button type="default" block v-if="user && user.token" @click="logout"
      >退出按钮</van-button
    >
  </div>
</template>

<script>
import { getUserinfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  async created () {
    if (this.user.token && this.user) {
      try {
        const res = await getUserinfo()
        console.log(res)
        this.userinfo = res.data.data
      } catch (err) { console.log(err) }
    }
  },
  data () {
    return {
      userinfo: {}
    }
  },
  methods: {

    async logout () {
      try {
        await this.$dialog.confirm({ message: '确定退出吗' })
        this.$store.commit('setUser', {})
      } catch (err) { console.log(err) }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.header {
  width: 750px;
  height: 401px;
  background-color: #3296fa;

  background: rgba(40, 116, 188, 0.7) url("@/assets/banner.png") no-repeat;
  background-size: cover;
}
.header-notlogin {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 132px;
    height: 132px;
  }
  p {
    font-size: 28px;
    color: #ffffff;
  }
}
.header-login {
  padding-top: 116px;
  .avatar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 32px;
    padding-right: 33px;
    margin-bottom: 55px;
    .button {
      width: 116px;
      height: 33px;
      background-color: #ffffff;
      border-radius: 16px;
      font-size: 20px;
      font-weight: normal;
      letter-spacing: 1px;
      color: #666666;
      line-height: 33px;
      text-align: center;
    }
    .left {
      display: flex;
      align-items: center;
      span {
        margin-left: 22px;
        font-size: 30px;
        color: #ffffff;
      }
    }
  }
  .list {
    display: flex;
    li {
      flex: 1;
      text-align: center;
      p {
        color: #ffffff;
        &:nth-child(1) {
          font-size: 36px;
        }
        &:nth-child(2) {
          font-size: 23px;
        }
      }
    }
  }
}
.toutiao {
  font-size: 45px;
}
.van-grid-item {
  &:nth-child(1) {
    color: #eb5253;
  }
  &:nth-child(2) {
    color: #ff9d1d;
  }
}
/deep/.van-grid-item__text {
  font-size: 24px;
}
.van-cell-group {
  margin: 9px 0;
}
.van-button {
  color: #d86262;
}
</style>

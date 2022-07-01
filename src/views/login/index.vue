<template>
  <div>
    <van-nav-bar title="登录"  @click-left="$router.back()">
      <van-icon name="cross" slot="left"/>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '不符合手机格式' },
        ]"
        ><i class="toutiao toutiao-shouji" slot="left-icon"></i
      ></van-field>
      <van-field
        v-model.trim="code"
        type="password"
        name="code"
        placeholder="请输入验证码"
        :rules="[
          { required: true, message: '请输入验证码+' },
          { pattern: /^\d{6}$/, message: '验证码必须是6位' },
        ]"
        ><i class="toutiao toutiao-yanzhengma" slot="left-icon"></i
        ><template #button>
          <van-count-down
            :time="time"
            format=" ss 秒"
            v-if="isCountDownShow"
            @finish="isCountDownShow = false"
          />
          <van-button
            @click="onSendSms"
            size="small"
            class="yzm"
            native-type="button"
            v-else
            >发送验证码</van-button
          >
        </template></van-field
      >
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="btn-login"
          >登录</van-button
        >
      </div>
    </van-form>
    <p class="ys">隐私条款</p>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user.js'
export default {
  created () { },
  data () {
    return {
      mobile: '17623507029', // 手机号
      code: '246810', // 短信验证码
      time: 5 * 1000,
      isCountDownShow: false// 默认不显示效果
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
        this.$router.push('/my')
      } catch (err) { console.log(err) }
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDownShow = true
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送失败')
        }
      } catch (err) {
        console.log(err)
        console.log('检验失败')
        this.$toast.fail('手机号码格式不正确')
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
.toutiao {
  font-size: 37px;
}
.yzm {
  position: fixed;
  right: 10px;
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  .van-button__text {
    zoom: 0.96;
  }
}
.btn-login {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  color: #ffffff;
}
.van-count-down {
  position: fixed;
  right: 18px;
}
.ys {
  position: fixed;
  z-index: 1;
  font-size: 25px;
  color: #666666;
  text-align: center;
}
</style>

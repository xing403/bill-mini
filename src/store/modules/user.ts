import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import userApi from '@/api/modules/user'


export default defineStore('user', () => {

  const token = ref(uni.getStorageSync('token'))
  const information = ref<any>(null)

  const userIsLogin = computed(() => !!token.value)

  const handleUserLogin = ({ username, password }: { username: string, password: string }) => {
    return userApi.login({ username, password }).then(({ data }: any) => {
      token.value = data
      uni.setStorageSync('token', data)
    })
  }

  const getUserInformation = () => {
    return userApi.getUserInfo().then(({ data }: any) => {
      information.value = data
    })
  }

  const reLogin = () => {
    token.value = null
    information.value = null

  }

  const handleUserLogout = () => {
    return userApi.logout().then(() => {
      reLogin()
    }).catch((err) => { })
  }

  return {
    token,
    userIsLogin,
    information,
    reLogin,
    handleUserLogin,
    handleUserLogout,
    getUserInformation
  }
})

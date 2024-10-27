import api from "..";

export const login = (data: { username: string, password: string }) => api.post('/login', data, {
  header: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
})
export const register = (data: { username: string, password: string }) => api.post('/register', data);
export const logout = () => api.post('/logout')
export const getUserList = (params: any) => api.get('/user/list', { params });
export const getAllLoginUser = () => api.get('/user/allLoginUser')
export const getUserInfo = () => api.get('/user/information')
export const getUserInfoByUserId = (id: number) => api.get(`/user/information/${id}`)
export const addUser = (params: any) => api.post('/user', params)
export const updateUser = (params: any) => api.put('/user', params)
export const deleteUser = (userId: number) => api.delete(`/user/${userId}`)
export const enableUserByUserId = (id: number) => api.get(`/user/enable/${id}`)
export const disableUserByUserId = (id: number) => api.get(`/user/disable/${id}`)

export const changeQRCodeScanned = (qrcode: string) => api.put(`/qrcode/change/${qrcode}/scanned`)
export const changeQRCodeSuccess = (qrcode: string, token: string) => api.put(`/qrcode/change/${qrcode}/success`, { token })
export const changeQRCodeFailed = (qrcode: string) => api.put(`/qrcode/change/${qrcode}/failed`)
export const getQRCodInformation = (qrcode: string) => api.get(`/qrcode/{qrcode}/information`)

export default {
  login,
  register,
  logout,
  getUserList,
  getAllLoginUser,
  getUserInfo,
  getUserInfoByUserId,
  addUser,
  updateUser,
  deleteUser,
  enableUserByUserId,
  disableUserByUserId,
  changeQRCodeScanned,
  changeQRCodeSuccess,
  changeQRCodeFailed,
  getQRCodInformation,
}

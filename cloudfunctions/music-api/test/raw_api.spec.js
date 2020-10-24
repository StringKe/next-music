const netApi = require('NeteaseCloudMusicApi');

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const netLogin = (phone, password) => {
  return new Promise((resolve, reject) => {
    netApi
      .login_cellphone({
        phone,
        password,
      })
      .then((response) => {
        console.log(response);
        resolve(response);
      })
      .catch((e) => {
        reject(e);
      });
  });
};

describe('原版 API 测试', () => {
  test('playlist_detail 歌单详情测试', () => {
    return netApi
      .playlist_detail({
        id: '111741273',
      })
      .then((response) => {
        console.log(response);
      });
  });
});

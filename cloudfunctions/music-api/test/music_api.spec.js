const client = require('../index');

describe('网易云 API 测试', () => {
  test('comment_hotwall_list 热评', () => {
    return client
      .main({
        action: 'comment_hotwall_list',
        params: {},
        debug: true,
      })
      .then((response) => {
        expect(response.code).toBe(200);
      })
      .catch((error) => {
        expect(error).toMatch('error');
      });
  });

  test('playlist_detail 歌单详情', () => {
    return client
      .main({
        action: 'playlist_detail',
        params: {
          id: '111741273',
        },
        debug: true,
      })
      .then((response) => {
        expect(response.data).not.toBe({});
      })
      .catch((error) => {
        expect(error).toMatch('error');
      });
  });

  test('song_detail 歌曲详情', () => {
    return client
      .main({
        action: 'song_detail',
        params: {
          ids: '347230',
        },
        debug: true,
      })
      .then((response) => {
        expect(response.data).not.toBe({});
      })
      .catch((error) => {
        expect(error).toMatch('error');
      });
  });
});

import * as type from './mutations_type.js'
import jsonp from 'jsonp'
import axios from 'axios'

let svrHost = 'api.moonai.com.cn';
let svrPort = 10081;
let svrPath = '/app/user/messagev1/';
let maxNewsCount = 1000;

let listSize = 40;

function urlForGetNews (type, start, end) {
  let url = 'https://' + svrHost + svrPath + type + '?start=' + start + '&end=' + end;
  return url;
}

export default {
  getNews ({ commit, state }, payload) {
    console.info("getNews payload",payload)
    return new Promise(resolve => {
      state.loading = true;
      state.ifReturnMore = true;
      if (payload.type) {
        let url = urlForGetNews(payload.type, 0, listSize); //'http://47.111.24.228:10080/app/user/message/info_finance?start=1&end=8';
        axios.get(url)
          .then(res => {
            let contents = JSON.parse(res.data.content);
           
            if (payload.customerName === "home") {
              commit(type.GET_NEWSLIST, {
                data: contents,
                type: payload.type,
                customerName: payload.customerName,
                isNewData: true
              });
            }else if (payload.customerName === "taoNews") {
              commit(type.GET_NEWSLIST_KAIYAO, {
                data: contents,
                type: payload.type,
                customerName: payload.customerName,
                isNewData: true
              });
            } else if (payload.customerName === "kaiyao") {
              commit(type.GET_NEWSLIST_KAIYAO, {
                data: contents,
                type: payload.type,
                customerName: payload.customerName,
                isNewData: true
              });
            } else {  // b1
              commit(type.GET_NEWSLIST_B1, {
                data: contents,
                type: payload.type,
                customerName: payload.customerName,
                isNewData: true
              });
            }
            state.loading = false;
            if (contents.length > 0) {
              state.ifReturnMsg = true;
            } else {
              state.ifReturnMsg = false;
            }

            commit(type.HASPARAGRAPH, true);
            commit(type.ISNEWESTCONTLOADED, true);

            state.loadmore = true;

            resolve(contents);
          })
          .catch(err => {
            console.log("catch error at " + payload.type + ": " + err);
          });
      }
    });
  },

  getOneNews ({ commit, state }, payload) {
    return new Promise(resolve => {
      state.loading = true;
      state.ifReturnMore = true;
      if (payload.type) {
        let url = urlForGetNews(payload.type, payload.start, payload.end);
        axios.get(url)
          .then(res => {
            let contents = JSON.parse(res.data.content);
            resolve(contents);

            state.loading = false;
            if (contents.length > 0) {
              state.ifReturnMsg = true;
            } else {
              state.ifReturnMsg = false;
            }
          })
          .catch(err => {
            console.log("catch error at " + payload.type + ": " + err);
          });
      }
    });
  },

  // // 获取文章
  // getArticle ({commit, state}, payload) {
  //   state.loading = true;
  //   axios.get('http://192.168.3.2:9000/detail/' + payload.id)
  //     .then(res => {
  //       state.loading = false;
  //       let data = res.data.data;
  //       state.ifReturnMsg = true;
  //       commit(type.GET_ARTICLE, {
  //         title: data.title,
  //         detail_source: data.detail_source,
  //         content: data.content,
  //         src: ''
  //       })
  //     })
  //     .catch(err => {
  //       state.loading = false;
  //       console.log(err);
  //       state.ifReturnMsg = false;
  //       return false
  //     })
  // },

  // 获取更多新闻
  getMoreNews ({commit, state}, payload) {
    return new Promise(resolve => {
      let start = state.list[payload.type].length;
      if (start < maxNewsCount) {
        let url = urlForGetNews(payload.type, start, start + listSize);
        axios.get(url)
          .then(res => {
            let contents = JSON.parse(res.data.content);
            commit(type.GET_NEWSLIST, {
              data: contents,
              type: payload.type,
              customerName: payload.customerName,
              isNewData: false
            });

            state.loading = false;
            if (contents.length > 0) {
              state.ifReturnMsg = true;
            } else {
              state.ifReturnMsg = false;
              state.loadmore = false;
            }

            if (state.list[payload.type].length < maxNewsCount) {
              state.loadmore = true;
            } else {
              state.loadmore = false;
            }

            resolve(contents);
          })
          .catch(err =>{
            state.loadmore = false;
            resolve(err);
          });
      }
    });
  },

  getMoreNewsForKaiyao ({commit, state}, payload) {
    return new Promise(resolve => {
      let start = state.kaiyaoList[payload.type].length;
      if (start < maxNewsCount) {
        let url = urlForGetNews(payload.type, start, start + listSize);
        axios.get(url)
          .then(res => {
            let contents = JSON.parse(res.data.content);

            commit(type.GET_NEWSLIST_KAIYAO, {
              data: contents,
              type: payload.type,
              customerName: payload.customerName,
              isNewData: false,
            });

            state.loading = false;
            if (contents.length > 0) {
              state.ifReturnMsg = true;
            } else {
              state.ifReturnMsg = false;
              state.loadmore = false;
            }

            if (state.kaiyaoList[payload.type].length < maxNewsCount) {
              state.loadmore = true;
            } else {
              state.loadmore = false;
            }

            resolve(contents);
          })
          .catch(err =>{
            state.loadmore = false;
            resolve(err);
          });
      }
    });
  },

  getMoreNewsForB1 ({commit, state}, payload) {
    return new Promise(resolve => {
      let start = state.list_B1[payload.type].length;
      if (start < maxNewsCount) {
        let url = urlForGetNews(payload.type, start, start + listSize);
        axios.get(url)
          .then(res => {
            let contents = JSON.parse(res.data.content);

            commit(type.GET_NEWSLIST_B1, {
              data: contents,
              type: payload.type,
              customerName: payload.customerName,
              isNewData: false,
            });

            state.loading = false;
            if (contents.length > 0) {
              state.ifReturnMsg = true;
            } else {
              state.ifReturnMsg = false;
              state.loadmore = false;
            }

            if (state.list_B1[payload.type].length < maxNewsCount) {
              state.loadmore = true;
            } else {
              state.loadmore = false;
            }

            resolve(contents);
          })
          .catch(err =>{
            state.loadmore = false;
            resolve(err);
          });
      }
    });
  },

  // 获取段子
  getSession ({commit, state}, payload) {
    state.loadmoreSession = true
    jsonp('https://www.toutiao.com/api/article/feed/?category=essay_joke&utm_source=toutiao&widen=1&max_behot_time=1500114422&max_behot_time_tmp=1500114422&tadrequire=true&as=A1F52966E9EEF00&cp=59692E6FD0E09E1',
      { timeout: 3000 },
      function (err, res) {
        state.loadmoreSession = false;
        if (err) {
          console.log(err)
          state.ifReturnSession = false;
          return false
        }
        state.ifReturnSession = true;
        commit(type.GET_SESSION, {
          data: res.data
        })
      })
  },
  // 获取搜索
  getSearch ({commit}, { offset, keyword }) {
    commit('IF_LOADING', true);
    commit('RETURN_SEARCH', false);
    jsonp('https://www.toutiao.com/search_content/?offset=' + offset + '&format=json&keyword=' + keyword + '&autoload=true&count=20&cur_tab=1',
      { timeout: 3000 },
      function (err, res) {
        commit('IF_LOADING', false);
        if (err) {
          console.log(err)
          return false
        }
        commit('RETURN_SEARCH', true);
        commit('GET_SEARCH', {
          data: res.data,
          keyword
        })
      })
  },
  // 获取更多搜索
  getMoreSearch ({ commit }, { offset, keyword }) {
    commit('LOADMORE_SEARCH', true)
    jsonp('https://www.toutiao.com/search_content/?offset=' + offset + '&format=json&keyword=' + keyword + '&autoload=true&count=20&cur_tab=1',
      { timeout: 3000 },
      function (err, res) {
        commit('LOADMORE_SEARCH', false);
        if (err) {
          console.log(err)
          commit('RETURN_MORE_SEATCH', false);
          return false
        }
        commit('GET_SEARCH', {
          data: res.data,
          keyword
        })
      })
  },
  updateScrollY({commit},scrollY){
    commit(type.UPDATE_SCROLLY,scrollY)
  },
  // 刷新新闻
  refreshNews ({ commit, state }, payload) {
    state.ifReturnRefresh = false;
    if (payload.type) {
      jsonp('https://m.toutiao.com/list/?tag=' + payload.type + '&ac=wap&count=20&format=json_raw&as=A125A8CEDCF8987&cp=58EC18F948F79E1&min_behot_time=' + parseInt(new Date().getTime() / 1000),
        { timeout: 3000 },
        function (err, res) {
          if (err || res.data.length === 0) {
            console.log(err);
            return false
          }
          commit(type.REFRESH_LENGTH, res.return_count);
          commit(type.REFRESH_NEWS, {
            type: payload.type,
            data: res.data
          })
        })
    }
  },
}

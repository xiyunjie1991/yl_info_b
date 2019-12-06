import * as type from './mutations_type.js'
import jsonp from 'jsonp'
import axios from 'axios'

let svrHost = 'api.moonai.com.cn';
let svrPort = 10081;
let svrPath = '/app/user/messagev1/';
let maxNewsCount = 1000;

let listSize = 10;

function urlForGetNews (type, start, end) {
  let url = 'https://' + svrHost + svrPath + type + '?start=' + start + '&end=' + end;
  return url;
}

export default {
  getNews ({ commit, state }, payload) {
    console.info('getNews')
    return new Promise(resolve => {
      state.loading = true;
      state.ifReturnMore = true;
      if (payload.type) {
        let url = urlForGetNews(payload.type, 0, listSize); //'http://47.111.24.228:10080/app/user/message/info_finance?start=1&end=8';
        axios.get(url)
          .then(res => {
            console.info('getNews res', res)
            let contents = JSON.parse(res.data.content);
                commit(type.GET_NEWSLIST, {
                data: contents,
                type: payload.type,
                customerName: payload.customerName,
                isNewData: true
              });
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
  updateScrollY({commit},scrollY){
    commit(type.UPDATE_SCROLLY,scrollY)
  },


  // 获取更多新闻
  getMoreNews ({commit, state}, payload) {
    return new Promise(resolve => {
      debugger
      let start = state.list[payload.type].length;
      if (start < maxNewsCount) {
        debugger
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
}

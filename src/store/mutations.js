import * as type from './mutations_type.js'
import {RuleExecEngine} from './adengine/RuleExecEngine.js'

function addDataToList(payload, state, list) {
  let type = payload.type;
  if (payload.isNewData) {
    list[type].splice(0, list[type].length);
  }

  for (let item of payload.data) {
    let repin_count = 6+Math.floor(Math.random()*200);

    // 评论数，点赞数
    item['repin_count'] = repin_count;
    item['comment_count'] = Math.floor(repin_count / (1+Math.random()*3)+Math.random()*50);

    // 媒体来源
    if (item.media_name === undefined){
      let media_name =  (item.author.length === 0) ? item.source : item.author;
      item['media_name'] = media_name;
    }

    // 插入推呀广告
    let index = list[type].length;
    RuleExecEngine.injectAdToList_byCustomer_roule01(payload.customerName, item, index);
    list[type].push(item);


  }
  console.info("getMoreNews list",list)
}

export default {

  // 获取新闻
  [type.GET_NEWSLIST] (state, payload) {
    addDataToList(payload, state, state.list);
  },

  [type.UPDATE_SCROLLY] (state, scrollY) {
    state.scrollY = scrollY
  },

  // 是否在加载中
  [type.IF_LOADING] (state, boolean) {
    state.loading = boolean
  },
  // 添加历史
  
  // 是否加载更多搜索
  [type.LOADMORE_SEARCH] (state, boolean) {
    state.loadmoreSearch = boolean
  },
  // 是否返回更多搜索
  [type.RETURN_MORE_SEATCH] (state, boolean) {
    state.ifReturnMoreSearch = boolean
  },
  
  // 刷新消息
  [type.REFRESH_NEWS] (state, payload) {
    let type = payload.type
    for (let item of payload.data) {
      state.list[type].unshift(item)
    }
  },
  // 刷新消息的数量
  [type.REFRESH_LENGTH] (state, length) {
    state.newsLength = length
    state.ifReturnRefresh = true
  },
  // 记录从主页离开时的新闻类型
  [type.LOG_TYPE] (state, type) {
    state.type = type
  },
  // 保存网页离开时的位置
  [type.SAVE_POSITION] (state, {name, position}) {
    state.positions[name] = position
  },
  [type.ISNEWESTCONTLOADED](state, flag){
    state.isNewestContLoaded = flag;
  },
  [type.HASPARAGRAPH](state, flag){
    state.hasParagraph = flag;
  }
}

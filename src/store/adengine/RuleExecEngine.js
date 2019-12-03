
import {material_sogou} from "./ad_sogou/material";
import {material_tuiya} from "./ad_tuiya/material";
import {AdInjectRule} from "./AdInjectRule";
import {AdFilterRule} from "./AdFilterRule";
import {customer} from "../customer/customerData";


export const RuleExecEngine = {
  // 判断能否根据规则01插入推呀广告
  canInjectAd_tuiya_roule01: function (index) {
    if (AdFilterRule.usingAd === false || AdFilterRule.usingAd_Tuiya === false) return false;

    let start = AdInjectRule.rule_01.startIndex;
    let step = AdInjectRule.rule_01.step;
    if(index === start || (index > start && (index - start) % step === 0)) {
      return true;
    }
    else {
      return false;
    }
  },

  // 判断能否根据规则01插入搜狗广告
  canInjectAd_sogou_roule01: function (index) {
    if (AdFilterRule.usingAd === false || AdFilterRule.usingAd_Sogou === false) return false;

    let start = AdInjectRule.rule_01.startIndex;
    let step = AdInjectRule.rule_01.step;
    if(index === start || (index > start && (index - start) % step === 0)) {
      return true;
    }
    else {
      return false;
    }
  },

  // 随机获取推呀广告
  randGetOneAd_tuiya: function () {
    let count = material_tuiya.materials.length;

    // 随机获取一个素材
    let randIdx = Math.floor(Math.random()*count);
    let adImagePath = material_tuiya.materials[randIdx].path;
    return {
      path: adImagePath,
      href: material_tuiya.hrefOne
    }
  },

  // 随机获取搜狗广告
  randGetOneAd_sogou: function () {
    let count = material_sogou.materials.length;

    // 随机获取一个素材
    let randIdx = Math.floor(Math.random()*count);
    return material_sogou.materials[randIdx];
  },

  // 根据规则01植入推呀广告
  injectAdToList_tuiya_roule01: function (item, index) {
    if (this.canInjectAd_tuiya_roule01(index)) {
      item ['ad_tuiya'] = this.randGetOneAd_tuiya();
    }
  },

  // 根据规则01植入搜狗广告
  injectAdToList_sogou_roule01: function (item, index) {
    if (this.canInjectAd_sogou_roule01(index)) {
      item ['ad_sogou'] = this.randGetOneAd_sogou();
      item['divid_sogouad'] = "sogouad" + index + Math.floor(Math.random()*100000);
    }
  },

  // 根据规则01分渠道植入广告
  injectAdToList_byCustomer_roule01: function (customerName, item, index) {
    if (customerName === customer.kaiyao.name) {
      this.injectAdToList_tuiya_roule01(item, index);
    } else {
      this.injectAdToList_sogou_roule01(item, index);
    }
  }

};

"use strict";(self["webpackChunkerabbit_pc_vue_project"]=self["webpackChunkerabbit_pc_vue_project"]||[]).push([[436],{6436:function(a,t,e){e.r(t),e.d(t,{default:function(){return Wa}});var s=e(3396);const o={class:"app-body"};function c(a,t,e,c,d,r){const i=(0,s.up)("app-topnav"),n=(0,s.up)("app-header"),l=(0,s.up)("app-header-sticky"),p=(0,s.up)("router-view"),v=(0,s.up)("app-footer");return(0,s.wg)(),(0,s.iD)(s.HY,null,[(0,s.Wm)(i),(0,s.Wm)(n),(0,s.Wm)(l),(0,s._)("main",o,[(0,s.Wm)(p)]),(0,s.Wm)(v)],64)}var d=e(7139);const r=a=>((0,s.dD)("data-v-034a4320"),a=a(),(0,s.Cn)(),a),i={class:"app-topnav"},n={class:"container"},l={href:"javascript:;"},p=r((()=>(0,s._)("i",{class:"iconfont icon-user"},null,-1))),v=r((()=>(0,s._)("li",null,[(0,s._)("a",{href:"javascript:;"},"免费注册")],-1))),u=r((()=>(0,s._)("li",null,[(0,s._)("a",{href:"javascript:;"},"帮助中心")],-1))),_=r((()=>(0,s._)("li",null,[(0,s._)("a",{href:"javascript:;"},"关于我们")],-1))),f=r((()=>(0,s._)("li",null,[(0,s._)("a",{href:"javascript:;"},[(0,s._)("i",{class:"iconfont icon-phone"}),(0,s.Uk)("手机版")])],-1)));function b(a,t,e,o,c,r){const b=(0,s.up)("RouterLink");return(0,s.wg)(),(0,s.iD)("nav",i,[(0,s._)("div",n,[(0,s._)("ul",null,[o.profile.token?((0,s.wg)(),(0,s.iD)(s.HY,{key:0},[(0,s._)("li",null,[(0,s._)("a",l,[p,(0,s.Uk)((0,d.zw)(o.profile.account),1)])]),(0,s._)("li",null,[(0,s._)("a",{onClick:t[0]||(t[0]=(...a)=>o.logout&&o.logout(...a)),href:"javascript:;"},"退出登录")])],64)):((0,s.wg)(),(0,s.iD)(s.HY,{key:1},[(0,s._)("li",null,[(0,s.Wm)(b,{to:"/login"},{default:(0,s.w5)((()=>[(0,s.Uk)("请先登录")])),_:1})]),v],64)),(0,s._)("li",null,[(0,s.Wm)(b,{to:"/member/order"},{default:(0,s.w5)((()=>[(0,s.Uk)("我的订单")])),_:1})]),(0,s._)("li",null,[(0,s.Wm)(b,{to:"/member"},{default:(0,s.w5)((()=>[(0,s.Uk)("会员中心")])),_:1})]),u,_,f])])])}e(7658);var m=e(65),h=e(2483),w={name:"AppTopnav",setup(){const a=(0,m.oR)(),t=(0,s.Fl)((()=>a.state.user.profile)),e=(0,h.tv)(),o=()=>{a.commit("user/setUser",{}),a.commit("cart/setCartList",[]),e.push("/login")};return{profile:t,logout:o}}},g=e(89);const k=(0,g.Z)(w,[["render",b],["__scopeId","data-v-034a4320"]]);var y=k;const C=a=>((0,s.dD)("data-v-51dcd606"),a=a(),(0,s.Cn)(),a),j={class:"app-header"},W={class:"container"},A={class:"logo"},D=C((()=>(0,s._)("div",{class:"search"},[(0,s._)("i",{class:"iconfont icon-search"}),(0,s._)("input",{type:"text",placeholder:"搜一搜"})],-1)));function H(a,t,e,o,c,d){const r=(0,s.up)("RouterLink"),i=(0,s.up)("AppHeaderNav"),n=(0,s.up)("AppHeaderCart");return(0,s.wg)(),(0,s.iD)("header",j,[(0,s._)("div",W,[(0,s._)("h1",A,[(0,s.Wm)(r,{to:"/"},{default:(0,s.w5)((()=>[(0,s.Uk)("小兔鲜")])),_:1})]),(0,s.Wm)(i),D,(0,s.Wm)(n)])])}const U={class:"app-header-nav"},x={class:"home"},L=["onMousemove","onMouseleave"],z=["src"];function R(a,t,e,o,c,r){const i=(0,s.up)("RouterLink");return(0,s.wg)(),(0,s.iD)("ul",U,[(0,s._)("li",x,[(0,s.Wm)(i,{to:"/"},{default:(0,s.w5)((()=>[(0,s.Uk)("首页")])),_:1})]),((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(o.CategoryList,(a=>((0,s.wg)(),(0,s.iD)("li",{key:a.id,onMousemove:t=>o.show(a),onMouseleave:t=>o.hide(a)},[(0,s.Wm)(i,{to:`/category/${a.id}`,onClick:t=>o.hide(a)},{default:(0,s.w5)((()=>[(0,s.Uk)((0,d.zw)(a.name),1)])),_:2},1032,["to","onClick"]),(0,s._)("div",{class:(0,d.C_)(["layer",{open:!!a.open}])},[(0,s._)("ul",null,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(a.children,(t=>((0,s.wg)(),(0,s.iD)("li",{key:t.id},[(0,s.Wm)(i,{to:`/category/sub/${t.id}`,onClick:t=>o.hide(a)},{default:(0,s.w5)((()=>[(0,s._)("img",{src:t.picture},null,8,z),(0,s._)("p",null,(0,d.zw)(t.name),1)])),_:2},1032,["to","onClick"])])))),128))])],2)],40,L)))),128))])}var $={name:"AppHeaderNav",setup(a,t){const e=(0,m.oR)(),o=(0,s.Fl)((()=>e.state.category.list)),c=a=>e.commit("category/show",a),d=a=>e.commit("category/hide",a);return{CategoryList:o,show:c,hide:d}}};const I=(0,g.Z)($,[["render",R],["__scopeId","data-v-646e7062"]]);var Z=I;const T=a=>((0,s.dD)("data-v-44fbb70d"),a=a(),(0,s.Cn)(),a),Y={class:"cart"},F={class:"curr",href:"javascript:;"},N=T((()=>(0,s._)("i",{class:"iconfont icon-cart"},null,-1))),P={key:0,class:"layer"},q={class:"list"},M=["src"],K={class:"center"},S={class:"name ellipsis-2"},B={class:"attr ellipsis"},E={class:"right"},X={class:"price"},G={class:"count"},J=["onClick"],O={class:"foot"},Q={class:"total"};function V(a,t,e,o,c,r){const i=(0,s.up)("RouterLink"),n=(0,s.up)("XtxButton");return(0,s.wg)(),(0,s.iD)("div",Y,[(0,s._)("a",F,[N,(0,s._)("em",null,(0,d.zw)(a.$store.getters["cart/validTotal"]),1)]),a.$store.getters["cart/validTotal"]&&"/cart"!==a.$route.path?((0,s.wg)(),(0,s.iD)("div",P,[(0,s._)("div",q,[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(a.$store.getters["cart/validList"],(a=>((0,s.wg)(),(0,s.iD)("div",{class:"item",key:a.skuId},[(0,s.Wm)(i,{to:`/product/${a.id}`},{default:(0,s.w5)((()=>[(0,s._)("img",{src:a.picture,alt:""},null,8,M),(0,s._)("div",K,[(0,s._)("p",S,(0,d.zw)(a.name),1),(0,s._)("p",B,(0,d.zw)(a.attrsText),1)]),(0,s._)("div",E,[(0,s._)("p",X,"¥"+(0,d.zw)(a.nowPrice),1),(0,s._)("p",G,"x"+(0,d.zw)(a.count),1)])])),_:2},1032,["to"]),(0,s._)("i",{onClick:t=>o.deleteCart(a.skuId),class:"iconfont icon-close-new"},null,8,J)])))),128))]),(0,s._)("div",O,[(0,s._)("div",Q,[(0,s._)("p",null,"共 "+(0,d.zw)(a.$store.getters["cart/validTotal"])+" 件商品",1),(0,s._)("p",null,"¥"+(0,d.zw)(a.$store.getters["cart/validAmount"]),1)]),(0,s.Wm)(n,{onClick:t[0]||(t[0]=t=>a.$router.push("/cart")),type:"plain"},{default:(0,s.w5)((()=>[(0,s.Uk)("去购物车结算")])),_:1})])])):(0,s.kq)("",!0)])}var aa=e(8391),ta={name:"AppHeaderCart",setup(){const a=a=>{t.dispatch("cart/deleteCart",a).then((()=>{(0,aa.Z)({type:"success",text:"删除成功"})})).catch((a=>(0,aa.Z)({text:"删除失败",type:"error"})))},t=(0,m.oR)();return t.dispatch("cart/findCartList"),{deleteCart:a}}};const ea=(0,g.Z)(ta,[["render",V],["__scopeId","data-v-44fbb70d"]]);var sa=ea,oa={name:"AppHeader",components:{AppHeaderNav:Z,AppHeaderCart:sa}};const ca=(0,g.Z)(oa,[["render",H],["__scopeId","data-v-51dcd606"]]);var da=ca,ra=e(3947);const ia={class:"app-footer"},na=(0,s.uE)('<div class="contact" data-v-0976b2a1><div class="container" data-v-0976b2a1><dl data-v-0976b2a1><dt data-v-0976b2a1>客户服务</dt><dd data-v-0976b2a1><i class="iconfont icon-kefu" data-v-0976b2a1></i> 在线客服</dd><dd data-v-0976b2a1><i class="iconfont icon-question" data-v-0976b2a1></i> 问题反馈</dd></dl><dl data-v-0976b2a1><dt data-v-0976b2a1>关注我们</dt><dd data-v-0976b2a1><i class="iconfont icon-weixin" data-v-0976b2a1></i> 公众号</dd><dd data-v-0976b2a1><i class="iconfont icon-weibo" data-v-0976b2a1></i> 微博</dd></dl><dl data-v-0976b2a1><dt data-v-0976b2a1>下载APP</dt><dd class="qrcode" data-v-0976b2a1><img src="'+ra+'" data-v-0976b2a1></dd><dd class="download" data-v-0976b2a1><span data-v-0976b2a1>扫描二维码</span><span data-v-0976b2a1>立马下载APP</span><a href="javascript:;" data-v-0976b2a1>下载页面</a></dd></dl><dl data-v-0976b2a1><dt data-v-0976b2a1>服务热线</dt><dd class="hotline" data-v-0976b2a1>400-0000-000 <small data-v-0976b2a1>周一至周日 8:00-18:00</small></dd></dl></div></div><div class="extra" data-v-0976b2a1><div class="container" data-v-0976b2a1><div class="slogan" data-v-0976b2a1><a href="javascript:;" data-v-0976b2a1><i class="iconfont icon-footer01" data-v-0976b2a1></i><span data-v-0976b2a1>价格亲民</span></a><a href="javascript:;" data-v-0976b2a1><i class="iconfont icon-footer02" data-v-0976b2a1></i><span data-v-0976b2a1>物流快捷</span></a><a href="javascript:;" data-v-0976b2a1><i class="iconfont icon-footer03" data-v-0976b2a1></i><span data-v-0976b2a1>品质新鲜</span></a></div><div class="copyright" data-v-0976b2a1><p data-v-0976b2a1><a href="javascript:;" data-v-0976b2a1>关于我们</a><a href="javascript:;" data-v-0976b2a1>帮助中心</a><a href="javascript:;" data-v-0976b2a1>售后服务</a><a href="javascript:;" data-v-0976b2a1>配送与验收</a><a href="javascript:;" data-v-0976b2a1>商务合作</a><a href="javascript:;" data-v-0976b2a1>搜索推荐</a><a href="javascript:;" data-v-0976b2a1>友情链接</a></p><p data-v-0976b2a1>CopyRight © 小兔鲜儿</p></div></div></div>',2),la=[na];function pa(a,t,e,o,c,d){return(0,s.wg)(),(0,s.iD)("footer",ia,la)}var va={name:"AppFooter"};const ua=(0,g.Z)(va,[["render",pa],["__scopeId","data-v-0976b2a1"]]);var _a=ua,fa=e(9242);const ba={class:"container"},ma={class:"right"};function ha(a,t,e,o,c,r){const i=(0,s.up)("RouterLink"),n=(0,s.up)("AppHeaderNav");return(0,s.wg)(),(0,s.iD)("div",{class:(0,d.C_)(["app-header-sticky",{show:o.y>=78}])},[(0,s.wy)((0,s._)("div",ba,[(0,s.Wm)(i,{class:"logo",to:"/"}),(0,s.Wm)(n),(0,s._)("div",ma,[(0,s.Wm)(i,{to:"/"},{default:(0,s.w5)((()=>[(0,s.Uk)("品牌")])),_:1}),(0,s.Wm)(i,{to:"/"},{default:(0,s.w5)((()=>[(0,s.Uk)("专题")])),_:1})])],512),[[fa.F8,o.y>=78]])],2)}var wa=e(8401),ga={name:"AppHeaderSticky",components:{AppHeaderNav:Z},setup(){const{y:a}=(0,wa.b)();return{y:a}}};const ka=(0,g.Z)(ga,[["render",ha],["__scopeId","data-v-b58cefde"]]);var ya=ka,Ca={name:"xtx-layout",components:{AppTopnav:y,AppHeader:da,AppFooter:_a,AppHeaderSticky:ya},setup(){const a=(0,m.oR)();a.dispatch("category/getList")}};const ja=(0,g.Z)(Ca,[["render",c],["__scopeId","data-v-a22ef642"]]);var Wa=ja},3947:function(a,t,e){a.exports=e.p+"img/qrcode.f8ff6896.jpg"}}]);
//# sourceMappingURL=436.5e30f9c8.js.map
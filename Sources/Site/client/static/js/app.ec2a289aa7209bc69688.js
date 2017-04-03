webpackJsonp([1],[,,,,,,,,,,,function(t,e,o){"use strict";var n=o(2),a=o.n(n),s=o(3),r=o(49),i=o(32);s.a.use(r.a);var u=new r.a(i.a);u.beforeEach(function(t,e,o){t.matched.some(function(t){return t.meta.requiresAuth})?c(function(e){e?o():window.location.replace("/api/login/facebook?url="+t.fullPath)}):o()});var c=function(t){a.a.get("/api/login/me").then(function(e){t(e.data.logged)})};e.a=u},function(t,e,o){"use strict";var n=o(2),a=o.n(n),s=o(3),r=o(5);s.a.use(r.a),e.a=new r.a.Store({mutations:{SET_CURRENT_SHOOT:function(t,e){a.a.get("/api/shoots/"+e).then(function(e){t.currentShoot=e.data})}},actions:{setShoot:function(t,e){(0,t.commit)("SET_CURRENT_SHOOT",e)}},getters:{currentShoot:function(t){return t.currentShoot}},state:{currentShoot:{}}})},function(t,e,o){o(36);var n=o(1)(o(33),o(45),null,null);t.exports=n.exports},,,,,,,,,,,,,,,,,,function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(3),a=o(5),s=o(13),r=o.n(s),i=o(11),u=o(2),c=o.n(u),l=o(12);n.a.prototype.$http=c.a,n.a.config.productionTip=!1,n.a.use(a.a),new n.a({el:"#app",router:i.a,store:l.a,template:"<App/>",components:{App:r.a}})},function(t,e,o){"use strict";var n=o(42),a=o.n(n),s=o(40),r=o.n(s),i=o(41),u=o.n(i),c=o(39),l=o.n(c);e.a={routes:[{path:"/",name:"Home",component:a.a,meta:{requiresAuth:!1}},{path:"/dashboard",name:"Dashboard",component:r.a,meta:{requiresAuth:!0}},{path:"/editShoot",name:"editShoot",component:u.a,meta:{requiresAuth:!0}},{path:"/createShoot",name:"createShoot",component:l.a,meta:{requiresAuth:!0}}]}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"app",mounted:function(){$(".button-collapse").sideNav({menuWidth:200,edge:"left",closeOnClick:!0,draggable:!0})}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=o(43),a=o.n(n);e.default={components:{shootSummary:a.a},name:"dashboard",data:function(){return{shoots:[]}},created:function(){var t=this;this.$http.get("/api/shoots").then(function(e){t.shoots=e.data})}}},function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={name:"shootItem",props:["shoot"],methods:{toggleDetails:function(){this.$store.dispatch("setShoot",this.shoot.id),this.shoot.finished?this.detailVisibility=!this.detailVisibility:this.$router.push({path:"/editShoot"})}},data:function(){return{detailVisibility:!1}},computed:{borderColor:function(){return this.shoot.finished?"https://dummyimage.com/10x100/69f054/fff.png&text=+":"https://dummyimage.com/10x100/e34245/0011ff.png&text=+"}}}},function(t,e){},function(t,e){},,function(t,e,o){var n=o(1)(null,null,null,null);t.exports=n.exports},function(t,e,o){var n=o(1)(o(34),o(44),null,null);t.exports=n.exports},function(t,e,o){var n=o(1)(null,o(46),null,null);t.exports=n.exports},function(t,e,o){var n=o(1)(null,o(48),null,null);t.exports=n.exports},function(t,e,o){o(37);var n=o(1)(o(35),o(47),null,null);t.exports=n.exports},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"dashboard"},t._l(t.shoots,function(t){return o("shootSummary",{key:t.id,attrs:{shoot:t}})}))},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{attrs:{id:"app"}},[o("nav",[o("div",{staticClass:"nav-wrapper"},[o("a",{staticClass:"brand-logo",attrs:{href:"#"}},[t._v("Logo")]),t._v(" "),t._m(0),t._v(" "),o("ul",{staticClass:"right hide-on-med-and-down"},[o("li",[o("router-link",{attrs:{to:"/"}},[t._v("Home")])],1),t._v(" "),o("li",[o("router-link",{attrs:{to:"/dashboard"}},[t._v("Dashboard")])],1)]),t._v(" "),o("ul",{staticClass:"side-nav",attrs:{id:"mobile-demo"}},[o("li",[o("router-link",{attrs:{to:"/"}},[t._v("Home")])],1),t._v(" "),o("li",[o("router-link",{attrs:{to:"/dashboard"}},[t._v("Dashboard")])],1)])])]),t._v(" "),o("router-view")],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("a",{staticClass:"button-collapse",attrs:{href:"#","data-activates":"mobile-demo"}},[o("i",{staticClass:"material-icons"},[t._v("menu")])])}]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("div",{staticClass:"editShoot"},[t._v("\n  "+t._s(this.$store.getters.currentShoot)+"\n")])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"shootItem"},[o("div",{staticClass:"card horizontal"},[o("div",{staticClass:"card-image"},[o("img",{attrs:{src:t.borderColor}})]),t._v(" "),o("div",{staticClass:"card-stacked"},[o("div",{staticClass:"card-content"},[o("div",{staticClass:"tout-dedans"},[o("p",[t._v(t._s(t.shoot.title))]),t._v(" "),o("i",{staticClass:"material-icons",on:{click:t.toggleDetails}},[t._v("info")]),t._v(" "),t.detailVisibility?o("div",[t._v("\n          "+t._s(this.$store.getters.currentShoot.nb_ends)+"\n        ")]):t._e()])])])])])},staticRenderFns:[]}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},staticRenderFns:[function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"hello"},[o("p",[t._v("\n    Welcome to Shoot4Stats !!!\n  ")]),t._v(" "),o("p",[t._v("This platform allow you to save your Shoots and have some interestings stats about them !")]),t._v(" "),o("a",{attrs:{href:"/api/login/facebook?url=/dashboard"}},[t._v("Login / Register")])])}]}}],[31]);
//# sourceMappingURL=app.ec2a289aa7209bc69688.js.map
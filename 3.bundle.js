(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{18:function(e,t){},32:function(e,t,n){"use strict";n.r(t);var a=n(4),s=(n(18),n(30)),i=n(11),r=n(1),c=n(9),p=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.snap="pages",t.width=1,t.slider=new s.a,t.carousel=new i.a,t}return a.b(t,e),t.prototype.render=function(){var e=this;return Object(r.a)("div",[Object(r.a)("h1","@codeurs/front"),Object(r.a)("input[type=range]",{value:this.width,oninput:function(t){return e.width=parseFloat(t.target.value)},min:0,max:1,step:.01}),Object(r.a)("button",{onclick:function(){return e.snap="pages"==e.snap?"elements":"pages"}},"Snap to "+("pages"==this.snap?"elements":"pages")),Object(r.a)(".sliderpage",Object(r.a)(c.a,a.a({},this.carousel,{snapTo:this.snap}),[1,2,3,4,5,6,7].map(function(t,n){return Object(r.a)(".sliderpage-slide",{className:e.carousel.isActive(n)&&"is-active",style:{"min-width":100*e.width+"%"}},[t,Object(r.a)("a.sliderpage-slide-link",{onclick:function(){e.carousel.goNext()}},"next >>")])})))])},t}(n(2).a);t.default=p}}]);
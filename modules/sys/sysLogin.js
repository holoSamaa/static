/*
 Copyright (c) 2013-Now http://jeesite.com All rights reserved.

 @author ThinkGem
 @version 2019-1-6
*/
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(a,d,c){a instanceof String&&(a=String(a));for(var e=a.length,b=0;b<e;b++){var f=a[b];if(d.call(c,f,b,a))return{i:b,v:f}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,d,c){a!=Array.prototype&&a!=Object.prototype&&(a[d]=c.value)};$jscomp.getGlobal=function(a){a=["object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global,a];for(var d=0;d<a.length;++d){var c=a[d];if(c&&c.Math==Math)return c}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,d,c,e){if(d){c=$jscomp.global;a=a.split(".");for(e=0;e<a.length-1;e++){var b=a[e];b in c||(c[b]={});c=c[b]}a=a[a.length-1];e=c[a];d=d(e);d!=e&&null!=d&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:d})}};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,c){return $jscomp.findInternal(this,a,c).v}},"es6","es3");
$(function(){function a(e){0==d?(e.removeAttribute("disabled"),e.value="\u83b7\u53d6\u9a8c\u8bc1\u7801",d=60):(e.setAttribute("disabled",!0),e.value="\u91cd\u65b0\u53d1\u9001("+d+")",d--,setTimeout(function(){a(e)},1E3))}$("#username, #password").on("focus blur",function(){var a=this;setTimeout(function(){var b=$(a).css("borderColor");""!=b&&$(a).prev().css("color",b)},100)}).blur();$("#loginTab").on("shown.bs.tab",function(a){var b=$(a.target).attr("href");b&&2<b.length&&(b=b.substring(1),$(this).parent().find(".tab-pane."+
b).addClass("active"));(b=$(a.relatedTarget).attr("href"))&&2<b.length&&(b=b.substring(1),$(this).parent().find(".tab-pane."+b).removeClass("active"));(a=$(a.target).attr("action"))&&""!=a&&$("#loginForm").attr("action",a)});var d=60;$("#sendLoginValidCode").click(function(){if(""==$("#validCode").val())$("#isValidCodeLogin").show(),$("#validCodeImg").click();else{var c=this;js.ajaxSubmit(ctxPath+"/account/getLoginValidCode",{validType:"mobile",username:$("#username").val(),validCode:$("#validCode").val()},
function(b){js.showMessage(b.message);"true"==b.result?(a(c),$("#loginValidCode").focus()):$("#validCodeImg").click()})}});$("#loginForm").validate({ignore:":hidden",submitHandler:function(a){var b=$(a);a=b.attr("action");b=b.serializeArray();var c=window.secretKey||$("#loginKey").data("key");if(""!=c)for(var d=0,e=b.length;d<e;d++)"username"==b[d].name?b[d].value=DesUtils.encode($("#username").val(),c):"password"==b[d].name?b[d].value=DesUtils.encode($("#password").val(),c):"validCode"==b[d].name&&
(b[d].value=DesUtils.encode($("#validCode").val(),c));js.ajaxSubmit(a,b,function(a,b,c){1==a.isValidCodeLogin&&($("#isValidCodeLogin").show(),$("#validCodeRefresh").click());"false"==a.result?a.message&&0<a.message.length&&js.showMessage(a.message):(js.loading($("#btnSubmit").data("loading")),location=a.__url&&""!=a.__url?a.__url:ctx+"/index")},"json",!0,$("#btnSubmit").data("loginValid"));$("#password").select().focus()}});var c=$("#loginForm [name=__url]");0<c.length&&""!=c.val()&&c.val(c.val()+
window.location.hash)});

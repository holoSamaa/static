var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(b,e,d){b instanceof String&&(b=String(b));for(var h=b.length,k=0;k<h;k++){var z=b[k];if(e.call(d,z,k,b))return{i:k,v:z}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(b,e,d){b!=Array.prototype&&b!=Object.prototype&&(b[e]=d.value)};$jscomp.getGlobal=function(b){b=["object"==typeof window&&window,"object"==typeof self&&self,"object"==typeof global&&global,b];for(var e=0;e<b.length;++e){var d=b[e];if(d&&d.Math==Math)return d}throw Error("Cannot find global object");};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(b,e,d,h){if(e){d=$jscomp.global;b=b.split(".");for(h=0;h<b.length-1;h++){var k=b[h];k in d||(d[k]={});d=d[k]}b=b[b.length-1];h=d[b];e=e(h);e!=h&&null!=e&&$jscomp.defineProperty(d,b,{configurable:!0,writable:!0,value:e})}};$jscomp.polyfill("Array.prototype.find",function(b){return b?b:function(b,d){return $jscomp.findInternal(this,b,d).v}},"es6","es3");
jQuery.fn.searchFilter=function(b,e){return new function(d,b,e){this.$=d;this.add=function(a){null==a?d.find(".ui-add-last").click():d.find(".sf:eq("+a+") .ui-add").click();return this};this.del=function(a){null==a?d.find(".sf:last .ui-del").click():d.find(".sf:eq("+a+") .ui-del").click();return this};this.search=function(a){d.find(".ui-search").click();return this};this.reset=function(a){void 0===a&&(a=!1);d.find(".ui-reset").trigger("click",[a]);return this};this.close=function(){d.find(".ui-closer").click();
return this};if(null!=b){var h=function(a,c){var b=d.find("tr.sf td.data "+a);null!=b[0]&&jQuery.each(c,function(){null!=this.data?b.bind(this.type,this.data,this.fn):b.bind(this.type,this.fn)})},k=function(a,c){a=d.find("tr.sf td.data "+a);null!=a[0]&&c(a)},v=function(a,c,b){return"<select class='"+a+"'"+(b?" style='display:none;'":"")+">"+c+"</select>"},m=function(a,c){return"<option value='"+a+"'>"+c+"</option>"},A=function(a){jQuery(this).toggleClass("ui-state-active","mousedown"==a.type);return!1},
B=function(){jQuery(this).toggleClass("ui-state-hover");return!1},g=jQuery.extend({},jQuery.fn.searchFilter.defaults,e),n=-1,r="";jQuery.each(g.groupOps,function(){r+=m(this.op,this.text)});r="<select name='groupOp'>"+r+"</select>";d.html("").addClass("ui-searchFilter").append("<div class='ui-widget-overlay' style='z-index: -1'>&#160;</div><table class='ui-widget-content ui-corner-all'><thead><tr><td colspan='5' class='ui-widget-header ui-corner-all' style='line-height: 18px;'><div class='ui-closer ui-state-default ui-corner-all ui-helper-clearfix' style='float: right;'><span class='ui-icon ui-icon-close'></span></div>"+
g.windowTitle+"</td></tr></thead><tbody><tr class='sf'><td class='fields'></td><td class='ops'></td><td class='data'></td><td><div class='ui-del ui-state-default ui-corner-all'><span class='ui-icon ui-icon-minus'></span></div></td><td><div class='ui-add ui-state-default ui-corner-all'><span class='ui-icon ui-icon-plus'></span></div></td></tr><tr><td colspan='5' class='divider'><hr class='ui-widget-content' style='margin:1px'/></td></tr></tbody><tfoot><tr><td colspan='3'><span class='ui-reset ui-state-default ui-corner-all' style='display: inline-block; float: left;'><span class='ui-icon ui-icon-arrowreturnthick-1-w' style='float: left;'></span><span style='line-height: 18px; padding: 0 7px 0 3px;'>"+
g.resetText+"</span></span><span class='ui-search ui-state-default ui-corner-all' style='display: inline-block; float: right;'><span class='ui-icon ui-icon-search' style='float: left;'></span><span style='line-height: 18px; padding: 0 7px 0 3px;'>"+g.searchText+"</span></span><span class='matchText'>"+g.matchText+"</span> "+r+" <span class='rulesText'>"+g.rulesText+"</span></td><td>&#160;</td><td><div class='ui-add-last ui-state-default ui-corner-all'><span class='ui-icon ui-icon-plusthick'></span></div></td></tr></tfoot></table>");
var w=d.find("tr.sf"),C=w.find("td.fields"),x=w.find("td.ops"),p=w.find("td.data"),t="";jQuery.each(g.operators,function(){t+=m(this.op,this.text)});t=v("default",t,!0);x.append(t);p.append("<input type='text' class='default' style='display:none;' />");var u="",y=!1,q=!1;jQuery.each(b,function(a){u+=m(this.itemval,this.text);if(null!=this.ops){y=!0;var c="";jQuery.each(this.ops,function(){c+=m(this.op,this.text)});c=v("field"+a,c,!0);x.append(c)}if(null!=this.dataUrl){a>n&&(n=a);q=!0;var b=this.dataEvents,
D=this.dataInit,e=this.buildSelect;jQuery.ajax(jQuery.extend({url:this.dataUrl,complete:function(c){c=null!=e?jQuery("<div />").append(e(c)):jQuery("<div />").append(c.responseText);c.find("select").addClass("field"+a).hide();p.append(c.html());D&&k(".field"+a,D);b&&h(".field"+a,b);a==n&&d.find("tr.sf td.fields select[name='field']").change()}},g.ajaxSelectOptions))}else if(null!=this.dataValues){q=!0;var l="";jQuery.each(this.dataValues,function(){l+=m(this.value,this.text)});l=v("field"+a,l,!0);
p.append(l)}else if(null!=this.dataEvents||null!=this.dataInit)q=!0,l="<input type='text' class='field"+a+"' />",p.append(l);null!=this.dataInit&&a!=n&&k(".field"+a,this.dataInit);null!=this.dataEvents&&a!=n&&h(".field"+a,this.dataEvents)});u="<select name='field'>"+u+"</select>";C.append(u);b=C.find("select[name='field']");y?b.change(function(a){var c=a.target.selectedIndex;a=jQuery(a.target).parents("tr.sf").find("td.ops");a.find("select").removeAttr("name").hide();c=a.find(".field"+c);null==c[0]&&
(c=a.find(".default"));c.attr("name","op").show();return!1}):x.find(".default").attr("name","op").show();q?b.change(function(a){var c=a.target.selectedIndex;a=jQuery(a.target).parents("tr.sf").find("td.data");a.find("select,input").removeClass("vdata").hide();c=a.find(".field"+c);null==c[0]&&(c=a.find(".default"));c.show().addClass("vdata");return!1}):p.find(".default").show().addClass("vdata");(y||q)&&b.change();d.find(".ui-state-default").hover(B,B).mousedown(A).mouseup(A);d.find(".ui-closer").click(function(a){g.onClose(jQuery(d.selector));
return!1});d.find(".ui-del").click(function(a){a=jQuery(a.target).parents(".sf");0<a.siblings(".sf").length?(!0===g.datepickerFix&&void 0!==jQuery.fn.datepicker&&a.find(".hasDatepicker").datepicker("destroy"),a.remove()):(a.find("select[name='field']")[0].selectedIndex=0,a.find("select[name='op']")[0].selectedIndex=0,a.find(".data input").val(""),a.find(".data select").each(function(){this.selectedIndex=0}),a.find("select[name='field']").change(function(a){a.stopPropagation()}));return!1});d.find(".ui-add").click(function(a){a=
jQuery(a.target).parents(".sf");var c=a.clone(!0).insertAfter(a);c.find(".ui-state-default").removeClass("ui-state-hover ui-state-active");if(g.clone){c.find("select[name='field']")[0].selectedIndex=a.find("select[name='field']")[0].selectedIndex;null!=c.find("select[name='op']")[0]&&(c.find("select[name='op']").focus()[0].selectedIndex=a.find("select[name='op']")[0].selectedIndex);var b=c.find("select.vdata");null!=b[0]&&(b[0].selectedIndex=a.find("select.vdata")[0].selectedIndex)}else c.find(".data input").val(""),
c.find("select[name='field']").focus();!0===g.datepickerFix&&void 0!==jQuery.fn.datepicker&&a.find(".hasDatepicker").each(function(){var a=jQuery.data(this,"datepicker").settings;c.find("#"+this.id).unbind().removeAttr("id").removeClass("hasDatepicker").datepicker(a)});c.find("select[name='field']").change(function(a){a.stopPropagation()});return!1});d.find(".ui-search").click(function(a){a=jQuery(d.selector);var c=a.find("select[name='groupOp'] :selected").val();var b=g.stringResult?'{"groupOp":"'+
c+'","rules":[':{groupOp:c,rules:[]};a.find(".sf").each(function(a){var c=jQuery(this).find("select[name='field'] :selected").val(),d=jQuery(this).find("select[name='op'] :selected").val(),f=jQuery(this).find("input.vdata,select.vdata :selected").val();f+="";g.stringResult?(f=f.replace(/\\/g,"\\\\").replace(/"/g,'\\"'),0<a&&(b+=","),b+='{"field":"'+c+'",',b+='"op":"'+d+'",',b+='"data":"'+f+'"}'):b.rules.push({field:c,op:d,data:f})});g.stringResult&&(b+="]}");g.onSearch(b);return!1});d.find(".ui-reset").click(function(a,
c){a=jQuery(d.selector);a.find(".ui-del").click();a.find("select[name='groupOp']")[0].selectedIndex=0;g.onReset(c);return!1});d.find(".ui-add-last").click(function(){var a=jQuery(d.selector+" .sf:last"),c=a.clone(!0).insertAfter(a);c.find(".ui-state-default").removeClass("ui-state-hover ui-state-active");c.find(".data input").val("");c.find("select[name='field']").focus();!0===g.datepickerFix&&void 0!==jQuery.fn.datepicker&&a.find(".hasDatepicker").each(function(){var a=jQuery.data(this,"datepicker").settings;
c.find("#"+this.id).unbind().removeAttr("id").removeClass("hasDatepicker").datepicker(a)});c.find("select[name='field']").change(function(a){a.stopPropagation()});return!1});this.setGroupOp=function(a){selDOMobj=d.find("select[name='groupOp']")[0];var c={},b=selDOMobj.options.length,e;for(e=0;e<b;e++)c[selDOMobj.options[e].value]=e;selDOMobj.selectedIndex=c[a];jQuery(selDOMobj).change(function(a){a.stopPropagation()})};this.setFilter=function(a){var c=a.sfref;a=a.filter;var b=[],d,g,l={};selDOMobj=
c.find("select[name='field']")[0];var f=0;for(d=selDOMobj.options.length;f<d;f++)l[selDOMobj.options[f].value]={index:f,ops:{}},b.push(selDOMobj.options[f].value);f=0;for(d=b.length;f<d;f++){if(selDOMobj=c.find(".ops > select[class='field"+f+"']")[0]){var h=0;for(g=selDOMobj.options.length;h<g;h++)l[b[f]].ops[selDOMobj.options[h].value]=h}if(selDOMobj=c.find(".data > select[class='field"+f+"']")[0])for(l[b[f]].data={},h=0,g=selDOMobj.options.length;h<g;h++)l[b[f]].data[selDOMobj.options[h].value]=
h}var k;b=a.field;l[b]&&(k=l[b].index);if(null!=k){var m=l[b].ops[a.op];if(void 0===m)for(f=0,d=e.operators.length;f<d;f++)if(e.operators[f].op==a.op){m=f;break}var n=a.data;var p=null==l[b].data?-1:l[b].data[n]}if(null!=k&&null!=m&&null!=p){c.find("select[name='field']")[0].selectedIndex=k;c.find("select[name='field']").change();c.find("select[name='op']")[0].selectedIndex=m;c.find("input.vdata").val(n);if(c=c.find("select.vdata")[0])c.selectedIndex=p;return!0}return!1}}}(this,b,e)};
jQuery.fn.searchFilter.version="1.2.9";
jQuery.fn.searchFilter.defaults={clone:!0,datepickerFix:!0,onReset:function(b){alert("Reset Clicked. Data Returned: "+b)},onSearch:function(b){alert("Search Clicked. Data Returned: "+b)},onClose:function(b){b.hide()},groupOps:[{op:"AND",text:"all"},{op:"OR",text:"any"}],operators:[{op:"eq",text:"is equal to"},{op:"ne",text:"is not equal to"},{op:"lt",text:"is less than"},{op:"le",text:"is less or equal to"},{op:"gt",text:"is greater than"},{op:"ge",text:"is greater or equal to"},{op:"in",text:"is in"},
{op:"ni",text:"is not in"},{op:"bw",text:"begins with"},{op:"bn",text:"does not begin with"},{op:"ew",text:"ends with"},{op:"en",text:"does not end with"},{op:"cn",text:"contains"},{op:"nc",text:"does not contain"}],matchText:"match",rulesText:"rules",resetText:"Reset",searchText:"Search",stringResult:!0,windowTitle:"Search Rules",ajaxSelectOptions:{}};

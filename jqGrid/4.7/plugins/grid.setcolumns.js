(function(b){b.jgrid.extend({setColumns:function(a){a=b.extend({top:0,left:0,width:200,height:"auto",dataheight:"auto",modal:!1,drag:!0,beforeShowForm:null,afterShowForm:null,afterSubmitForm:null,closeOnEscape:!0,ShrinkToFit:!1,jqModal:!1,saveicon:[!0,"left","ui-icon-disk"],closeicon:[!0,"left","ui-icon-close"],onClose:null,colnameview:!0,closeAfterSubmit:!0,updateAfterCheck:!1,recreateForm:!1},b.jgrid.col,a||{});return this.each(function(){var d=this;if(d.grid){var h="function"===typeof a.beforeShowForm?
!0:!1,k="function"===typeof a.afterShowForm?!0:!1,l="function"===typeof a.afterSubmitForm?!0:!1,f=d.p.id,c="ColTbl_"+f,g={themodal:"colmod"+f,modalhead:"colhd"+f,modalcontent:"colcnt"+f,scrollelm:c};!0===a.recreateForm&&null!=b("#"+g.themodal).html()&&b("#"+g.themodal).remove();if(null!=b("#"+g.themodal).html())h&&a.beforeShowForm(b("#"+c)),b.jgrid.viewModal("#"+g.themodal,{gbox:"#gbox_"+f,jqm:a.jqModal,jqM:!1,modal:a.modal});else{var e=isNaN(a.dataheight)?a.dataheight:a.dataheight+"px";e="<div id='"+
c+"' class='formdata' style='width:100%;overflow:auto;position:relative;height:"+e+";'><table class='ColTable' cellspacing='1' cellpading='2' border='0'><tbody>";for(i=0;i<this.p.colNames.length;i++)d.p.colModel[i].hidedlg||(e+="<tr><td style='white-space: pre;'><input type='checkbox' style='margin-right:5px;' id='col_"+this.p.colModel[i].name+"' class='cbox' value='T' "+(!1===this.p.colModel[i].hidden?"checked":"")+"/><label for='col_"+this.p.colModel[i].name+"'>"+this.p.colNames[i]+(a.colnameview?
" ("+this.p.colModel[i].name+")":"")+"</label></td></tr>");e=e+"</tbody></table></div><table border='0' class='EditTable' id='"+(c+"_2'><tbody><tr style='display:block;height:3px;'><td></td></tr><tr><td class='DataTD ui-widget-content'></td></tr><tr><td class='ColButton EditButton'>"+(a.updateAfterCheck?"":"<a href='javascript:void(0)' id='dData' class='fm-button ui-state-default ui-corner-all'>"+a.bSubmit+"</a>")+"&#160;<a href='javascript:void(0)' id='eData' class='fm-button ui-state-default ui-corner-all'>"+
(a.bCancel+"</a></td></tr></tbody></table>"));a.gbox="#gbox_"+f;b.jgrid.createModal(g,e,a,"#gview_"+d.p.id,b("#gview_"+d.p.id)[0]);1==a.saveicon[0]&&b("#dData","#"+c+"_2").addClass("right"==a.saveicon[1]?"fm-button-icon-right":"fm-button-icon-left").append("<span class='ui-icon "+a.saveicon[2]+"'></span>");1==a.closeicon[0]&&b("#eData","#"+c+"_2").addClass("right"==a.closeicon[1]?"fm-button-icon-right":"fm-button-icon-left").append("<span class='ui-icon "+a.closeicon[2]+"'></span>");a.updateAfterCheck?
b(":input","#"+c).click(function(c){if(c=this.id.substr(4))this.checked?b(d).jqGrid("showCol",c):b(d).jqGrid("hideCol",c),!0===a.ShrinkToFit&&b(d).jqGrid("setGridWidth",d.grid.width-.001,!0);return this}):b("#dData","#"+c+"_2").click(function(e){for(i=0;i<d.p.colModel.length;i++)d.p.colModel[i].hidedlg||(e=d.p.colModel[i].name.replace(/\./g,"\\."),b("#col_"+e,"#"+c).attr("checked")?(b(d).jqGrid("showCol",d.p.colModel[i].name),b("#col_"+e,"#"+c).attr("defaultChecked",!0)):(b(d).jqGrid("hideCol",d.p.colModel[i].name),
b("#col_"+e,"#"+c).attr("defaultChecked","")));!0===a.ShrinkToFit&&b(d).jqGrid("setGridWidth",d.grid.width-.001,!0);a.closeAfterSubmit&&b.jgrid.hideModal("#"+g.themodal,{gb:"#gbox_"+f,jqm:a.jqModal,onClose:a.onClose});l&&a.afterSubmitForm(b("#"+c));return!1});b("#eData","#"+c+"_2").click(function(c){b.jgrid.hideModal("#"+g.themodal,{gb:"#gbox_"+f,jqm:a.jqModal,onClose:a.onClose});return!1});b("#dData, #eData","#"+c+"_2").hover(function(){b(this).addClass("ui-state-hover")},function(){b(this).removeClass("ui-state-hover")});
h&&a.beforeShowForm(b("#"+c));b.jgrid.viewModal("#"+g.themodal,{gbox:"#gbox_"+f,jqm:a.jqModal,jqM:!0,modal:a.modal})}k&&a.afterShowForm(b("#"+c))}})}})})(jQuery);

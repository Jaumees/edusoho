webpackJsonp(["app/js/task/plugin/note/index"],{0:function(e,a){e.exports=jQuery},"4e9506cac544b82346a8":function(e,a,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.saveRedmineSuccess=a.saveRedmineLoading=void 0;var n=t("3c398f87808202f19beb"),i=$("[data-role=saved-message]");(0,n.dateFormat)();var s=function(){i.html(Translator.trans("task.plugin_redmine_save_hint")).show()},o=function(){var e=(new Date).Format("yyyy-MM-dd hh:mm:ss");i.html(Translator.trans("task.plugin_redmine_save_success_hint",{date:e})).show(),setTimeout(function(){i.hide()},3e3)};a.saveRedmineLoading=s,a.saveRedmineSuccess=o},"6d3dc82200e71802144f":function(e,a,t){"use strict";function n(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null;if(!$.trim(r.val()))return void(e&&(0,s.default)("danger","请输入笔记内容！"));var a=$("#task-note-plugin-form"),t=a.serializeArray();l!==t[0].value&&((0,o.saveRedmineLoading)(),e&&e.attr("disabled","disabled"),$.post(a.attr("action"),t).then(function(a){(0,o.saveRedmineSuccess)(),e&&e.removeAttr("disabled"),l=t[0].value}))}var i=t("b334fd7e4c5a19234db2"),s=function(e){return e&&e.__esModule?e:{default:e}}(i),o=t("4e9506cac544b82346a8"),d=$(".js-sidebar-pane").height()-175,r=$("#note-content-field"),l=void 0,c=CKEDITOR.replace("note-content-field",{toolbar:"Simple",filebrowserImageUploadUrl:r.data("imageUploadUrl"),allowedContent:!0,height:d<300?200:d});c.on("change",function(){r.val(c.getData())}),$("#note-save-btn").click(function(e){var a=$(this);e.preventDefault(),n(a)}),setInterval(n,3e4)}},["6d3dc82200e71802144f"]);
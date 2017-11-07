webpackJsonp(["app/js/activity-manage/video/index"],{0:function(e,t){e.exports=jQuery},"8a431cc78fb5d375c291":function(e,t,i){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),o=i("eca7a2561fa47d3f75f6"),s=n(o),l=i("b00a2728f54f5fed6ab0"),d=n(l),u=function(){function e(){a(this,e),this.showChooseContent(),this.initStep2form(),this.isInitStep3from(),this.autoValidatorLength(),this.initfileChooser(),this.hideSubtitleWidget()}return r(e,[{key:"hideSubtitleWidget",value:function(){var e=$("#video-subtitle-form-group");$('[role="presentation"] a[href!="#import-video-panel"]').click(function(){e.show()}),$('a[href="#import-video-panel"]').click(function(){e.hide()})}},{key:"showChooseContent",value:function(){$("#iframe-content").on("click",".js-choose-trigger",function(e){s.default.openUI(),$('[name="ext[mediaSource]"]').val(null)})}},{key:"displayFinishCondition",value:function(e){"self"===e?($("#finish-condition option[value=end]").removeAttr("disabled"),$("#finish-condition option[value=end]").text(Translator.trans("activity.video_manage.finish_detail"))):($("#finish-condition option[value=end]").text(Translator.trans("activity.video_manage.other_finish_detail")),$("#finish-condition option[value=end]").attr("disabled","disabled"),$("#finish-condition option[value=time]").attr("selected",!1),$("#finish-condition option[value=time]").attr("selected",!0),$(".viewLength").removeClass("hidden"),this.initStep3from())}},{key:"initStep2form",value:function(){var e=$("#step2-form"),t=e.data("validator");e.validate({groups:{date:"minute second"},rules:{title:{required:!0,maxlength:50,trim:!0,course_title:!0},minute:"required unsigned_integer",second:"required second_range","ext[mediaSource]":"required","ext[finishDetail]":"unsigned_integer"},messages:{minute:{required:Translator.trans("activity.video_manage.length_required_error_hint")},second:{required:Translator.trans("activity.video_manage.length_unsigned_integer_error_hint"),second_range:Translator.trans("activity.video_manage.second_range_error_hint")},"ext[mediaSource]":Translator.trans("activity.video_manage.media_error_hint")}}),e.data("validator",t)}},{key:"initStep3from",value:function(){var e=$("#step3-form"),t=e.data("validator");e.validate({rules:{"ext[finishDetail]":{required:!0,positive_integer:!0,max:300,min:1}},messages:{"ext[finishDetail]":{required:Translator.trans("activity.video_manage.length_required_error_hint")}}}),e.data("validator",t)}},{key:"autoValidatorLength",value:function(){$(".js-length").blur(function(){var e=$("#step2-form").data("validator");if(e&&e.form()){var t=0|parseInt($("#minute").val()),i=0|parseInt($("#second").val());$("#length").val(60*t+i)}})}},{key:"isInitStep3from",value:function(){var e=this;"time"===$("#finish-condition").children("option:selected").val()&&($(".viewLength").removeClass("hidden"),this.initStep3from()),$("#finish-condition").on("change",function(t){"time"==t.target.value?($(".viewLength").removeClass("hidden"),e.initStep3from()):($(".viewLength").addClass("hidden"),$('input[name="ext[finishDetail]"]').rules("remove"))})}},{key:"initfileChooser",value:function(){var e=this,t=new s.default,i=new d.default(".js-subtitle-list"),n=function(t){e.displayFinishCondition(t.source),s.default.closeUI();!function(e){if(0!==e.length&&void 0!==e.length){var t=$("#minute"),i=$("#second"),n=$("#length"),a=parseInt(e.length),r=parseInt(a/60),o=a%60;t.val(r),i.val(o),n.val(a),e.minute=r,e.second=o}$('[name="media"]').val(JSON.stringify(e))}(t),$('[name="ext[mediaSource]"]').val(t.source),$("#step2-form").valid(),"self"==t.source?($("#ext_mediaId").val(t.id),$("#ext_mediaUri").val("")):($("#ext_mediaUri").val(t.uri),$("#ext_mediaId").val(0)),i.render(t)};t.on("select",n)}}]),e}();t.default=u},b00a2728f54f5fed6ab0:function(e,t,i){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var a=function(){function e(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,i,n){return i&&e(t.prototype,i),n&&e(t,n),t}}(),r=i("b334fd7e4c5a19234db2"),o=function(e){return e&&e.__esModule?e:{default:e}}(r),s=function(){function e(t){n(this,e),this.upload_id="subtitle-uploader",this.inited=!1,this.element=$(t),this.element.length>0&&(this.init(),this.inited=!0);var i=this.element.closest("#video-subtitle-form-group");i.find("#ext_mediaId_for_subtitle").val()>0&&this.render({id:i.find("#ext_mediaId_for_subtitle").val()})}return a(e,[{key:"init",value:function(){var e=this;this.element.on("click",".js-subtitle-delete",function(){var t=$(this);$.post(t.data("subtitleDeleteUrl"),function(i){i&&((0,o.default)("success",Translator.trans("activity.video_manage.delete_success_hint")),t.parent().remove(),$("#"+e.upload_id).show())})})}},{key:"render",value:function(e){if(this.inited&&e&&"id"in e&&e.id>0){this.media=e,this.element.html(Translator.trans("activity.video_manage.subtitle_load_hint"));var t=this;$.get(this.element.data("dialogUrl"),{mediaId:this.media.id},function(e){t.element.html(e),t.initUploader()})}}},{key:"initUploader",value:function(){var e=this,t=$("#"+this.upload_id),i=$(".js-subtitle-dialog").data("mediaId"),n=t.data("mediaGlobalId");this.uploader&&this._destroyUploader();var a=new UploaderSDK({initUrl:t.data("initUrl"),finishUrl:t.data("finishUrl"),id:this.upload_id,ui:"simple",multi:!0,accept:{extensions:["srt"],mimeTypes:["text/srt"]},type:"sub",process:{videoNo:n},locale:document.documentElement.lang});a.on("error",function(e){"Q_TYPE_DENIED"===e.error&&(0,o.default)("danger",Translator.trans("activity.video_manage.subtitle_upload_error_hint"))}),a.on("file.finish",function(n){$.post(t.data("subtitleCreateUrl"),{name:n.name,subtitleId:n.id,mediaId:i}).success(function(t){var n={waiting:Translator.trans("activity.video_manage.convert_status_waiting"),doing:Translator.trans("activity.video_manage.convert_status_doing"),success:Translator.trans("activity.video_manage.convert_status_success"),error:Translator.trans("activity.video_manage.convert_status_error"),none:Translator.trans("activity.video_manage.convert_status_none")};$(".js-media-subtitle-list").append('<li class="pvs"><span class="subtitle-name prl">'+t.name+'</span><span class="subtitle-transcode-status '+t.convertStatus+'">'+n[t.convertStatus]+'</span><a href="javascript:;" class="btn-link pll color-primary js-subtitle-delete" data-subtitle-delete-url="/media/'+i+"/subtitle/"+t.id+'/delete">'+Translator.trans("activity.video_manage.subtitle_delete_hint")+"</a></li>"),$(".js-media-subtitle-list li").length>3&&$("#"+e.upload_id).hide(),(0,o.default)("success",Translator.trans("activity.video_manage.subtitle_upload_success_hint"))}).error(function(e){(0,o.default)("danger",e.responseJSON.error.message)})}),this.uploader=a}},{key:"show",value:function(){var e=this.element.parent(".form-group");e.length>0&&e.removeClass("hide")}},{key:"hide",value:function(){var e=this.element.parent(".form-group");e.length>0&&e.addClass("hide")}},{key:"_destroyUploader",value:function(){if(this.uploader){this.uploader.__events=null;try{this.uploader.destroy()}catch(e){}this.uploader=null}}},{key:"destroy",value:function(){this.inited&&this._destroyUploader()}}]),e}();t.default=s},ea5a4c822aae61666680:function(e,t,i){"use strict";var n=i("8a431cc78fb5d375c291");new(function(e){return e&&e.__esModule?e:{default:e}}(n).default)}},["ea5a4c822aae61666680"]);
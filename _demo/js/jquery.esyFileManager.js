/*! esyFileManager3 - v3.0.1 - 2015-07-07 */;(function($) {

$.fn.esyFileManager = function(options) {
  var o = $.extend({}, $.fn.esyFileManager.defaults, options);
  var $this;
  var $that;
  	debug("[EsyFileManager 3.0.0] - DEBUG MODE ACTIVE");
    return this.each(function() {
    $this = $(this);
		debug("[EsyFileManager 3.0.0] - CHECK THE MODE - ref: head.js - LINE:10");
		//debug(o.mode);
		switch(o.mode.type) {
			case "button":
				debug("[EsyFileManager 3.0.0] - ATTACH THE WRAPPER - ref: head.js - LINE:12");
				if($this.parent("."+o.prefix+"wrapper").length == 0) {
					$this
						.wrap("<div class='"+o.prefix+"wrapper'></div>")
						.after("<div class='"+o.prefix+"button "+o.mode.selector+"'></div>");
				}
				$click=$("."+o.mode.selector);
				break;
			default:
				$click=$this;
				break;
		}
		debug("[EsyFileManager 3.0.0] - THE MODE IS: "+o.mode.type+" - ref: head.js - LINE:17");
		
		$click.click(function(){ 
			debug("[EsyFileManager 3.0.0] - OPEN THE FILEMANAGER - ref: head.js - LINE:20");
			if($("."+o.prefix+"esyFileManager").length==0){
				pos=position($this, 10);
				style="top: width:"+pos.width+"; height:"+pos.height+";";
				
				debug("[EsyFileManager 3.0.0] - RENDER THE FILEMANAGER TEMPLATE - ref: head.js - LINE:16");
				$("body").append($(template(style)).hide());
				$("."+o.prefix+"esyFileManager").position({
			        my: pos.my,
			        at: pos.at,
			        of: pos.of,
			        collision: "none"
			    });
				close();
				fullscreen();
				
				debug("[EsyFileManager 3.0.0] - RENDER THE FUNCTIONS TEMPLATE - ref: head.js - LINE:19");
				$(functionsTpl()).appendTo("."+o.prefix+"functions");
				
				if($("#qq-template").length==0){
					debug("[EsyFileManager 3.0.0] - RENDER THE UPLOADER TEMPLATE - ref: head.js - LINE:23");
					$("body").append($(uploaderTpl()).hide()); 
				}
				
				debug("[EsyFileManager 3.0.0] - TEMPLATE RENDERING COMPLETE - ref: head.js - LINE:25");
				//ADJUST HEIGHT FOR RESIZE
				$that=$("."+o.prefix+"esyFileManager");
				$h=$("."+o.prefix+"esyFileManager").height();
				$("."+o.prefix+"files").height($h-80);
				$("."+o.prefix+"esyFileManager").fadeIn("slow");
				$("."+o.prefix+"list").disableSelection();
				//END
				
				
				$("."+o.prefix+"esyFileManager").draggable({
					handle: "."+o.prefix+"head",
					start: function(){
						debug("[EsyFileManager 3.0.0] - START DRAGGING THE FILEMANAGER - ref: head.js - LINE:38");
						$("."+o.prefix+"head").addClass("grabbing");
					},
					stop: function(){
						debug("[EsyFileManager 3.0.0] - STOP DRAGGING THE FILEMANAGER - ref: head.js - LINE:42");
					    $("."+o.prefix+"head").removeClass("grabbing");
					}
				}).resizable({
					resize: function(){
						debug("[EsyFileManager 3.0.0] - RESIZE FILEMANAGER - ref: head.js - LINE:47");
						$h=$("."+o.prefix+"esyFileManager").height();
						$("."+o.prefix+"files").height($h-80);
					}
				});
				
				listfiles();
			}
		});
  
  });
  
  
function template(style) {
	var tpl = "";
	tpl += "<div class='" + o.prefix + "esyFileManager' style='" + style + "'>";
	tpl += "<div class='" + o.prefix + "head'>esyFileManager3";
	tpl += "<div class='" + o.prefix + "close'>X</div>";
	tpl += "</div>";
	tpl += "<div class='" + o.prefix + "functions'>";
	//tpl+="<div class='"+o.prefix+"close'>X</div>";
	tpl += "</div>";
	tpl += "<div class='" + o.prefix + "files'>";
	tpl += "<ul class='" + o.prefix + "list'>";
	tpl += "</ul>";
	tpl += "</div>";
	tpl += "</div>";
	return tpl;
}

function fileTemplate(filename, icon, size) {
	var tpl = "";
	tpl += "<li>";
	tpl += "<div class='" + o.prefix + "file'>";
	tpl += "<div class='" + o.prefix + "icon " + icon + "'></div>";
	if (o.size === true) {
		tpl += "<div class='" + o.prefix + "size'>" + size + "</div>";
		pl = "";
	} else {
		pl = pl = "style='padding-right:0px;'";
	}
	tpl += "<div class='" + o.prefix + "name' " + pl + " >" + filename + "</div>";
	tpl += "</div>";
	tpl += "</li>";
	return tpl;
}

function totalProgressTpl(){
	$progressbar="<div class='" + o.prefix + "progress'><div></div></div>";
	return $progressbar;
}

function functionsTpl() {
	var tpl = "";
	if (o.del.allowDelete === true) {
		tpl += "<div class='" + o.prefix + "delete'>";
		tpl += "</div>";
	}

	tpl += "<div class='" + o.prefix + "attach'>";
	tpl += "</div>";
	tpl += "<div class='" + o.prefix + "info'>";
	tpl += "</div>";
	tpl += "<div class='" + o.prefix + "upload'>";
	tpl += "</div>";
	tpl += totalProgressTpl();
	return tpl;
}


function uploaderTpl() {
	$uploaderTpl='<div type="text/template" id="qq-template">'+
	  '<div class="qq-uploader-selector qq-uploader">'+
	    '<div class="qq-upload-drop-area-selector qq-upload-drop-area" qq-hide-dropzone>'+
	      '<span>Drop files here to upload</span>'+
	    '</div>'+
	    '<div class="qq-upload-button-selector qq-upload-button">'+
	      
	    '</div>'+
	    '<span class="qq-drop-processing-selector qq-drop-processing">'+
	      '<span class="qq-drop-processing-spinner-selector qq-drop-processing-spinner"></span>'+
	    '</span>'+
	    '<ul class="qq-upload-list-selector qq-upload-list">'+
	      '<li>'+
	        '<div class="qq-progress-bar-container-selector">'+
	          '<div class="qq-progress-bar-selector qq-progress-bar"></div>'+
	        '</div>'+
	        '<span class="qq-upload-spinner-selector qq-upload-spinner"></span>'+
	        '<span class="qq-edit-filename-icon-selector qq-edit-filename-icon"></span>'+
	        '<span class="qq-upload-file-selector qq-upload-file"></span>'+
	        '<input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">'+
	        '<span class="qq-upload-size-selector qq-upload-size"></span>'+
	        '<a class="qq-upload-cancel-selector qq-upload-cancel" href="#">Cancel</a>'+
	        '<a class="qq-upload-retry-selector qq-upload-retry" href="#">Retry</a>'+
	        '<a class="qq-upload-delete-selector qq-upload-delete" href="#">Delete</a>'+
	        '<span class="qq-upload-status-text-selector qq-upload-status-text"></span>'+
	      '</li>'+
	   ' </ul>'+
	 ' </div>'+
	'</div>';
	return $uploaderTpl;
}

function close() {
	$("." + o.prefix + "close").click(function() {
		debug("[EsyFileManager 3.0.0] - CLOSE THE FILEMANAGER - ref: fm.js - LINE:3");
		$("." + o.prefix + "esyFileManager").remove();
	});
}

function fullscreen() {
	
}

function attach() {
	$("."+o.prefix+"attach").click(function(){
		debug("[EsyFileManager 3.0.0] - START ATTACH FUNCTION - ref: fm.js - LINE:14");
		$text=$("."+o.prefix+"selected").children("."+o.prefix+"name").html();
		
		if(!!o.files.replace) {
			$this.val(o.files.replace+$text);
		} else {
			$this.val(o.files.dir+$text);
		}
		
		debug("[EsyFileManager 3.0.0] - FILE NAME ATTACHED - ref: fm.js - LINE:26");
		$("."+o.prefix+"esyFileManager").remove();
		debug("[EsyFileManager 3.0.0] - ATTACHED FILEMANAGER CLOSED - ref: fm.js - LINE:28");
	});
}

function info() {
	$("."+o.prefix+"info").click(function(){
		debug("[EsyFileManager 3.0.0] - START INFO FUNCTION - ref: fm.js - LINE:33");
		$("<div class='"+o.prefix+"overlay'></div>").hide().appendTo($that).fadeIn("slow", function(){
			$file=$("."+o.prefix+"selected").children("."+o.prefix+"name").html();
			$.ajax({
				url: o.endpoint,
				type: "post",
				data: {
					action: "info",
					dir: o.files.dir,
					file: $file,
				},
				dataType: "json",
				success: function(data){
					console.log(data);
					$("<p><b>File info:</b></p>").appendTo("."+o.prefix+"overlay");

					$.each(data, function(index, value) {
					  $("<p>"+index+": "+value+"</p>").appendTo("."+o.prefix+"overlay");
					});
					if(data.extension=="jpg" || data.extension=="jpeg" || data.extension=="png" || data.extension=="gif") {
						$("<img src='classes/thumb.php?path="+o.files.dir+data.basename+"' />").load(function(){
							$(this).appendTo("."+o.prefix+"overlay");
						});
					}
				}
			});
			$(this).one("click", function(){
				$(this).fadeOut("slow", function(){
					$(this).remove();
				});
			});
		});
		
	});
}
function notify_progress(progress, total){
	// total:100=progress:x
	// (progress*100)/total
		perc=(progress*100)/total;
		$("."+o.prefix+"progress div").css("width", perc+"%");
		if(perc==100){
			setTimeout(function(){
				debug("[EsyFileManager 3.0.0] - 100% PROGRESS BAR - ref: fm.js - LINE:41");
				$("."+o.prefix+"progress div").animate({width: 0+"px"});
			}, 300);
		}
}
function listfiles() {
	debug("[EsyFileManager 3.0.0] - START FILE LISTING - ref: files.js - LINE:2");
	$.ajax({
		url : o.endpoint,
		method : "POST",
		dataType : "json",
		data : {
			action : "list",
			dir : o.files.dir
		},
		success : function(data) {
			//debug(data);
			if (!!data) {
				$.each(data, function(i, value) {
					icon = dropIconClass(value.file);
					$fileTpl = fileTemplate(value.file, icon, value.size);
					//files template + draggable
					$($fileTpl).appendTo("." + o.prefix + "list");
					//files selection
				});
			}
			debug("[EsyFileManager 3.0.0] - FILE LISTING COMPLETE - ref: files.js - LINE:20");
			selection();
			deletefiles();
			uploader();
		}
	});
}

function selection() {
	$("." + o.prefix + "file").unbind("click").click(function(event) {
		debug("[EsyFileManager 3.0.0] - START FILE SELECTION - ref: files.js - LINE:30");
		if (!(event.ctrlKey || event.altKey || event.shiftKey || event.metaKey)) {
			debug("[EsyFileManager 3.0.0] - SINGLE FILE SELECTION - ref: files.js - LINE:32");
			$("." + o.prefix + "selected").each(function() {
				$(this).removeClass(o.prefix + "selected");
			});
		} else
			debug("[EsyFileManager 3.0.0] - MULTIPLE FILE SELECTION - ref: files.js - LINE:36");
		if ($(this).hasClass(o.prefix + "selected")) {
			$(this).removeClass(o.prefix + "selected");
		} else {
			$(this).addClass(o.prefix + "selected");
		}

		if ($("." + o.prefix + "selected").length == 1) {
			debug("[EsyFileManager 3.0.0] - ENABLE SETTINGS - ref: files.js - LINE:41");
			$("." + o.prefix + "info").fadeTo("slow", 1).css("cursor", "pointer").unbind("click");
			$("." + o.prefix + "attach").fadeTo("slow", 1).css("cursor", "pointer").unbind("click");
			attach();
			info();
		} else {
			debug("[EsyFileManager 3.0.0] - DISABLE SETTINGS - ref: files.js - LINE:44");
			$("." + o.prefix + "info").fadeTo("slow", 0.5).css("cursor", "").unbind("click");
			$("." + o.prefix + "attach").fadeTo("slow", 0.5).css("cursor", "").unbind("click");
		}

		$("." + o.prefix + "selected").draggable({
			scroll : true,
			revert : function(is_valid) {
				if (!is_valid) {
					return true;
				}
			},
			helper : "clone",
			appendTo : "." + o.prefix + "esyFileManager",
			cursorAt : {
				top : 30,
				left : 30
			},
			start : function() {
				debug("[EsyFileManager 3.0.0] - START DRAGGING FILES - ref: files.js - LINE:62");
				$(".ui-draggable-dragging").html("");
				$(".ui-draggable-dragging").addClass("grabbing");
			},
			stop : function() {
				debug("[EsyFileManager 3.0.0] - STOP DRAGGING FILES - ref: files.js - LINE:67");
			}
		});
		//selection();
		//deletefiles();
	});
}

function deletefiles() {
	$("." + o.prefix + "delete").droppable({
		tolerance : "pointer",
		activeClass : "ui-state-default",
		hoverClass : o.prefix + "delete-on",
		accept : ":not(.maindir)",
		drop : function(event, ui) {
			debug("[EsyFileManager 3.0.0] - START DELETING FILES - ref: files.js - LINE:82");
			$confirm = confirm(o.del.txtOnDelete);
			if ($confirm === true) {
				$files = new Array();
				$n = 0;
				$("." + o.prefix + "selected").not(".ui-draggable-dragging").each(function() {
					//debug($(this).children("."+o.prefix+"name").html());
					$files[$n] = $(this).children("." + o.prefix + "name").html();
					$n++;
				});
				$.ajax({
					url : o.endpoint,
					method : "POST",
					dataType : "json",
					data : {
						action : "del",
						dir : o.files.dir,
						files : $files
					},
					success : function(data) {
						//debug(data);
						o.call.onDelete(data); 
						if (data.success === true) {
							$("." + o.prefix + "selected").each(function() {
								$(this).closest("li").remove();
							});
							debug("[EsyFileManager 3.0.0] - FILES SUCCESFULLY DELETED - ref: files.js - LINE:82");
						} else
							debug("[EsyFileManager 3.0.0] - PROBLEM DELETING FILES - ref: files.js - LINE:108");
						
						debug("[EsyFileManager 3.0.0] - STOP DELETING FILES - ref: files.js - LINE:108");
					}
				});
				//debug($files);
			}

		}
	});
}

function uploader() {
	$("." + o.prefix + "upload").fineUploader({
		debug : o.debug,
		request : {
			endpoint : o.endpoint,
			params : {
				action : "upload",
				dir : o.files.dir
			}
		}
	}).on("complete", function(event, id, filename, responseJSON) {
		o.call.onUploaded(filename, responseJSON);
		debug("[EsyFileManager 3.0.0] - UPLOAD COMPLETE - ref: files.js - LINE:136");
		//debug(event);
		//debug(id);
		//debug(filename);
		//debug(responseJSON);
		
		$tpl = fileTemplate(responseJSON.file, responseJSON.info.extension, responseJSON.size);
		$("." + o.prefix + "list").prepend($tpl);
		selection();
	}).on("totalProgress", function(json, uploadedBytes, totalBytes) {
		o.call.totalProgress(json, uploadedBytes, totalBytes);
		notify_progress(uploadedBytes, totalBytes);
	});
}

function dropIconClass($filename) {
	var $ext = $filename.substr($filename.lastIndexOf('.') + 1);
	//debug($ext);
	if ($ext == '3gp') {
		$ico = 'a3gp';
	} else if ($ext == '7z') {
		$ico = 'a7z';
	} else if ($ext == 'ace') {
		$ico = 'ace';
	} else if ($ext == 'aiff') {
		$ico = 'aiff';
	} else if ($ext == 'aif') {
		$ico = 'aif';
	} else if ($ext == 'ai') {
		$ico = 'ai';
	} else if ($ext == 'amr') {
		$ico = 'amr';
	} else if ($ext == 'asf') {
		$ico = 'asf';
	} else if ($ext == 'asx') {
		$ico = 'asx';
	} else if ($ext == 'bat') {
		$ico = 'bat';
	} else if ($ext == 'bin') {
		$ico = 'bin';
	} else if ($ext == 'bmp') {
		$ico = 'bmp';
	} else if ($ext == 'bup') {
		$ico = 'bup';
	} else if ($ext == 'cab') {
		$ico = 'cab';
	} else if ($ext == 'cbr') {
		$ico = 'cbr';
	} else if ($ext == 'cda') {
		$ico = 'cda';
	} else if ($ext == 'cdl') {
		$ico = 'cdl';
	} else if ($ext == 'cdr') {
		$ico = 'cdr';
	} else if ($ext == 'chm') {
		$ico = 'chm';
	} else if ($ext == 'dat') {
		$ico = 'dat';
	} else if ($ext == 'divx') {
		$ico = 'divx';
	} else if ($ext == 'dll') {
		$ico = 'dll';
	} else if ($ext == 'dmg') {
		$ico = 'dmg';
	} else if ($ext == 'doc' || $ext == 'docx') {
		$ico = 'doc';
	} else if ($ext == 'dss') {
		$ico = 'dss';
	} else if ($ext == 'dvf') {
		$ico = 'dvf';
	} else if ($ext == 'dwg') {
		$ico = 'dwg';
	} else if ($ext == 'eml') {
		$ico = 'eml';
	} else if ($ext == 'eps') {
		$ico = 'eps';
	} else if ($ext == 'exe') {
		$ico = 'exe';
	} else if ($ext == 'fla') {
		$ico = 'fla';
	} else if ($ext == 'flv') {
		$ico = 'flv';
	} else if ($ext == 'gif') {
		$ico = 'gif';
	} else if ($ext == 'gz') {
		$ico = 'gz';
	} else if ($ext == 'hqx') {
		$ico = 'hqx';
	} else if ($ext == 'htm') {
		$ico = 'htm';
	} else if ($ext == 'html') {
		$ico = 'html';
	} else if ($ext == 'ifo') {
		$ico = 'ifo';
	} else if ($ext == 'indd') {
		$ico = 'indd';
	} else if ($ext == 'iso') {
		$ico = 'iso';
	} else if ($ext == 'jar') {
		$ico = 'jar';
	} else if ($ext == 'jpeg') {
		$ico = 'jpeg';
	} else if ($ext == 'jpg') {
		$ico = 'jpg';
	} else if ($ext == 'lnk') {
		$ico = 'lnk';
	} else if ($ext == 'log') {
		$ico = 'log';
	} else if ($ext == 'm4a') {
		$ico = 'm4a';
	} else if ($ext == 'm4b') {
		$ico = 'm4b';
	} else if ($ext == 'm4p') {
		$ico = 'm4p';
	} else if ($ext == 'm4v') {
		$ico = 'm4v';
	} else if ($ext == 'mcd') {
		$ico = 'mcd';
	} else if ($ext == 'mdb') {
		$ico = 'mdb';
	} else if ($ext == 'mid') {
		$ico = 'mid';
	} else if ($ext == 'mov') {
		$ico = 'mov';
	} else if ($ext == 'mp2') {
		$ico = 'mp2';
	} else if ($ext == 'mp4') {
		$ico = 'mp4';
	} else if ($ext == 'mpeg') {
		$ico = 'mpeg';
	} else if ($ext == 'mpg') {
		$ico = 'mpg';
	} else if ($ext == 'msi') {
		$ico = 'msi';
	} else if ($ext == 'ogg') {
		$ico = 'ogg';
	} else if ($ext == 'pdf') {
		$ico = 'pdf';
	} else if ($ext == 'png') {
		$ico = 'png';
	} else if ($ext == 'psd') {
		$ico = 'psd';
	} else if ($ext == 'ps') {
		$ico = 'ps';
	} else if ($ext == 'pst') {
		$ico = 'pst';
	} else if ($ext == 'ptb') {
		$ico = 'ptb';
	} else if ($ext == 'pub') {
		$ico = 'pub';
	} else if ($ext == 'qbb') {
		$ico = 'qbb';
	} else if ($ext == 'qbw') {
		$ico = 'qbw';
	} else if ($ext == 'qxd') {
		$ico = 'qxd';
	} else if ($ext == 'ram') {
		$ico = 'ram';
	} else if ($ext == 'rar') {
		$ico = 'rar';
	} else if ($ext == 'rm') {
		$ico = 'rm';
	} else if ($ext == 'rmvb') {
		$ico = 'rmvb';
	} else if ($ext == 'rtf') {
		$ico = 'rtf';
	} else if ($ext == 'sea') {
		$ico = 'sea';
	} else if ($ext == 'ses') {
		$ico = 'ses';
	} else if ($ext == 'sit') {
		$ico = 'sit';
	} else if ($ext == 'sitx') {
		$ico = 'sitx';
	} else if ($ext == 'swf') {
		$ico = 'swf';
	} else if ($ext == 'tgz') {
		$ico = 'tgz';
	} else if ($ext == 'thm') {
		$ico = 'thm';
	} else if ($ext == 'tif') {
		$ico = 'tif';
	} else if ($ext == 'tmp') {
		$ico = 'tmp';
	} else if ($ext == 'ttf') {
		$ico = 'ttf';
	} else if ($ext == 'txt') {
		$ico = 'txt';
	} else if ($ext == 'vcd') {
		$ico = 'vcd';
	} else if ($ext == 'vob') {
		$ico = 'vob';
	} else if ($ext == 'wav') {
		$ico = 'wav';
	} else if ($ext == 'wma') {
		$ico = 'wma';
	} else if ($ext == 'wmv') {
		$ico = 'wmv';
	} else if ($ext == 'wps') {
		$ico = 'wps';
	} else if ($ext == 'xsl' || $ext == 'xslx') {
		$ico = 'xsl';
	} else if ($ext == 'xpi') {
		$ico = 'xpi';
	} else if ($ext == 'zip') {
		$ico = 'zip';
	} else if ($ext == 'ppt' || $ext == 'pps' || $ext == 'pptx' || $ext == 'ppsx') {
		$ico = 'ppt';
	} else {
		$ico = 'ico';
	}

	return $ico;
}
function pxToNumber(px) {
     $num=Number(px.substr(0 , px.length-2), 10);
     return $num;
  }
  
  function position(element, margin){
  	$fm=new Array();
  
  	
  	
	//if big window
	//Check if i can position the element on the left
	
		$my="left top";
		$at="left top";
		$of="body";
		$w="95%";
		$h="95%";
	
	
	
  	//Filemanager top & left position
  	var $fm ={
  		my:$my,
  		at:$at,
  		of:$of,
  		width:$w,
  		height: $h
  	};
  	//Filemanager top & left position
  	return $fm;
  }

  // private function for debugging
  function debug($obj) {
    if (window.console && window.console.log && o.debug===true) {
      window.console.log($obj);
    }
  }
};

$.fn.disableSelection = function() {
    return this
             .attr('unselectable', 'on')
             .css('user-select', 'none')
             .on('selectstart', false);
};

// default options
$.fn.esyFileManager.defaults = {
  debug: true,
  prefix:"fm-",
  endpoint:'endpoint.php',
  mode: {
  	type: "input", // input || button || download || tinyMce
  	selector: "fm-open"
  },
  size: true,
  width: 300,
  height: 400,
  files: {
  	dir:"uploads/",
  	replace:""
  },
  position: {
  	mode: "auto", // auto | manual
  	my: "right top", //only for manual
  	at: "left top" //only for manual
  },
  del: {
  	allowDelete: true,
  	txtOnDelete: 'Sei sicuro di voler eliminare i files selezionati',
  },
  call:{
  	onDelete: function(data){ },
  	onUploaded: function(file, data){},
  	totalProgress: function(json, uploadedBytes, totalBytes){}
  }
};

})(jQuery);

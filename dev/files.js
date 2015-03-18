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
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

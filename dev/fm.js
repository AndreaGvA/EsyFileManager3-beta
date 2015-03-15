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
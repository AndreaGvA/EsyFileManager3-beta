;(function($) {

$.fn.esyFileManager = function(options) {
  var o = $.extend({}, $.fn.esyFileManager.defaults, options);
  var $this;
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
				style="top:"+pos.top+"px; left:"+pos.left+"px; width:"+pos.width+"; height:"+pos.height+";  z-index: 999999;";
				 
				debug("[EsyFileManager 3.0.0] - RENDER THE FILEMANAGER TEMPLATE - ref: head.js - LINE:16");
				$("body").append($(template(style)).hide());
				close();
				fullscreen();
				
				debug("[EsyFileManager 3.0.0] - RENDER THE FUNCTIONS TEMPLATE - ref: head.js - LINE:19");
				$(functionsTpl()).appendTo("."+o.prefix+"functions");
				attach();
				
				if($("#qq-template").length==0){
					debug("[EsyFileManager 3.0.0] - RENDER THE UPLOADER TEMPLATE - ref: head.js - LINE:23");
					$("body").append($(uploaderTpl()).hide()); 
				}
				
				debug("[EsyFileManager 3.0.0] - TEMPLATE RENDERING COMPLETE - ref: head.js - LINE:25");
				//ADJUST HEIGHT FOR RESIZE
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
  
  
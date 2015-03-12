
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
  mode: "input",
  size: true,
  width: 300,
  height: 400,
  files: {
  	dir:"uploads/",
  	replace:""
  },
  del: {
  	allowDelete: true,
  	txtOnDelete: 'Sei sicuro di voler eliminare i files selezionati'
  }
};

})(jQuery);

$(".apri").esyFileManager({
	size:false
});
$(".apri2").esyFileManager({
	files:{
		dir:"uploads2/"
	},
	del:{
		allowDelete: false
	}
});
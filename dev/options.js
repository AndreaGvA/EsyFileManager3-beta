
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

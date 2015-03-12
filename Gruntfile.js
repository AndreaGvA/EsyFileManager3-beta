module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */',
      },
      dist: {
        src: [
	       'bower_components/jquery/dist/jquery.js',
	       'bower_components/jquery-ui/ui/core.js', 
	       'bower_components/jquery-ui/ui/widget.js', 
	       'bower_components/jquery-ui/ui/mouse.js', 
	       'bower_components/jquery-ui/ui/draggable.js', 
	       'bower_components/jquery-ui/ui/droppable.js',
	       'bower_components/jquery-ui/ui/resizable.js', 
	       'bower_components/jqueryui-touch-punch/jquery.ui.touch-punch.js', 
	       'bower_components/fine-uploader/_dist/5.1.3/jquery.fine-uploader/jquery.fine-uploader.js',
	       'src/head.js',
	       'src/templates.js',
	       'src/fm.js',
	       'src/files.js',
	       'src/position.js',
	       'src/options.js'
             ],
        dest: 'build/js/main.js',
      },
    },
    less: {
	  production: {
	    options: {
	      paths: ["assets/css"]
	    },
	    files: {
	      "build/css/main.css": "less/main.less"
	    }
	  }
	},
    autoprefixer: {
        single_file: {
	      src: 'build/css/main.css'
	    }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'build/js/main.js',
        dest: 'build/js/main.min.js'
      }
    },
    cssmin: {
	  options: {
        keepSpecialComments: 0
	    },
	    site: {
	        src: ['build/css/main.css'],
	        dest: 'build/css/main.min.css'
	    }
	}
  });
  
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-autoprefixer'); 
  // Default task(s).
  grunt.registerTask('default',['concat','less', 'autoprefixer']);
  grunt.registerTask('min',['uglify', 'cssmin']);

};

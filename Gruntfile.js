/*global module:false*/
module.exports = function(grunt) {
	grunt.initConfig({
		pages: {
			options: {
				pageSrc: 'source/pages',
				data: grunt.file.readJSON('source/layouts/variables.json')
			},
			posts: {
				src: 'source/posts',
				dest: 'build',
				layout: 'source/layouts/post.jade',
				url: ':title' 
			}
		},

		jshint: {
			options: {
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				browser: true,
				smarttabs: true,
				predef: [
					'Class',
					'$',
					'jQuery',
					'FastClick',
					'Modernizr'
				]
			},
			gruntfile: {
				src: 'Gruntfile.js'
			}
		},

		copy: {
			images: {
				expand: true,
				cwd: 'source/images/',
				src: '**',
				dest: 'build/images/'
			},
			scripts: {
				expand: true,
				cwd: 'source/scripts/',
				src: '**',
				dest: 'build/scripts/'
			},
			styles: {
				expand: true,
				cwd: 'source/styles/',
				src: '*.css',
				dest: 'build/styles/'
			}
		},

		stylus: {
			css: {
				options: {
					compress: true
				},
				src: 'source/styles/blog.styl',
				dest: 'build/styles/blog.css'
			}
		},

		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			images: {
				files: 'source/images/**',
				tasks: ['copy:images']
			},
			js: {
				files: 'source/scripts/**',
				tasks: ['copy:scripts']
			},
			pages: {
				files: ['source/pages/*', 'source/posts/*', 'source/layouts/*'],
				tasks: ['pages']
			},
			stylus: {
				files: ['source/styles/*'],
				tasks: ['copy:styles', 'stylus']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-pages');

	grunt.registerTask('default', ['jshint', 'pages', 'copy', 'stylus']);
};

var moment = require('moment');

/*global module:false*/
module.exports = function(grunt) {
	// Tempalte data
	var data = grunt.file.readJSON('source/layouts/variables.json');
	data.moment = moment;

	grunt.initConfig({
		pages: {
			options: {
				pageSrc: 'source/pages',
				data: data,
				formatPostUrl: function (urlSegment) {
					return urlSegment.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
				}
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
					'Modernizr',
					'require'
				]
			},
			gruntfile: {
				src: 'Gruntfile.js'
			}
		},

		clean: {
			build: ['build/']
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
			},
			icons: {
				expand: true,
				cwd: 'source/icons/',
				src: '**',
				dest: 'build/icons/'
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
			icons: {
				files: 'source/icons/**',
				tasks: ['copy:icons']
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
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-pages');

	grunt.registerTask('default', ['jshint', 'pages', 'copy', 'stylus']);
};

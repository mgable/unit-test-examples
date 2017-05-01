// Generated on 2014-04-24 using generator-angular 0.8.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);


	grunt.initConfig({
		jasmine: {
			unit_tests: {
				src: ['../application/**/*.js','templates/templates.js'],
				options: {
					specs:  "./tests/**/*.js",
					helpers: "./helpers/**/*.js",
					vendor:[
					'node_modules/underscore/underscore.js',
					'node_modules/jquery/dist/jquery.js',
					'node_modules/angular/angular.js',
					'node_modules/angular-mocks/angular-mocks.js',
					'node_modules/angular-foundation/mm-foundation-tpls.min.js'
					],
					junit: {
						path: './results',
						consolidate: true
					}
				}
			}
		},


		ngtemplates: {
			AccountApp: {
				cwd: '../../../../../views/qcommerce/storefront/',
				src: ['landing_page_modules/angular_templates/*.html.erb','account/includes/*.html.erb'],
				dest: 'templates/templates.js',
				options: {
					url: function(url) { return url.replace('.erb', '').replace(/.*(\/_)/, ''); }
				}
			}
		}
	});

	grunt.registerTask('default', ['ngtemplates', 'jasmine']);
};

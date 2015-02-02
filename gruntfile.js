module.exports = function(grunt){
    grunt.initConfig({
        watch:{
            jade:{
                files: ['views/**'],
                options:{
                    livereload: true
                }
            },
            js:{
                files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
                tasks: ['jshint'],
                options:{
                    livereload:true
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');

    grunt.option('force', true);

    grunt.registerTask('default', ['concurrent']);
};

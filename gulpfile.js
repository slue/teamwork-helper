var elixir = require('laravel-elixir'),
    gulp   = require('gulp'),
    util   = require('gulp-util');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {
    mix.copy('node_modules/vue/dist/vue.js', 'public/vendor/vue.js');
    mix.copy('node_modules/vue-resource/dist/vue-resource.js', 'public/vendor/vue-resource.js');
    mix.copy('node_modules/bootstrap/dist/js/bootstrap.min.js', 'public/vendor/bootstrap.min.js');
    mix.copy('node_modules/jquery/dist/jquery.min.js', 'public/vendor/jquery.min.js');
    mix.sass('app.scss')
       .version('css/app.css');
    //mix.babel('**/*.js')
    //   .version(['js/app.js']);
    mix.copy('node_modules/font-awesome/css/font-awesome.min.css', 'public/vendor/font-awesome.min.css');
});


var elixir = require('laravel-elixir'),
    gulp   = require('gulp'),
    util   = require('gulp-util');

require('laravel-elixir-vueify');

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
    mix.copy('node_modules/vue/dist/vue.js', 'public/vendor/vue.js')
        .copy('node_modules/vue-resource/dist/vue-resource.js', 'public/vendor/vue-resource.js')
        .copy('node_modules/bootstrap/dist/js/bootstrap.min.js', 'public/vendor/bootstrap.min.js')
        .copy('node_modules/jquery/dist/jquery.min.js', 'public/vendor/jquery.min.js')

        .copy('node_modules/font-awesome/css/font-awesome.min.css', 'public/vendor/font-awesome.min.css')
        .copy('node_modules/font-awesome/fonts/fontawesome-webfont.ttf', 'public/fonts/fontawesome-webfont.ttf')
        .copy('node_modules/font-awesome/fonts/fontawesome-webfont.woff', 'public/fonts/fontawesome-webfont.woff')
        .copy('node_modules/font-awesome/fonts/fontawesome-webfont.woff2', 'public/fonts/fontawesome-webfont.woff2')

        .copy('node_modules/moment/min/moment.min.js', 'public/vendor/moment.min.js');

    mix.sass('app.scss')
        .browserify('main.js')
        .version(['css/app.css','js/main.js']);
});

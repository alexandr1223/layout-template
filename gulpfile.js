const { src, dest, watch, parallel, series }  = require('gulp');

const sass          = require('gulp-sass')(require('sass'));
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const autoprefixer  = require('gulp-autoprefixer');

function browsersync() {
  browserSync.init({
    server : {
      baseDir: 'src/'
    }
  });
}

function styles() {
  return src('src/sass/style.sass')
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(concat('style.min.css'))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true
      }))
      .pipe(dest('src/css'))
      .pipe(browserSync.stream())
}

function scripts() {
  return src('src/js/main.js')
      .pipe(dest('src/js'))
      .pipe(browserSync.stream())
}

function build() {
  return src([
    'src/css/style.min.css',
    'src/fonts/**/*',
    'src/js/main.js',
    'src/*.html'
  ], {base: 'src'})
    .pipe(dest('dist'))
}

function watching() {
  watch(['src/sass/**/*.sass'], styles);
  watch(['src/js/*.js']).on('change', browserSync.reload);
  watch(['src/*.html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.browsersync = browsersync;


exports.build = series(build);
exports.default = parallel(styles, scripts, browsersync, watching);



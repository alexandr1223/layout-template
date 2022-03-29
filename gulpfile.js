const { src, dest, watch, parallel}  = require('gulp');

const 
  sass          = require('gulp-sass')(require('sass')),
  concat        = require('gulp-concat'),
  uglify        = require('gulp-uglify'),
  imagemin      = require('gulp-imagemin'),
  pngquant      = require('gulp-pngquant'),
  del           = require('del'),
  browserSync   = require('browser-sync').create(),
  autoprefixer  = require('gulp-autoprefixer'),
  plumber       = require('gulp-plumber'),
  rigger        = require('gulp-rigger');



function browsersync() {
  browserSync.init({
    server : {
      baseDir: 'dist/'
    },
  });
}

/* ========= "HTML" ========== */
function html() {
  return src('src/*.html')
      .pipe(plumber())
      .pipe(rigger()) 
      .pipe(dest('dist/'))
      .pipe(browserSync.stream())
}

/* ========= "SASS" ========== */
function styles() {
  return src('src/sass/style.sass')
      .pipe(plumber())
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(concat('style.min.css'))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version', '>1%', 'ie 8', 'ie 7'],
      }))
      .pipe(dest('dist/css'))
      .pipe(browserSync.stream())
}

/* ========= "JS" ========== */
function scripts() {
  return src('src/js/**/*.js')
      .pipe(plumber())
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(dest('dist/js'))
      .pipe(browserSync.stream())
}

/* ========== "IMG" ========== */
function images() {
  return src('src/img/**/*.{jpg,png,svg,gif,ico}')
      .pipe(plumber())
      .pipe(imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngquant()]
      }))
      .pipe(dest('dist/img'))
      .pipe(browserSync.stream());
}

/* ========== "FONTS" ========== */
function fonts() {
  return src('src/fonts/**/*')
    .pipe(dest('dist/fonts'))
    .pipe(browserSync.stream())
}

/* ========= "CLEAN" ========= */
function clean() {
  return del.sync('dist')
}

/* ========= "WATCH" ========= */
function watching() {
  watch(['src/*.html']).on('change', html);
  watch(['src/sass/**/*.sass'], styles);
  watch(['src/js/*.js']).on('change', scripts);
  watch(['src/img/*']).on('change', images);
  watch(['src/fonts/*']).on('change', fonts);
}


exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.fonts = fonts;
exports.watching = watching;
exports.browsersync = browsersync;

exports.build = parallel(html, styles, scripts, images, fonts);
exports.default = parallel(clean, html, styles, scripts, images, fonts, browsersync, watching);



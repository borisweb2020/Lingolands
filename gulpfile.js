const {src, dest, parallel, series, watch} = require('gulp');

const browserSync = require('browser-sync').create();
const scss        = require('gulp-sass')(require('sass'));
const prefixer    = require('gulp-autoprefixer');
const rename      = require('gulp-rename');
const del         = require('del');

// --- the functions declaration
function $browserSync(){
  browserSync.init({
    server: {baseDir: 'app/'},
    notify: false,
    online: true
  });
}

function script(){
  return src('app/script/main.js')
    .pipe(browserSync.stream())
}

function style(){
  return src('app/scss/*.scss')
      .pipe(scss({outputStyle: 'compressed'}))
      .pipe(prefixer({grid: true}))
      .pipe(rename({suffix: '.min'}))
      .pipe(dest('app/style/'))
      .pipe(browserSync.stream())
}

function watching(){
  watch('app/script/main.js', script);
  watch('app/scss/*.scss', style);
  watch('app/*.html').on('change', browserSync.reload);
}

function copy(){
  return src([
    'app/style/*.min.css',
    'app/script/*.js',
    'app/images/*.*',
    'app/favicons/*.*',
    'app/fonts/*.*',
    'app/.html'
  ], {base: 'app'})
  .pipe(dest('dist'))
}

function cleanDist(){
  return del('dist/**/*.*')
}

// *** the exported tasks declaration
exports.browsersync = $browserSync;
exports.script      = script;
exports.style       = style;

exports.build       = series(cleanDist, style, script, copy);
exports.default     = parallel(script, style, $browserSync, watching);
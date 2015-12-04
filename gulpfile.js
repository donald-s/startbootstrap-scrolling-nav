var gulp = require('gulp'),
sass = require('gulp-sass'),
wiredep = require('wiredep').stream,
concat = require('gulp-concat'),
server = require('gulp-webserver'),
livereload = require('gulp-livereload'),
paths = {
  src: {
    styles: 'src/styles/**/*.scss',
    stylesMain: 'src/styles/all.scss',
    scripts: 'src/scripts/**/*.js',
    html: 'src/index.html',
    bowerComponents: 'src/bower_components/**/*',
    fonts: 'src/fonts/'
  },
  dist: {
    styles: 'dist/styles',
    scripts: 'dist/scripts',
    root: 'dist',
    bowerComponents: 'dist/bower_components'
  }
}

gulp.task('default', ['build'], function() {
  livereload.listen()
  gulp.src('./dist')
  .pipe(server({
    livereload: true,
    open: true
  }))
  gulp.watch(paths.src.bowerComponents, ['bower_components'])
  gulp.watch(paths.src.styles, ['app:styles'])
  gulp.watch(paths.src.scripts, ['app:scripts'])
  gulp.watch(paths.src.html, ['app:html'])
  gulp.watch(paths.src.fonts, ['app:fonts'])
})

gulp.task('bower_components', function() {
  gulp.src(paths.src.bowerComponents)
  .pipe(gulp.dest(paths.dist.bowerComponents))
  .pipe(livereload())
})

gulp.task('app:styles', function() {
  return gulp.src(paths.src.stylesMain)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dist.styles))
    .pipe(livereload())
})

gulp.task('app:scripts', function() {
  return gulp.src(paths.src.scripts)
    .pipe(concat('all.js'))
    .pipe(gulp.dest(paths.dist.scripts))
    .pipe(livereload())
})

gulp.task('app:html', function() {
  return gulp.src(paths.src.html)
  .pipe(wiredep())
  .pipe(gulp.dest(paths.dist.root))
  .pipe(livereload())
})

gulp.task('app:fonts', function() {
  return gulp.src(paths.src.fonts)
  .pipe(gulp.dest(paths.dist.root))
})

gulp.task('build', ['bower_components', 'app:styles', 'app:scripts', 'app:html', 'app:fonts'])

gulp.task('deploy', ['build'], function() {

})
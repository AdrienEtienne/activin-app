var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./app/js/**/*.js'],
  html: ['./app/templates/**/*.html'],
  css: ['./app/css/**/*.css']
};

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./app/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./app/css/'))
    .on('end', done);
});

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.html, ['copy:html']);
  gulp.watch(paths.css, ['copy:css']);
  if (process.env.NODE_ENV === 'development') {
    gulp.watch(paths.js, ['copy:js']);
  } else if (process.env.NODE_ENV === 'production') {
    gulp.watch(paths.js, ['concat:js']);
  }
});

gulp.task('install', function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

// PERSO
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var ignore = require('gulp-ignore');
var wiredep = require('wiredep').stream;
var KarmaServer = require('karma').Server;
var inject = require('gulp-inject');
var debug = require('gulp-debug');
var ngConstant = require('gulp-ng-constant');
var env = require('gulp-env');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var jshint = require('gulp-jshint');

// CLEAN
gulp.task('clean', function () {
  return gulp.src(['www', '.tmp'], {
      read: false
    })
    .pipe(clean());
});

// COPY
gulp.task('copy-dev', cb => {
  return gulp.src('app/**/*')
    .pipe(ignore.exclude(/.*\.spec\.js/))
    .pipe(gulp.dest('www'));
});
gulp.task('copy-production', cb => {
  return runSequence('copy:lib', 'copy:templates', 'copy:assets', 'copy:css', cb);
});

gulp.task('copy:templates', function () {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('www'));
});

gulp.task('copy:html', function () {
  return gulp.src('app/templates/**/*')
    .pipe(gulp.dest('www/templates'));
});

gulp.task('copy:lib', function () {
  return gulp.src('app/lib/**/*')
    .pipe(gulp.dest('www/lib'));
});

gulp.task('copy:assets', function () {
  return gulp.src('app/assets/**/*')
    .pipe(gulp.dest('www/assets'));
});

gulp.task('copy:css', function () {
  return gulp.src('app/css/**/*')
    .pipe(gulp.dest('www/css'));
});

gulp.task('copy:js', function () {
  return gulp.src('app/js/**/*')
    .pipe(ignore.exclude(/.*\.spec\.js/))
    .pipe(gulp.dest('www/js'));
});

gulp.task('concat:js', function () {
  return gulp.src('app/js/**/*.js')
    .pipe(ignore.exclude(/\.spec\.js/))
    .pipe(concat('all.js'))
    .pipe(gulp.dest('www/js'))
});

// ENVIRONMENT
gulp.task('env:dev', () => {
  env({
    vars: {
      NODE_ENV: 'development'
    }
  });
});
gulp.task('env:prod', () => {
  env({
    vars: {
      NODE_ENV: 'production'
    }
  });
});

// INJECT DEPENDANCIES
gulp.task('wiredep', cb => {
  runSequence('wiredep:client', 'wiredep:test', cb);
});

gulp.task('wiredep:client', () => {
  return gulp.src('www/index.html')
    .pipe(wiredep({
      ignorePath: './www',
      directory: './www/lib/'
    }))
    .pipe(gulp.dest('./www/'));
});

gulp.task('wiredep:test', () => {
  return gulp.src('karma.conf.js')
    .pipe(wiredep({
      devDependencies: true
    }))
    .pipe(gulp.dest('./'));
});

// INJECT APPLICATION FILES
gulp.task('inject', cb => {
  runSequence('inject:js', 'inject:css', cb);
});

gulp.task('inject:js', () => {
  return gulp.src('www/index.html')
    .pipe(inject(
      gulp.src(['www/js/**/*.js', '!www/js/**/*.{spec,mock}.js'], {
        read: false
      }), {
        transform: (filepath) => '<script src="' + filepath.replace('/www/', '') + '"></script>'
      }))
    .pipe(gulp.dest('www'));
});

gulp.task('inject:css', () => {
  return gulp.src('www/index.html')
    .pipe(inject(
      gulp.src(['www/css/**/*.css', '!www/css/ionic.app.min.css'], {
        read: false
      }), {
        transform: (filepath) => '<link rel="stylesheet" href="' + filepath.replace('/www/', '') + '"></script>'
      }))
    .pipe(gulp.dest('www'));
});

// LINT
gulp.task('lint', cb => {
  runSequence('jshint', 'jshintTest', cb);
});

gulp.task('jshint', function () {
  return gulp.src('./app/js/**/*.js')
    .pipe(ignore.exclude(/app\.constant\.js/))
    .pipe(ignore.exclude(/.*\.spec\.js/))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jshintTest', function () {
  var fs = require('fs');
  var config = JSON.parse(fs.readFileSync('./.jshintrc-spec', "utf8"));
  return gulp.src('./app/js/**/*.spec.js')
    .pipe(ignore.exclude(/app\.constant\.js/))
    .pipe(jshint(config))
    .pipe(jshint.reporter('default'));
});

gulp.task('constant', function () {
  return ngConstant({
      name: 'activinApp.constants',
      deps: [],
      wrap: true,
      stream: true,
      constants: {
        appConfig: require('./environment').appConfig
      }
    })
    .pipe(rename({
      basename: 'app.constant'
    }))
    .pipe(gulp.dest('app/js'))
});

gulp.task('replace-build-version', function () {
  gulp.src('./config.xml')
    .pipe(replace(
      /version=\"[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}(-alpha\.[0-9]{1,3})?\"/,
      'version=\"' + require('./package.json').version + '\"'))
    .pipe(gulp.dest('./'));
});

gulp.task('sequence:dev', done => {
  runSequence(
    'env:dev',
    'clean',
    'copy-dev',
    'constant',
    'wiredep',
    'inject', done);
});

gulp.task('sequence:production', done => {
  runSequence(
    'env:prod',
    'clean',
    'copy-production',
    'constant',
    'concat:js',
    'wiredep:client',
    'inject',
    'jshint',
    'replace-build-version', done);
});

gulp.task('test', ['sequence:dev'], (done) => {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('serve', ['sequence:dev'], (done) => {
  sh.exec('ionic serve');
  done();
});

gulp.task('serve:dist', ['sequence:production'], (done) => {
  sh.exec('ionic serve');
  done();
});

gulp.task('build', ['sequence:production'], (done) => {
  sh.exec('ionic build');
  done();
});

gulp.task('build:android', ['sequence:production'], (done) => {
  sh.exec('ionic build android');
  done();
});

gulp.task('build:android:release', ['sequence:production'], (done) => {
  sh.exec('ionic build android --release');
  done();
});

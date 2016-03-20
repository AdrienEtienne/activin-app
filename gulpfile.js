var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');
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

var paths = {
  sass: ['./scss/**/*.scss'],
  js: ['./app/js/**/*.js'],
  html: ['./app/templates/**/*.html'],
  css: ['./app/css/**/*.css']
};

function isTest() {
  return process.env.NODE_ENV === 'test';
}

function isProduction() {
  return process.env.NODE_ENV === 'production';
}

///////////////////////////////////////
// ENVIRONMENT
gulp.task('env:dev', (done) => {
  process.env.NODE_ENV = 'development';
  console.log('Environement configuration : development');
  return done();
});
gulp.task('env:test', (done) => {
  process.env.NODE_ENV = 'test';
  console.log('Environement configuration : test');
  return done();
});
gulp.task('env:prod', (done) => {
  process.env.NODE_ENV = 'production';
  console.log('Environement configuration : production');
  return done();
});

///////////////////////////////////////
// CLEAN
gulp.task('clean', function() {
  if (isProduction()) {
    return gulp.src('www', {
        read: false
      })
      .pipe(clean());
  } else {
    return;
  }
});

///////////////////////////////////////
// LINT
gulp.task('lint', done => {
  runSequence('jshint', 'jshintTest', done);
});

gulp.task('jshint', function() {
  return gulp.src('./app/js/**/*.js')
    .pipe(ignore.exclude(/app\.constant\.js/))
    .pipe(ignore.exclude(/.*\.spec\.js/))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('jshintTest', function() {
  var fs = require('fs');
  var config = JSON.parse(fs.readFileSync('./.jshintrc-spec', "utf8"));
  return gulp.src('./app/js/**/*.spec.js')
    .pipe(ignore.exclude(/app\.constant\.js/))
    .pipe(jshint(config))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

///////////////////////////////////////
// NG CONSTANT
gulp.task('constant', function() {
  return ngConstant({
      name: 'activinApp.constants',
      deps: [],
      wrap: true,
      stream: true,
      constants: {
        appConfig: require('./environment').appConfig,
        localEnv: require('./environment/local.env.js')
      }
    })
    .pipe(rename({
      basename: 'app.constant'
    }))
    .pipe(gulp.dest('app/js'))
});

///////////////////////////////////////
// SASS
gulp.task('sass', function(done) {
  if (isTest()) {
    done();
  } else {
    gulp.src('./scss/app.scss')
      .pipe(sass())
      .on('error', sass.logError)
      .pipe(gulp.dest('./app/css/'))
      .on('end', done);
  }
});

///////////////////////////////////////
// COPY
gulp.task('copy', done => {
  if (isTest()) {
    done();
  } else {
    runSequence(
      'copy:index',
      'copy:html',
      'copy:js',
      'copy:css',
      'copy:lib',
      'copy:assets', done);
  }
});
gulp.task('copy:index', function() {
  return gulp.src('app/index.html')
    .pipe(gulp.dest('www'));
});
gulp.task('copy:html', function() {
  return gulp.src('app/**/*.html')
    .pipe(ignore.exclude(/index\.html/))
    .pipe(gulp.dest('www'));
});
gulp.task('copy:js', function() {
  return gulp.src('app/js/**/*')
    .pipe(ignore.exclude(/.*\.spec\.js/))
    .pipe(ignore.exclude(/.*\.mock\.js/))
    .pipe(gulp.dest('www/js'));
});
gulp.task('copy:css', function(done) {
  gulp.src('app/css/**/*')
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});
gulp.task('copy:lib', function() {
  return gulp.src('app/lib/**/*')
    .pipe(gulp.dest('www/lib'));
});
gulp.task('copy:assets', function() {
  return gulp.src('app/assets/**/*')
    .pipe(gulp.dest('www/assets'));
});

///////////////////////////////////////
// WIREDEP
gulp.task('wiredep', done => {
  if (isTest()) {
    runSequence('wiredep:test', done);
  } else {
    runSequence('wiredep:client', done);
  }
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

///////////////////////////////////////
// INJECT APPLICATION FILES
gulp.task('inject', done => {
  if (isTest()) {
    done();
  } else {
    runSequence('inject:js', 'inject:css', done);
  }
});
gulp.task('inject:js', () => {
  return gulp.src('www/index.html')
    .pipe(inject(
      gulp.src('www/js/**/*.js', {
        read: false
      }), {
        transform: (filepath) => '<script src="' + filepath.replace('/www/', '') + '"></script>'
      }))
    .pipe(gulp.dest('www'));
});
gulp.task('inject:css', () => {
  return gulp.src('www/index.html')
    .pipe(inject(
      gulp.src('www/css/**/*.css', {
        read: false
      }), {
        transform: (filepath) => '<link rel="stylesheet" href="' + filepath.replace('/www/', '') + '"></script>'
      }))
    .pipe(gulp.dest('www'));
});

///////////////////////////////////////
// BUILD VERSION
gulp.task('replace-build-version', function() {
  return gulp.src('./config.xml')
    .pipe(replace(
      /version=\"[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}(-alpha\.[0-9]{1,3})?\"/,
      'version=\"' + require('./package.json').version + '\"'))
    .pipe(gulp.dest('./'));
});

///////////////////////////////////////
// SEQUENCE
gulp.task('sequence', done => {
  runSequence(
    'clean',
    'constant',
    'sass',
    'copy',
    'wiredep',
    'inject', done);
});

gulp.task('sequence:production', done => {
  runSequence(
    'env:prod',
    'clean',
    'constant',
    'sass',
    'copy',
    'wiredep:client',
    'inject',
    'replace-build-version', done);
});

///////////////////////////////////////
// WATCH
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass', 'copy:css']);
  gulp.watch(paths.html, ['copy:html']);
  gulp.watch(paths.css, ['copy:css']);
  gulp.watch(paths.js, ['copy:js']);
});

///////////////////////////////////////
// UNIT TESTING
gulp.task('test', ['env:test', 'sequence'], (done) => {
  return new KarmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

///////////////////////////////////////
// SERVE
gulp.task('serve', ['env:dev', 'sequence'], (done) => {
  sh.exec('ionic serve');
  done();
});
gulp.task('serve:dist', ['env:prod', 'sequence'], (done) => {
  sh.exec('ionic serve');
  done();
});

///////////////////////////////////////
// BUILD
gulp.task('build', [
  'lint', 'env:prod', 'sequence', 'replace-build-version'
], (done) => {
  sh.exec('ionic build');
  done();
});

gulp.task('build:android', ['sequence:production'], (done) => {
  sh.exec('ionic build android');
  done();
});

gulp.task('build:release', [
  'lint', 'env:prod', 'sequence', 'replace-build-version'
], (done) => {
  sh.exec('ionic build --release');
  done();
});

gulp.task('default', done => {
  runSequence('lint', 'test', 'build', done);
});
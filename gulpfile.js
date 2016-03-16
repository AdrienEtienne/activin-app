var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var sh = require('shelljs');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function (done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', function () {
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('install', ['git-check'], function () {
  return bower.commands.install()
    .on('log', function (data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function (done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});

gulp.task('cli-check', ['git-check'], function (done) {
  if (!sh.which('cordova')) {
    console.log(
      '  ' + gutil.colors.red('cordova is not installed.'),
      '\n  Cordova, the cross-platform dev tool is required.',
      '\n  Install with command ' + gutil.colors.cyan('npm install -g cordova')
    );
    process.exit(1);
  } else if (!sh.which('ionic')) {
    console.log(
      '  ' + gutil.colors.red('ionic is not installed.'),
      '\n  Ionic, the cordova framework based on AngularJS is required.',
      '\n  Install with command ' + gutil.colors.cyan('npm install -g ionic')
    );
    process.exit(1);
  }
  done();
});

// PERSO
var runSequence = require('run-sequence');
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

gulp.task('wiredep', cb => {
  runSequence('wiredep:client', 'wiredep:test', cb);
});

// inject bower components
gulp.task('wiredep:client', () => {
  return gulp.src('www/index.html')
    .pipe(wiredep({
      ignorePath: './www'
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

gulp.task('jshint', function () {
  return gulp.src('./www/js/**/*.js')
    .pipe(ignore.exclude(/app\.constant\.js/))
    .pipe(ignore.exclude(/.*\.spec\.js/))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('jshintTest', function () {
  return gulp.src('./www/js/**/*.spec.js')
    .pipe(ignore.exclude(/app\.constant\.js/))
    .pipe(jshint())
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
    .pipe(gulp.dest('www/js'))
});

gulp.task('replace-build-version', function () {
  gulp.src('./config.xml')
    .pipe(replace(
      /version=\"[0-9]{1,2}\.[0-9]{1,2}\.[0-9]{1,2}(-alpha\.[0-9]{1,3})?\"/,
      'version=\"' + require('./package.json').version + '\"'))
    .pipe(gulp.dest('./'));
});

gulp.task('sequence:dev', done => {
  runSequence('cli-check', 'env:dev', 'constant', 'wiredep', 'inject', done);
});

gulp.task('sequence:production', done => {
  runSequence('cli-check', 'env:prod', 'constant', 'wiredep', 'inject', 'jshint', 'replace-build-version', done);
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

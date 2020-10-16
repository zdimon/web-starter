var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var tsify = require("tsify");
var uglify = require('gulp-uglify-es').default;
var buffer = require('vinyl-buffer');

rename = require('gulp-rename'),
gulp.task("copy-html", function () {
    return gulp.src('./src/server/tpl/index_prod.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest("dist/prod"));
});


gulp.task('build-app', (done) => {
    
    return browserify({
        basedir: './src/client',
        debug: true,
        entries: ['index.tsx']
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest("dist/prod"));

})

gulp.task('default', gulp.series('copy-html', 'build-app'));

var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var babel  = require('gulp-babel');
var merge = require('merge-stream');
var replace = require('gulp-string-replace');
var del = require('del');
var rename = require('gulp-rename');
var argv = require('yargs').argv;
var notMinEntifixJs = (argv.dev === undefined) ? false : true;
var watch = (argv.watch === undefined) ? false : true;
var serviceName = '';

//PACKAGE APLICATION _________________________________________________________________________________________________
//====================================================================================================================

//CREATE PRODUCTION PACKAGE FOR PROJECT APP
gulp.task('clean-app-dist', () => {
    return del(['dist/**/*']);
});

gulp.task('package-app', ['transfer-dependencies', 'environment-set-prod'], ()=>{
    if (notMinEntifixJs)
    {
        var transferIndex = gulp.src('index.html')
            .pipe(replace('app/metadata.js','app/js/metadata.js'))
            .pipe(replace('app/app.js','app/js/app.min.js'))
            .pipe(gulp.dest('dist/'));
    }
    else
    {
        var transferIndex = gulp.src('index.html')
            .pipe(replace('app/metadata.js','app/js/metadata.js'))
            .pipe(replace('app/app.js','app/js/app.min.js'))
            .pipe(replace('vendor/entifix-js/entifix-js.js', 'vendor/entifix-js/entifix-js.min.js'))
            .pipe(replace('vendor/', serviceName+'vendor/'))
            .pipe(replace('app/', serviceName+'app/'))
            .pipe(gulp.dest('dist/'));
    }

    var viewAndAppConfigFiles = gulp.src(['app/**/*.html', 'app/app-config.js', ])
                                .pipe(gulp.dest('dist/app'));
    
    var cssFiles = gulp.src(['app/css/*.*'])
                        .pipe(gulp.dest('dist/app/css'));
    
    var imgFiles = gulp.src(['app/img/*.*'])
                        .pipe(gulp.dest('dist/app/img'));
    
    var metadataFile = gulp.src(['app/metadata.js'])
                        .pipe(gulp.dest('dist/app/js'));
   
    var minifyApp = gulp.src('app/app.js')
                            .pipe(babel({presets: ['babel-preset-es2015'].map(require.resolve)}))
                            .pipe(concat('app.min.js'))
                            .pipe(uglify().on('error', function(e){
                                console.log('Error en la minificación/ofuscación de app.js: ' + e)    
                            }))
                            .pipe(gulp.dest('dist/app/js'));

    var minifyApp = gulp.src(['app/js/**/*.js','app/shared/**/*.js'])
                            .pipe(babel({presets: ['babel-preset-es2015'].map(require.resolve)}))
                            .pipe(concat('project-app.min.js'))
                            .pipe(uglify().on('error', function(e){
                                console.log('Error en la minificación/ofuscación del app: ' + e)    
                            }))
                            .pipe(gulp.dest('dist/app/js'));
   
    return merge(transferIndex ,viewAndAppConfigFiles, cssFiles, imgFiles, metadataFile, minifyApp, minifyApp);
});

gulp.task('transfer-dependencies', ['clean-app-dist', 'transfer-dependencies-to-vendor'], () => 
{
    var dependencies = 
    [
        { src: 'vendor/angular/*.*', dest: 'dist/vendor/angular' },
        { src: 'vendor/angular-animate/*.*', dest: 'dist/vendor/angular-animate' },
        { src: 'vendor/angular-aria/*.*', dest: 'dist/vendor/angular-aria' },
        { src: 'vendor/angular-jwt/*.*', dest: 'dist/vendor/angular-jwt' },
        { src: 'vendor/angular-material/*.*', dest: 'dist/vendor/angular-material' },
        { src: 'vendor/ng-material-datetimepicker/*.*', dest: 'dist/vendor/ng-material-datetimepicker' },
        { src: 'vendor/ng-material-sidemenu/*.*', dest: 'dist/vendor/ng-material-sidemenu' },
        { src: 'vendor/angular-md5/*.*', dest: 'dist/vendor/angular-md5' },
        { src: 'vendor/angular-messages/*.*', dest: 'dist/vendor/angular-messages' },
        { src: 'vendor/ocLazyLoad/*.*', dest: 'dist/vendor/ocLazyLoad' },
        { src: 'vendor/angular-pagination/**/**/**/*.*', dest: 'dist/vendor/angular-pagination'},
        { src: 'vendor/momentjs/*.*', dest: 'dist/vendor/momentjs'},
        { src: 'vendor/entifix-js/**/*.*', dest: 'dist/vendor/entifix-js/' },
        { src: 'vendor/sweetalert2/*.*', dest: 'dist/vendor/sweetalert2' },
        { src: 'vendor/ui-router/*.*', dest: 'dist/vendor/ui-router' },
        { src: 'vendor/whirl/*.*', dest: 'dist/vendor/whirl' }
    ];
        
    var allTasks = [ ];

    for (var file of dependencies)
        allTasks.push( gulp.src(file.src).pipe(gulp.dest(file.dest)) );

    return merge(allTasks);
});

gulp.task('transfer-dependencies-to-vendor', ['transfer-to-vendor'], () =>
{
    if (notMinEntifixJs)
        return del(['vendor/entifix-js/entifix-js.min.js']);
    else
        return del(['vendor/entifix-js/entifix-js.js']);
});

gulp.task('transfer-to-vendor', ['clean-vendor'], () => 
{
    var dependencies = 
    [
        { src: 'node_modules/angular/angular.min.js', dest: 'vendor/angular' },
        { src: 'node_modules/angular/angular.min.js.map', dest: 'vendor/angular' },
        { src: 'node_modules/angular-animate/angular-animate.min.js', dest: 'vendor/angular-animate' },
        { src: 'node_modules/angular-animate/angular-animate.min.js.map', dest: 'vendor/angular-animate' },
        { src: 'node_modules/angular-aria/angular-aria.min.js', dest: 'vendor/angular-aria' },
        { src: 'node_modules/angular-aria/angular-aria.min.js.map', dest: 'vendor/angular-aria' },
        { src: 'node_modules/angular-jwt/dist/angular-jwt.min.js', dest: 'vendor/angular-jwt' },
        { src: 'node_modules/angular-material/angular-material.min.js', dest: 'vendor/angular-material' },
        { src: 'node_modules/angular-material/angular-material.css', dest: 'vendor/angular-material' },
        { src: 'utils/angular-material/*.*', dest: 'vendor/angular-material' },
        { src: 'node_modules/ng-material-datetimepicker/dist/*.*', dest: 'vendor/ng-material-datetimepicker' },
        { src: 'node_modules/ng-material-sidemenu/dest/*.*', dest: 'vendor/ng-material-sidemenu' },
        { src: 'node_modules/angular-md5/angular-md5.min.js', dest: 'vendor/angular-md5' },
        { src: 'node_modules/angular-md5/angular-md5.min.js.map', dest: 'vendor/angular-md5' },
        { src: 'node_modules/angular-messages/angular-messages.min.js', dest: 'vendor/angular-messages' },
        { src: 'node_modules/angular-messages/angular-messages.min.js.map', dest: 'vendor/angular-messages' },
        { src: 'node_modules/oclazyload/dist/ocLazyLoad.min.js', dest: 'vendor/ocLazyLoad' },
        { src: 'utils/angular-pagination/**/**/**/*.*', dest: 'vendor/angular-pagination'},
        { src: 'utils/momentjs/*.*', dest: 'vendor/momentjs'},
        { src: 'node_modules/sweetalert2/dist/sweetalert2.min.css', dest: 'vendor/sweetalert2' },
        { src: 'node_modules/sweetalert2/dist/sweetalert2.min.js', dest: 'vendor/sweetalert2' },
        { src: 'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js', dest: 'vendor/ui-router' },
        { src: 'node_modules/@jh3y/whirl/dist/whirl.min.css', dest: 'vendor/whirl' },
        { src: 'node_modules/entifix-js/dist/**/**/**/*.*', dest: 'vendor/entifix-js'}
    ];
        
    var allTasks = [ ];

    for (var file of dependencies)
        allTasks.push(gulp.src(file.src).pipe(gulp.dest(file.dest)));
    return merge(allTasks);
});

gulp.task('clean-vendor', ()=> {
    return del(['vendor']);
})

gulp.task('to-desa-environment', ['package-app']);

gulp.task('to-production-environment', ['to-desa-environment'], ()=>{

    return gulp.src(['dist/app/app-config.js'])
                    .pipe(gulp.dest('dist/app')) 
});

gulp.task('clean-dist', ['clean-app-dist']);


//====================================================================================================================
//====================================================================================================================




//MANAGE APLICATION ENVIRONMENTS______________________________________________________________________________________
//====================================================================================================================

// Development environment
gulp.task('environment-set-dev', ['clean-app-dist', 'transfer-dependencies-to-vendor'], () =>{

    var configApp = gulp.src("app/appBuild/appConfiguration.js")
                        .pipe(rename("app-config.js"))
                        .pipe(gulp.dest("app"));
    var buildApp = gulp.src(['app/appBuild/devAppMainModule.js', 'app/appBuild/appController.js'])
                        .pipe(concat('app.js'))
                        .pipe(gulp.dest('app'));

    if (notMinEntifixJs)
        var transferIndex = gulp.src('index.html').pipe(replace('vendor/entifix-js/entifix-js.min.js', 'vendor/entifix-js/entifix-js.js')).pipe(gulp.dest(''));
    else
        var transferIndex = gulp.src('index.html').pipe(replace('vendor/entifix-js/entifix-js.js', 'vendor/entifix-js/entifix-js.min.js')).pipe(gulp.dest(''));
    return merge(configApp, buildApp);
});

gulp.task('to-dev-environment', ()=>{

    gulp.start('environment-set-dev');

    if (watch)
    {
        gulp.watch(['app/appBuild/appConfiguration.js', 'app/appBuild/devAppMainModule.js', 'app/appBuild/appController.js'], () =>{
            gulp.start('environment-set-dev');
        });
    }
});


// Production environment
gulp.task('environment-set-prod', [], () =>{

    var configApp = gulp.src("app/appBuild/appConfiguration.js")
                        .pipe(rename("app-config.js"))
                        .pipe(gulp.dest("app"));

    var buildApp = gulp.src(['app/appBuild/prodAppMainModule.js', 'app/appBuild/appController.js'])
                        .pipe(concat('app.js'))
                        .pipe(gulp.dest('app'));

    return merge( configApp, buildApp );
});

//====================================================================================================================
//====================================================================================================================

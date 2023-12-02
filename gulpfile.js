const gulp = require("gulp");
const fileInclude = require("gulp-file-include");
const sass = require("gulp-sass")(require("sass"));
const server = require("gulp-server-livereload");
const clean = require("gulp-clean");
const fs = require("fs");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const webpack = require("webpack-stream");
const babel = require("gulp-babel");

const fileIncludeOptions = {
    prefix: "@@",
    basepath: "@file",
}

gulp.task("html", () => {
    return gulp.src("./src/*.html")
        .pipe(fileInclude(fileIncludeOptions))
        .pipe(gulp.dest("./build/"))
});

const plumberScssOptions = (title) => (
    {
        errorHandler: notify.onError({
            title: title,
            message: "Error <%= error.message =%>",
            sound: false,
        })
    }
)
gulp.task("scss", () => {
    return gulp.src("./src/scss/**/*.scss")
        .pipe(plumber(plumberScssOptions("Scss")))
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./build/css"))
});

gulp.task("js", () => {
    return gulp.src("./src/js/**/*.js")
        .pipe(babel())
        .pipe(webpack(require("./webpack.config")))
        .pipe(gulp.dest("./build/js/"))
});

gulp.task("images", () => {
    return gulp.src("./src/img/**/*")
        .pipe(gulp.dest("./build/img/"))
});

const serverOptions = {
    livereload: true,
    open: true,
}
gulp.task("server", () => {
    return gulp.src("./build/")
        .pipe(server(serverOptions))
});

gulp.task("stream", () => {
    gulp.watch("./src/**/*.html", gulp.parallel("html"));
    gulp.watch("./src/scss/**/*.scss", gulp.parallel("scss"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("js"));
    gulp.watch("./src/img/**/*", gulp.parallel("images"));
});

gulp.task("clean", (done) => {
    if (fs.existsSync("./build/")) {
        return gulp.src("./build/", {read: false})
            .pipe(clean({force: true}))
    }
    done();
})

gulp.task("default", gulp.series(
    "clean",
    gulp.parallel("html", "scss", "js", "images"),
    gulp.parallel("server", "stream"),
));
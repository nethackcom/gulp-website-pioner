const gulp = require("gulp");
const fileInclude = require("gulp-file-include");
const sass = require("gulp-sass")(require("sass"));
const server = require("gulp-server-livereload");
const clean = require("gulp-clean");
const fs = require("fs");

const fileIncludeOptions = {
    prefix: "@@",
    basepath: "@file",
}

gulp.task("html", () => {
    return gulp.src("./src/*.html")
        .pipe(fileInclude(fileIncludeOptions))
        .pipe(gulp.dest("./build/"))
});

gulp.task("sass", () => {
    return gulp.src("./src/scss/**/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./build/css"))
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
    gulp.watch("./src/scss/**/*.scss", gulp.parallel("sass"));
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
    gulp.parallel("html", "sass", "images"),
    gulp.parallel("server", "stream"),
));
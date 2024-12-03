import gulp from 'gulp';
import pug from 'gulp-pug';
import gulpSass from 'gulp-sass';
import sass from 'sass';
import plumber from 'gulp-plumber';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import babel from 'gulp-babel';
import sourcemaps from 'gulp-sourcemaps';
import browser from 'browser-sync';
import { deleteAsync } from 'del';
import webpackStream from 'webpack-stream';
import webpackConfig from './webpack.config.js';
import svgSprite from 'gulp-svg-sprite';

const sassCompiler = gulpSass(sass);
const { src, dest, watch, series, parallel } = gulp;

// Пути
const paths = {
    pug: {
        pages: 'src/views/**/*.pug',
        components: '!src/ui/**/*.pug', // Исключаем компоненты
    },
    styles: {
        global: 'src/scss/**/*.scss',
        components: '!src/ui/**/*.scss', // Исключение компонентов
    },
    scripts: {
        src: 'src/js/app.js',
        dest: 'dist/js/',
    },
    assets: {
        src: 'src/assets/**/*',
        dest: 'dist/assets/',
    },
    svgs: {
        src: 'src/svgsprite/*.svg',
        dest: 'dist/assets/img/',
    },
};

// Конфигурация для SVG-спрайта
const svgConfig = {
    mode: {
        symbol: {
            sprite: 'svgsprite.svg', // Имя итогового файла
        },
    },
    svg: {
        xmlDeclaration: false,
        doctypeDeclaration: false,
    },
};

// Задачи
function clean() {
    return deleteAsync(['dist']);
}

function html() {
    return src([paths.pug.pages, paths.pug.components])
        .pipe(plumber())
        .pipe(pug({ pretty: true }))
        .pipe(dest('dist/')) // Компилируем прямо в корень dist
        .pipe(browser.stream());
}

function styles() {
    return src([paths.styles.global, paths.styles.components])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(
            sassCompiler({
                includePaths: ['./node_modules'], // Укажите путь к node_modules
            }).on('error', sassCompiler.logError)
        )
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist/css/'))
        .pipe(browser.stream());
}

// Задача для обработки JS
function scripts() {
    return src(paths.scripts.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(webpackStream(webpackConfig))
        .pipe(babel({
            presets: ['@babel/env'],
            // Убедитесь, что модули остаются как ES6
            plugins: []
        }))
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(dest(paths.scripts.dest))
        .pipe(browser.stream());
}


function assets() {
    return src(paths.assets.src).pipe(dest(paths.assets.dest));
}

// Задача для создания SVG-спрайта
function svgSpriteTask() {
    return src(paths.svgs.src)
        .pipe(svgSprite(svgConfig))
        .pipe(dest(paths.svgs.dest))
        .pipe(browser.stream());
}

function serve() {
    browser.init({
        server: {
            baseDir: 'dist/',
        },
        notify: false,
        open: false,
    });

    watch(paths.pug.pages, html);
    watch(paths.styles.global, styles);
    watch(paths.scripts.src, scripts);
    watch(paths.assets.src, assets).on('change', browser.reload);
    watch(paths.svgs.src, svgSpriteTask);
}

// Экспорт задач
export const cleanDist = clean;
export const build = series(clean, parallel(html, styles, scripts, assets, svgSpriteTask));
export const dev = series(build, serve);

export default dev;
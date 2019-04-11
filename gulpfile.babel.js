/* eslint-disable no-console */

// Modules
import {
  series, parallel, src, dest, watch,
} from 'gulp';
import gulpUtil from 'gulp-util';
import del from 'del';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import sourcemaps from 'gulp-sourcemaps';
import browserSync from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import minimist from 'minimist';
// Setting
import { config } from './env_files/data/config';
import Utils from './env_files/modules/utils';

// Variables
const argv = minimist(process.argv.slice(2));
const mode = argv.production ? 'production' : 'development';
const cssCompileMode = (mode === 'production' ? 'compressed' : 'expanded');
const utils = new Utils();

// Tasks
function minifyHtml(cb) {
  console.log(utils.emShellMsg('minifyHtml'));
  src(config.htmls.src)
    .pipe(plumber())
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true,
    }))
    .pipe(dest(config.htmls.dest))
    .pipe(browserSync.stream());
  cb();
}

function buildCss(cb) {
  console.log(utils.emShellMsg('buildCss'));
  src(config.styles.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: cssCompileMode })
      .on('error', (err) => {
        gulpUtil.log(err);
        this.emit('end');
      }))
    .pipe(postcss([
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
    ]))
    .pipe(sourcemaps.write())
    .pipe(rename(`${config.styles.bundleFileName}.css`))
    .pipe(dest(config.styles.dest))
    .pipe(browserSync.stream());
  cb();
}

function buildJs(cb) {
  console.log(utils.emShellMsg('buildJs'));
  src(config.scripts.src)
    .pipe(plumber())
    .pipe(webpackStream({
      mode,
      target: 'node',
      entry: {
        app: config.scripts.entrypoint,
      },
      output: {
        filename: `${config.scripts.bunleFileName}.js`,
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
              },
            },
          },
        ],
      },
      devtool: 'inline-source-map', // or source-map
    }, webpack))
    .pipe(dest(config.scripts.dest))
    .pipe(browserSync.stream());
  cb();
}

function activeServer(cb) {
  console.log(utils.emShellMsg('activeServer'));
  browserSync.init({
    server: {
      baseDir: config.app.dest,
    },
    port: 8080,
  });
  cb();
}

function activeWatch(cb) {
  watch(config.htmls.src, series(minifyHtml));
  watch(config.styles.src, series(buildCss));
  watch(config.scripts.src, series(buildJs));
  cb();
}

function clean() {
  console.log(utils.emShellMsg('clean'));
  return del([config.app.dest]);
}

function showModeInfo(cb) {
  console.log(utils.emShellMsg(`-- This system used "${mode}" mode`));
  cb();
}

exports.default = series(
  clean,
  parallel(
    minifyHtml,
    buildCss,
    buildJs,
  ),
  activeServer,
  activeWatch,
  showModeInfo,
);

exports.build = series(
  clean,
  parallel(
    minifyHtml,
    buildCss,
    buildJs,
  ),
  showModeInfo,
);

exports.clean = clean;

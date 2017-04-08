<div align="center">

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg?style=flat-square)](https://github.com/Flet/semistandard)[![Build Status](https://img.shields.io/travis/RobinCK/gulp-css-rebase.svg?style=flat-square)](https://travis-ci.org/RobinCK/gulp-css-rebase)[![Code Climate](https://img.shields.io/codeclimate/github/RobinCK/gulp-css-rebase.svg?style=flat-square)](https://codeclimate.com/github/RobinCK/gulp-css-rebase)[![npm](https://img.shields.io/npm/dt/gulp-css-rebase.svg?style=flat-square)](https://github.com/RobinCK/gulp-css-rebase)[![Dependencies](https://david-dm.org/robinck/gulp-css-rebase.svg?style=flat-square)](https://david-dm.org/robinck/gulp-css-rebase)[![devDependencies](https://david-dm.org/robinck/gulp-css-rebase/dev-status.svg?style=flat-square)](https://david-dm.org/robinck/gulp-css-rebase#info=devDependencies&view=table)[![NPM version](https://img.shields.io/npm/v/gulp-css-rebase.svg?style=flat-square)](https://www.npmjs.com/package/gulp-css-rebase)
</div>


# gulp-css-rebase

A [gulp](http://gulpjs.com/) plugin that allows rewriting url references in CSS

## Install

```
$ npm install --save-dev gulp-css-rebase
```

## Usage

```js
const gulp = require('gulp');
const rebase = require('gulp-css-rebase');

var outputPath = 'dest';
var outputAssets = 'static';

gulp.task('default', () =>
	gulp.src('src/*.css')
		.pipe(rebase({
		    output_css: outputPath,
		    output_assets: outputAssets,
        exclude: [
            'path/to/web/dir'
        ],
        overwrite: false
		}))
		.pipe(gulp.dest(outputPath))
);
```

### Options
- `output_css` - The target directory for the processed CSS. Paths are rewritten relatively to that directory.
- `output_assets` - The target directory for CSS assets.
- `exclude` - Paths are rewritten relatively to original path.
- `overwrite` - Overwrite files

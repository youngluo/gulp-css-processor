<div style="text-center">
<h1 style="text-center">gulp-css-processor</h1>
<a href="https://badge.fury.io/js/gulp-css-processor"><img src="https://badge.fury.io/js/gulp-css-processor.svg" alt="npm version" height="18"></a>
</div>

A [gulp](http://gulpjs.com/) plugin that allows rewriting url references in css files. And copy resource files to new locations automatically.

## Install

```
$ npm install --save-dev gulp-css-processor
```

## Usage

```js
const gulp = require('gulp');
const processor = require('gulp-css-processor');

gulp.task('default', () =>
	gulp.src('src/*.css')
		.pipe(processor())
		.pipe(gulp.dest('dist'))
);
```

### Options
- `dest` - The target directory for the processed css file. Paths are rewritten relatively to that directory. Default 'dist'.
- `assets` - The target directory for CSS assets. Default 'assets'.
- `suffix` - The suffix of hash. Default 'v'.
- `prefix` - The prefix of url in css files. Default ''.

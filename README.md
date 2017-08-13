# gulp-css-processor

A [gulp](http://gulpjs.com/) plugin that allows rewriting url references in css files.

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
		.pipe(processor({
		    dist: 'dist',
		    assets: 'dist/assets'
		}))
		.pipe(gulp.dest('dist'))
);
```

### Options
- `dist` - The target directory for the processed css file. Paths are rewritten relatively to that directory.
- `assets` - The target directory for CSS assets.

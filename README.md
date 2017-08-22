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
		    dest: 'dist',
		    assets: 'assets'
		}))
		.pipe(gulp.dest('dist'))
);
```

### Options
- `dest` - The target directory for the processed css file. Paths are rewritten relatively to that directory. Default 'dist'.
- `assets` - The target directory for CSS assets. Default 'assets'.
- `suffix` - The suffix of hash. Default 'v'.

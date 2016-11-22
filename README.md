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

gulp.task('default', () =>
	gulp.src('src/*.css')
		.pipe(rebase({
		    output: outputPath,
            exclude: [
                'path/to/web/dir'
            ],
            overwrite: false
		}))
		.pipe(gulp.dest(outputPath))
);
```

### Options
- `output` - The target directory for the processed CSS. Paths are rewritten relatively to that directory.
- `exclude` - Paths are rewritten relatively to original path.
- `overwrite` - Overwrite files

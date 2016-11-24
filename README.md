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

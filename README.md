# gulp-css-rebase

## Install

```
$ npm install --save-dev gulp-css-rebase
```

## Usage

```js
const gulp = require('gulp');
const rebase = require('gulp-css-rebase');

var webPath = '.', outputPath = 'dest';

gulp.task('default', () =>
	gulp.src('src/*.css')
		.pipe(rebase(outputPath, webPath))
		.pipe(gulp.dest(outputPath))
);
```


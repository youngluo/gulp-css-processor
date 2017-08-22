'use strict';

const path = require('path');
const rework = require('rework');
const url = require('rework-plugin-url');
const through = require('through2');
const mkpath = require('mkpath');
const fs = require('fs');
const md5 = require('md5');
const fileExists = require('file-exists');

function processor(file, options) {
  let css = file.contents.toString();
  const hash = md5(css);

  return rework(css)
    .use(url(url => {
      if (!/^(data|\/|\w+:\/\/)/.test(url)) {
        const assetPath = path
          .join(path.dirname(file.path), url)
          .replace(/[\#|\?].*$/, '');

        const newPath = path.normalize(path.join(options.dest, options.assets, path.basename(assetPath)));

        if (!fileExists(newPath)) {
          mkpath(path.dirname(newPath), function (err) {
            if (err) {
              throw err;
            }

            fs
              .createReadStream(assetPath)
              .pipe(fs.createWriteStream(newPath));
          });
        }

        url = `/${path.relative(options.dest, newPath).replace('\\', '/')}?${options.suffix}=${hash}`;
      }

      return url;
    }))
    .toString();
}

module.exports = function (opt) {
  const options = Object.assign({}, {
    dest: 'dist',
    assets: 'assets',
    suffix: 'v'
  }, opt);

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return;
    }

    if (file.isStream()) {
      return this.emit('error', PluginError('gulp-css-processor', 'Streaming not supported'));
    }

    file.contents = new Buffer(processor(file, options));

    cb(null, file);
  });
};

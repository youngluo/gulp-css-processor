'use strict';

var path = require('path');
var rework = require('rework');
var url = require('rework-plugin-url');
var through = require('through2');
var mkpath = require('mkpath');
var fs = require('fs');
var merge = require('merge');
var md5 = require('md5');
var fileExists = require('file-exists');

module.exports = function (opt) {
  var options = merge({
    output_assets: null,
    output_css: null,
    exclude: [],
    overwrite: false
  }, opt);

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      return;
    }

    if (file.isStream()) {
      return this.emit('error', PluginError('gulp-css-rebase', 'Streaming not supported')); // eslint-disable-line
    }

    var adjusted = adjust(file);
    file.contents = new Buffer(adjusted);

    cb(null, file);
  });

  function adjust(file) {
    var css = file.contents.toString();

    return rework(css)
            .use(url(function (url) {
              if (!/^(data|\/|\w+:\/\/)/.test(url)) {
                var assetPath = path.join(path.dirname(file.path), url);
                var assetFolder = md5(path.relative(process.cwd(), path.dirname(assetPath)));
                var IsExclude = false;

                for (var index in options.exclude) {
                  if (options.exclude[index] === assetPath.substr(0, options.exclude[index].length)) {
                    IsExclude = true;
                    break;
                  }
                }

                var newPath = !IsExclude
                            ? path.normalize(path.join(options.output_assets, assetFolder, path.basename(assetPath)))
                            : path.normalize(assetPath)
                        ;

                if (
                        (!IsExclude && !fileExists(newPath))
                        ||
                        (!IsExclude && options.overwrite)
                    ) {
                  mkpath(path.dirname(newPath), function (err) {
                    if (err) {
                      throw err;
                    }

                    fs
                                .createReadStream(assetPath.replace(/[\#|\?].*$/, ''))
                                .pipe(fs.createWriteStream(newPath.replace(/[\#|\?].*$/, '')))
                            ;
                  });

                }

                url = path.relative(options.output_css, newPath);
              }

              return url;
            }))
            .toString();
  }
};

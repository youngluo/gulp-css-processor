'use strict';

var path = require('path');
var rework = require('rework');
var url = require('rework-plugin-url');
var through = require('through2');
var mkpath = require('mkpath');
var fs = require('fs');

module.exports = function(filePath, publicPrefix){
  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      return;
    }

    if (file.isStream()){
      return this.emit('error', PluginError('gulp-css-rebase',  'Streaming not supported'));
    }

    var adjusted = adjust(file);
    file.contents = new Buffer(adjusted);

    cb(null, file);
  });

  function adjust(file){
    var css = file.contents.toString();

    return rework(css)
      .use(url(function(url) {
        if(!/^(data|\/|\w+:\/\/)/.test(url)){
          var assetPath = path.join(path.dirname(file.path), url);
          var assetFolder = path.basename(path.dirname(assetPath))
          var newPath = path.join(filePath, assetFolder, path.basename(assetPath)).replace(/[\#|\?].*$/, '');

          mkpath(path.dirname(newPath), function(err) {
            if (err) {
              throw err;
            }

            fs.createReadStream(assetPath.replace(/[\#|\?].*$/, '')).pipe(fs.createWriteStream(newPath));
          });

          url = path.normalize(path.join(publicPrefix, assetFolder, path.basename(assetPath))).replace(/\\/g, '/');
        }

        return url;
      }))
      .toString();
  }
};

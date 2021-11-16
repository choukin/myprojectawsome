var iconutil = require('iconutil');

var path = './icons.iconset';

iconutil.toICNS(path, function(err, icon) {
    // icon is a Buffer containing the ICNS file
});
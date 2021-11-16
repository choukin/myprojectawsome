const aboutWindow = require('about-window').default

const path = require('path')

const create = () => openAboutWindow({
    icon_path: path.join(__dirname,'icon.png'),
    package_json_dir:path.relative(__dirname,'/../../../'),
    cropyright:'Copyright(c)2021 dougot',
    homepage:'https://github.com/dengyaolong/geektime-electron'
})

module.exports = {create}
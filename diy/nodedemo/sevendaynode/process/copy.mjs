import child_process from 'node:child_process'

import util from 'node:util'

function copy(source, target, callback) {
    child_process.exec(
        util.format('cp -r %s* %s', source, target),
        callback               
    )
}


copy('./a','./b', function (error) {
    console.log(error);
})
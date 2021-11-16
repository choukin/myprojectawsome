const { Writable } = require('stream')

class MyWritable extends Writable {
    constructor(options) {
        super(options)
    }

    _write(chunk, encoding, callback) {
        if (chunk.toString().indexOf('a' >= 0)) {
            callback(new Error('chunk is invalid'))
        } else {
            callback()
        }
    }
}
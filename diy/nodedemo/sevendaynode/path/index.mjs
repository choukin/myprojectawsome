import path from 'node:path'
// `node:` 前缀是 `lib/` 里面的核心模块，使用的时候会绕过require缓存
// 即便你有同名的模块被cache，也始终返回内置的

let cache = {};

function store(key, value) {
    // 兼容所有系统  window \ linux /
    key = key.replace(/\\/g, '/')
    console.log(path.normalize(key));

    cache[path.normalize(key)] = value
}

store('foo/bar',1)

store('foo//baz//..//bar',2)

console.log(cache);


const rpath = path.join('foo/','baz/','../bar')
console.log(rpath);

const ext = path.extname('foo/bar.js')
console.log('ext',ext);
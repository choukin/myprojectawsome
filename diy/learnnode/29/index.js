const user = {
    name:'<script/>'
}

const result = `<h2>${user.name}</h2>`
const templateA = '`<h2>${include("templateB")}</h2>`'
const templateB = '`<p>hahahahah</p>`'
const templateMap = {
    templateA,
    templateB
}
const vm = require('vm')

const context = {
    include:function(name){
        return templateMap[name]()
    },
    helper:function(){

    },
    _:function(markup){
        if(!markup) return 
        return String(markup)
        .replace(/&/g,'&amp;')
        .replace(/</g,'&lt;')
        .replace(/>/g,'&gt;')
        .replace(/'/g,'&#39;')
        .replace(/"/g,'&quot;')

}
}
Object.keys(templateMap).forEach(key=>{
    const temp = templateMap[key];
    templateMap[key] =  vm.runInNewContext(`
    (function() {
        return ${temp};
    });
    `,context)
})



console.log(templateMap['templateA']());
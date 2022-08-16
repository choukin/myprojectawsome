
// function requireEntryTitle(req,res, next) {
//     const title = req.body.entry.title
//     if(title){
//         next()
//     }else {
//         res.error('Title is required')
//         res.redirect('back')
//     }
// }



// function requireEntryTitleLengthAbove(len){
//     return (req, res, next)=>{
//         const title = req.body.entry.title
//         if(title.length > len){
//             next()
//         }else {
//             res.error(`title must be longer than ${len}.`)
//             res.redirect('back')
//         }
//     }
// }

function parseField(field) {
    console.log(field);
    console.log(field.split(/\[|\]/));
    return field.split(/\[|\]/).filter((s)=>s)
}

function getField(req, field){
    let val = req.body
    field.forEach(prop => {
        val = val[prop]
    });
    return val
}

const  required = (field)=>{
    field=parseField(field)
    return (req,res,next)=>{
        if(getField(req,field)){
            next()
        }else{
            res.error(`${field.join(' ')} is required`)
            res.redirct('back')
        }
    }
}

const lengthAbove = (field, len)=>{
    field = parseField(field)
    return (req,res,next)=>{
        if(getField(req,field).length>len){
            next()
        }else{
            const fields = field.join(' ')
            res.error(`${fields} must have more than ${len} characters`)
            res.redirct('back')
        }
    }
}

module.exports = {
    required,
    lengthAbove
}
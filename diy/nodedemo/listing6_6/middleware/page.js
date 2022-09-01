// 分页中间件
module.exports = (cb,perpage)=>{
    perpage = perpage||10
    return (req, res,next)=>{
        let page = Math.max(parseInt(req.params.page||'1',10),
        1) -1

        cb((err,total)=>{
            if(err) return next(err)

            req.page = res.locals.page = {
                // 页号
                number:page,
                // 每页条数
                perpage:perpage,
                // 开始位置
                from:page*perpage,
                // 结束位置
                to:page*perpage+perpage-1,
                // 总条数
                total,
                // 总页数
                count: Math.ceil(total/perpage)
            }
            next();
         })

    }
}
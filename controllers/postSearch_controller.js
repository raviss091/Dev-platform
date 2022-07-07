const Post=require('../models/post')

module.exports.findSearchPost=function(req,res){
    console.log('PostSearch controller working')
    const detail=req.body.search_post
    console.log(' searching for '+detail+' now')

    const regex=new RegExp(detail,'i')
    const userFind=Post.find({content:{$regex:regex}},function(err,result){
        if(err){
            console.log(err)
            return res.redirect('back')
        }
        else{
            console.log(result)
            return res.render('post_result',{term:detail,posts:result})
        }
        //return res.redirect('back')
    })

}

// user.find({name:req.body.params})
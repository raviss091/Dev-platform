const User=require('../models/user')

module.exports.findSearchUser=function(req,res){
    console.log('controller working')
    const username=req.body.search_user
    console.log(' searching for '+username+' now')

    const regex=new RegExp(username,'i')
    const userFind=User.find({name:{$regex:regex}},function(err,result){
        if(err){
            console.log(err)
            return res.redirect('back')
        }
        else{
            console.log(result)
            return res.render('search_result',{search_user:result})
        }
        //return res.redirect('back')
    })

}

// user.find({name:req.body.params})
const express=require('express')
const router=express.Router()

const searchController=require('../controllers/search_controller')
const postSearchController=require('../controllers/postSearch_controller')
router.post('/users',searchController.findSearchUser)
router.post('/posts',postSearchController.findSearchPost)

module.exports=router
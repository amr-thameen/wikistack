const express = require('express');
const router = express.Router();
const {addPage} = require('../views')
const {Page, User} = require('../models');
const bodyParser = require('body-parser');
const {wikiPage} = require('../views');
const {main} = require('../views');
const {userList, userPages} = require('../views')


router.use(bodyParser.urlencoded({extended:true}))


router.get("/", async(req, res, next) => {
    try {
        const allPages = await Page.findAll({})
        res.send(main(allPages))
    } catch (err){
        next(err)
    }
})


router.post('/', async (req, res, next) => {
    try {
    const [user, wasCreated] = await User.findOrCreate({
        where : {
            name: req.body.author,
            email: req.body.email
        }
    })

    // const page = await Page.create(req.body)
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
    });

    page.setAuthor(user);

    res.redirect(`/wiki/${page.slug}`);
    } catch (error) {
         next(error) 
        }
  });



router.get('/add', (req, res, next) => {
    res.send(addPage())
})


router.get('/users', async (req, res, next) => {
    try{
        const users = await User.findAll({})
        res.send(userList(users))
    } catch (error) {
        next(error)
    }
})

router.get('/:slug', async (req, res, next) => {
    try {
        const page = await Page.findOne({
            where:{ 
                slug : req.params.slug
            }
        });
        const user = await page.getAuthor()
        console.log(page)
        res.send(wikiPage(page, user));
    } catch (err) {
        next(err)
    }
  });

  router.get('/:userId', async (req, res, next) =>{
    try {
        const user = await User.findById(req.params.userId)
        const pages = await Pages.findAll({
            where :{
                authorId: req.params.userId
            }
        })
    res.send(userPages(user, pages))
    } catch (err){
        next(err)
    }
})


  
module.exports = router;
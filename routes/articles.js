const express = require('express');
const router=express.Router();

//Bring in Article Model
let Article = require('../models/article');





//add route
router.get('/add', function(req, res){

    res.render('add_article',{
        title: 'Lisa artikkel'
      })
});




//add submin POST route

router.post('/add', function(req, res){
    req.checkBody('title', 'Pealkiri on nõutud').notEmpty();
    req.checkBody('author', 'Autor on nõutud').notEmpty();
    req.checkBody('body', 'Sisu on nõutud').notEmpty();

let errors=req.validationErrors();
    if(errors){
        res.render('add_article', {
            title: 'Lisa artikkel',
            errors:errors

})    

}else{

let article= new Article();
article.title=req.body.title;
article.author=req.body.author;
article.body=req.body.body;


article.save(function(err){
if(err){
    console.log(err);
}
else{
    req.flash('success', "Artikkel lisatud");
res.redirect('/');

}
});
};


});


//Load edit form
router.get('/edit/:id', function(req, res){
    Article.findById(req.params.id, function(err, article){
        res.render('edit_article', {
            title: 'Artikli muutmine',
            article:article
          });

});

});

//update Submit Post Route
router.post('/edit/:id', function(req, res){
    let article ={};
    article.title=req.body.title;
    article.author=req.body.author;
    article.body=req.body.body;

    let query = {_id:req.params.id} ;

    Article.update(query, article, function(err){
    if(err){
        console.log(err);
    }
    else{
    req.flash('success', 'Artikkel uuendatud')
    res.redirect('/');
    
    }
    });
    });
    
     
    

//Delete article
router.delete('/:id', function(req,res){
let query = {_id:req.params.id}

Article.remove(query, function(err){
    if(err){
console.log(err);

    }
    res.send('Success')

})

});

//Get Single Article
router.get('/:id', function(req, res){
    Article.findById(req.params.id, function(err, article){
        res.render('article', {
            article:article
          });

});

});

module.exports = router;
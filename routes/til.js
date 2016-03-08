var express = require('express');
var router = express.Router();


var tilEntries = [
  {slug: "March 5, 2016", body: "TIL that I don't have work on monday. Hooray."},
  {slug: "March 7, 2016", body: "TIL that extra parentheses can cause quite the headache. Also, I'm super good at Stardew Valley."}
];

/* GET til listing. */
router.get('/', function(req, res, next) {
  res.render('til/index', { title: 'Today I Learned',tilEntries:tilEntries });
});

/*Entry form*/
router.get('/new', function(req, res,next){
  res.render('til/new', {title: "Create a new TIL"});
});

/*create an entry*/
router.post('/', function(req,res,next){
  tilEntries.push(req.body);
  res.render('til/index', {title: 'Today I Learned', tilEntries: tilEntries});
});

/*update entry form */
router.get('/:id/edit', function(req,res,next){
  res.render('til/update',
  {
    title: 'Update a TIL',
    id: req.params.id,
    entry: tilEntries[req.params.id]
  });
});

/*update entry */
router.post('/:id',function(req,res,next){
  tilEntries[req.params.id] = req.body;
  res.render('til/index',{
    title: 'Update a TIL',
    tilEntries: tilEntries
  });
});

/*delete entry*/
router.get('/:id/delete', function(req,res,next){
  var id = req.params.id
  tilEntries = tilEntries.slice(0,id).concat(tilEntries.slice(id+1,tilEntries.length));
  res.render('til/index', {title: 'Today I Learned', tilEntries: tilEntries});
});

router.get('/:id', function(req,res,next){
  res.render('til/entry', {title: "An entry", entry: tilEntries[req.params.id]});
});

module.exports = router;

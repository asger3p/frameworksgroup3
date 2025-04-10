import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const {x} = req.body;
  console.log("Hello world!");
  res.json({ title: x });
});

export default router;

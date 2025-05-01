import { Router } from 'express';
var router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const {x} = req.body;
  console.log("the server is online");
  res.json({ title: x });
});

export default router;

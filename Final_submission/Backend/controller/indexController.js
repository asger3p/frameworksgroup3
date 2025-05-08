// GET home page
export function renderHome(req, res) {
  const {x} = req.body;
  console.log("the server is online");
  res.json({ title: x });
}

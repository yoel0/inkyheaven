const db = require("../models");

async function create(req, res) {
  try {
    const createdMyLocation = await db.myLocation.create(req.body);
    res.json(createdMyLocation);
  } catch (error) {
    console.error(error);
    res.status(500).send("this response was hard but not answered sucker.");
  }
}

// async function destroy(req, res) {
//   try {
//     const destroyedMyLocation = await db.myLocation.destroy(req.params.id);
//     res.json(destroyedMyLocation);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("destroyed, toto.");
//   }
// }

module.exports = {
  create,
};

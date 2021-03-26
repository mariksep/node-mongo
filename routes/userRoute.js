const router = require("express").Router();
const user = require("../models/userModel");

router
  .route("/")
  .post(async (req, res) => {
    try {
      const post = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
      res.send(`useer post ${post.name} created with id: ${post._id}`);
    } catch (e) {
      res.send(`failed to create cat ${e.message}`);
    }
  })
  .get(async (req, res) => {
    res.send(await cat.find().where("age").gt(0));
  });

router
  .route("/:id")
  .get(async (req, res) => {
    res.send(await cat.findById(req.params.id));
  })
  .patch(async (req, res) => {
    const mod = await cat.updateOne(
      { _id: req.params.id },
      { name: req.body.name }
    );
    res.status(200).send(`updated sucessfully ${mod.nModified} cat post`);
  })
  .delete(async (req, res) => {
    const del = await cat.deleteOne({ _id: req.params.id });
    res.send(`deleted ${del.deletedCount} cat post`);
  });

module.exports = router;

const Express = require("express");
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt");
const { JournalModel } = require("../models");

router.get("/practice", validateJWT, (req, res) => {
  res.send("Hey!! This is a pratice route!");
});

//Here is where we create the journals
router.post("/create", validateJWT, async (req, res) => {
  const { title, date, entry } = req.body.journal;
  const { id } = req.user;
  const journalEntry = {
    title,
    date,
    entry,
    owner: id,
  };
  try {
    const newJournal = await JournalModel.create(journalEntry);
    res.status(200).json({ newJournal });
  } catch (err) {
    res.status(500).json({ error: err });
  }
  // JournalModel.create(journalEntry);
});

router.get("/about", (req, res) => {
  res.send("This is an about route!");
});

//Get all journals
router.get("/", async (req, res) => {
  try {
    const entries = await JournalModel.findAll();
    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//get by user
router.get("/mine", validateJWT, async (req, res) => {
  const { id } = req.user;
  try {
    const userJournals = await JournalModel.findAll({
      where: {
        owner: id,
      },
    });
    res.status(200).json(userJournals);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//get by title
router.get("/:title", async (req, res) => {
  const { title } = req.params;
  try {
    const results = await JournalModel.findAll({
      where: {
        title: title,
      },
    });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//update a journal
router.put("/update/:entryId", validateJWT, async (req, res) => {
  const { title, date, entry } = req.body.journal;
  const journalId = req.params.entryId;
  const userId = req.user.id;

  const query = {
    where: {
      id: journalId,
      owner: userId,
    },
  };
  const updatedJournal = {
    title: title,
    date: date,
    entry: entry,
  };
  try {
    const update = await JournalModel.update(updatedJournal, query);
    res.status(200).json(update);
  } catch (err) {
    res.status(500).json("error: err");
  }
});

//delete journal 
router.delete("/delete/:id", validateJWT, async (req, res)=> {
  const ownerId = req.user.id;
  const journalId = req.params.id;

  try {
    const query = {
      where: {
        id: journalId, 
        owner: ownerId
      }
    };
    await JournalModel.destroy(query);
    res.status(200).json({message: "Journal Entry Removed"});
  }catch (err){
    res.status(500).json({error: err});
  }
});
module.exports = router;

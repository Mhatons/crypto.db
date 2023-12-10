const Data = require("../models/phrase");

const createData = async (req, res) => {
  console.log({"this is the body of request" :req.body})
  try {
    const newPhrase = await Data.create(req.body);
    console.log(newPhrase);
    res.status(201).send(newPhrase);
  } catch (error) {
    res.status(500).json({ message: "failed to connect phrase", data: error.message });
  }
};



// const createData = async (req, res) => {
//   console.log("yes it hit")
//   try {
//     const { title, type } = req.body;

//     // const countPhrase = phrase.split(' ').length;
//     const countPhrase = title.match(/(\w+)/g).length;
//     if (!title || !type) {
//       return res.status(400).json({ message: "Please enter phrase" });
//     }

//     const newPhrase = await Data.create(req.body);

//     console.log(req.body)
//     console.log(newPhrase)
//     return res.status(200).json({
//       success: true,
//       message: "Phrase connected",
//       count: countPhrase,
//       data: newPhrase,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "failed to connect phrase", data: error.message });
//   }
// };

const getAllPhrase = async (req, res) => {
  try {
    const phrase = await Data.find().sort({ createdAt: "descending" });
    const nbHits = phrase.length;
    if (nbHits <= 0) {
      return res.status(400).json({ message: "there are no phrase available" });
    }

    return res.status(200).json({
      nbHits: nbHits,
      message: "successfully fetched phrases",
      data: phrase,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "failed to get all phrase", data: error.message });
  }
};

const deleteOnePhrase = async (req, res) => {
  try {
    const phraseId = req.params.id;
    const delPhrase = await Data.findOneAndDelete({ _id: phraseId });
    if (!phraseId || !delPhrase) {
      return res
        .status(400)
        .json({ success: false, message: "No such phrase exist" });
    }

    res.status(200).json({
      success: true,
      message: "phrase successfully deleted",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const deleteMany = async (req, res) => {
  try {
    const delManyPhrase = await Data.deleteMany({});
    if (!delManyPhrase) {
      return res.status(400).json({
        success: false,
        message: "phrase list is empty",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All phrase is successfully deleted",
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

module.exports = {
  createData,
  getAllPhrase,
  deleteOnePhrase,
  deleteMany,
};

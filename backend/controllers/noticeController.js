const Notice = require("../models/Notice");

const createNotice = async (req, res) => {

  try {

    const { title, description } = req.body;

    if (!title || !description) {

      return res.status(400).json({
        message: "All fields are required"
      });

    }

    const notice =
      await Notice.create({
        title,
        description,
        createdBy: req.user.id
      });

    res.status(201).json(notice);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


const getNotices = async (req, res) => {

  try {

    const notices =
      await Notice.find()
      .populate(
        "createdBy",
        "name email"
      )
      .sort({
        createdAt: -1
      });

    res.status(200).json(
      notices
    );

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

const deleteNotice = async (req, res) => {

    try {

        const notice =
            await Notice.findById(
                req.params.id
            );

        if (!notice) {

            return res.status(404).json({
                message: "Notice not found"
            });

        }

        await notice.deleteOne();

        res.status(200).json({
            message: "Notice deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

module.exports = {
  createNotice,
  getNotices,
  deleteNotice
};
const mongoose = require("mongoose");

const Tool = require("../models/tool");

exports.get_all_tools = async (req, res) => {
  const { tag, search } = req.query;
  let condition = {};
  if (tag) {
    const tagRegex = new RegExp(`${tag}.*`, "gi");
    condition = { tags: tagRegex };
  } else if (search) {
    const searchRegex = new RegExp(`${search}.*`, "gi");
    condition = {
      $or: [
        { title: searchRegex },
        { link: searchRegex },
        { description: searchRegex },
      ],
    };
  };
  try {
    const response = await Tool.find(condition).exec();
    const tools = response.map((tool) => {
      return {
        id: tool._id,
        title: tool.title,
        link: tool.link,
        description: tool.description,
        tags: tool.tags,
      };
    });
    res.status(200).json(tools);
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  };
};

exports.post_new_tool = async (req, res) => {
  const toolBody = req.body;
  const tool = new Tool({
    _id: new mongoose.Types.ObjectId(),
    ...toolBody,
  });
  try {
    const response = await tool.save();
    res.status(201).json({
      id: response._id,
      title: response.title,
      link: response.link,
      description: response.description,
      tags: response.tags,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  };
};

exports.get_one_tool = async (req, res) => {
  const id = req.params.toolId;
  try {
    const response = await Tool.findById(id).exec();
    if (response) {
      res.status(200).json({
        product: {
          id: response._id,
          title: response.title,
          link: response.link,
          description: response.description,
          tags: response.tags,
        },
      });
    } else {
      res.status(404).json({
        message: "No valid entry found for provited ID",
      });
    };
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  };
};

exports.update_one_tool = async (req, res) => {
  const id = req.params.toolId;
  const updateProp = {};
  for (const prop of req.body) {
    updateProp[prop.propName] = prop.value;
  }
  try {
    await Tool.updateOne({ _id: id }, { $set: updateProp });
    res.status(200).json({
      message: "Product updated",
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  };
};

exports.delete_one_tool = async (req, res) => {
  const id = req.params.toolId;
  try {
    await Tool.deleteOne({ _id: id }).exec();
    res.status(204).json({
      message: "Product deleted",
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  };
};

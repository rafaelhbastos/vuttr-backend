module.exports = {
  async getOne(req, res) {
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
    }
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
    }
  },
};

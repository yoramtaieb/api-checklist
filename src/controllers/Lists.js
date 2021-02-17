const { Lists, Users } = require("../models");

const { OK } = require("../helpers/status_code");

const listAttributes = ["id", "name"];

module.exports = {
  addList: async (data, userId) => {
    const { name } = data;
    const newList = await Lists.create({
      idUser: userId,
      name,
    });
    const lists = await Lists.findByPk(newList.id, {
      attributes: listAttributes,
      include: [
        {
          model: Users,
          attributes: ["firstName", "lastName"],
        },
      ],
    });
    return lists;
  },

  getAllList: async () => {
    const findList = await Lists.findAll({
      limit: 8,
      order: [["createdAt", "DESC"]],
      raw: true,
      include: [
        {
          model: Users,
          attributes: ["firstName"],
        },
      ],
    });
    if (findList.length === 0) {
      throw new NotFoundError(
        "Ressource introuvable",
        "Aucuns produits répertoriés"
      );
    }
    return findList;
  },

  getListByName: async (name) => {
    return await Lists.findOne({
      where: { name: name },
      attributes: listAttributes,
    });
  },

  getListById: async (id) => {
    return await Lists.findOne({
      where: { id: id },
    });
  },

  updateList: async (request, response) => {
    const id = request.params.id;
    const newData = request.body.name;
    const listUpdated = await Lists.update(
      { name: newData },
      { where: { id: id } }
    );
    if (!listUpdated) {
      throw new NotFoundError(
        "Ressource introuvable",
        "Cette liste n'existe pas."
      );
    }
    return response
      .status(OK)
      .json({ message: "La liste a bien été modifiée.", newData });
  },

  deleteList: async (id) => {
    const listFound = await Lists.findOne({
      where: { id: id },
    });
    if (!listFound) {
      throw new NotFoundError(
        "Ressource introuvable",
        "Cette liste n'existe pas."
      );
    }
    await Lists.destroy({
      where: { id: id },
    });
  },
};

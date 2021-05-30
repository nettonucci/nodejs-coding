const knex = require("../../../database");

module.exports = {
  async list(req, res) {
    const results = await knex.select("id", "name", 'address', 'status').from("laboratorios").where({
        status: 1
      });
    return res.json(results);
  },

  async show(req, res) {
    const { id } = req.params;

    const results = await knex("laboratorios")
    .where({
        id: id
      }).select("id", "name", 'address', 'status')
  
      if(results.length > 0) {
        return res.status(201).json(results);
      } else {
        return res.status(404).json({ Successes: false, Message: `Laboratory not found` });
      }
    
  },

  async create(req, res) {
    const { name, address } = req.body;

    await knex("laboratorios").insert({
        name,
        address
      });

    return res.status(201).json({ Successes: true, Message: "Laboratory successfully added" });
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, address, status } = req.body;

    const results = await knex("laboratorios")
    .where({
        id: id
      }).select("id")


      if(results.length > 0) {
        await knex("laboratorios").update({
            name,
            address,
            status
          }).where({
            id
          });
    
        return res.status(201).json({ Successes: true, Message: "Laboratory successfully updated"});
      } else {
        return res.status(404).json({ Successes: false, Message: "Laboratory not found" });
      }

    
  },

  async delete(req, res) {
    const { id } = req.params;
    
    const results = await knex("laboratorios")
    .where({
        id: id
      }).select("id")


      if(results.length > 0) {

        await knex("laboratorios").del().where({
            id
        });

        return res.status(201).json({ Successes: true, Message: "Laboratory successfully deleted"});
      } else {
        return res.status(404).json({ Successes: false, Message: "Laboratory not found" });
      }
  }
};

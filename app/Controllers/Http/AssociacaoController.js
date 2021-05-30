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
    const { laboratorio_id, exame_id } = req.body;

    const resultsExam = await knex("exames")
    .where({
        id: exame_id
    }).select("status")

    const resultsLab = await knex("laboratorios")
    .where({
      id: laboratorio_id
    }).select("status")

    if (resultsExam.length > 0) {
        if (resultsExam[0].status === 0) {
            return res.status(400).json({ Successes: false, Message: `Exam not active` }); 
        }
    } else {
        return res.status(404).json({ Successes: false, Message: `Exam not found` });
    }

    if (resultsLab.length > 0) {
        if (resultsLab[0].status === 0) {
            return res.status(400).json({ Successes: false, Message: `Laboratory not active` }); 
        }
    } else {
        return res.status(404).json({ Successes: false, Message: `Laboratory not found` });
    }

    await knex("rel_lab_exam").insert({
        laboratorio_id,
        exame_id
      });

    return res.status(201).json({ Successes: true, Message: "Association successfully added" });
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

    const results = await knex("rel_lab_exam")
    .where({
        id: id
      }).select("id")

    if(results.length > 0) {

        await knex("rel_lab_exam").del().where({
            id
        });

        return res.status(201).json({ Successes: true, Message: "Association successfully deleted" });
      } else {
        return res.status(404).json({ Successes: false, Message: `Association not found` });
      }
    
  }
};

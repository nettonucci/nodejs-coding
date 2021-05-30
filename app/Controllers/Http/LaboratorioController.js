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

    const results = await knex.select("id", "name", 'address', 'status').from("laboratorios").where({
        id
      });

    const resultsAssoc = await knex("rel_lab_exam")
    .join('exames', 'rel_lab_exam.exame_id', '=', 'exames.id')
    .select("exames.id", "exames.name", 'exames.type', 'exames.status')
    .where({"rel_lab_exam.laboratorio_id": id })

    results[0].exames = resultsAssoc

  
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

  async createInBatch(req, res) {
    const { lote } = req.body;

    for (var i=0; i < lote.length; i++) {
        await knex("laboratorios").insert({
            name: lote[i].name,
            address: lote[i].address
          });
    }

    return res.status(201).json({ Successes: true, Message: `${lote.length} Laboratory successfully added` });
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

  async updateInBatch(req, res) {
    const { lote } = req.body;

    var errors =  []
    var successes = []

    for (var i=0; i < lote.length; i++) {
        var results = await knex("laboratorios")
        .where({
            id: lote[i].id
          }).select("id")
    
    
          if(results.length > 0) {
            await knex("laboratorios").update(
                lote[i]
              ).where({
                id: lote[i].id
              });
        
            successes.push({laboratory_id: lote[i].id, Successes: true, Message: "Laboratory successfully updated" })
          } else {
            errors.push({laboratory_id: lote[i].id, Successes: false, Message: "Laboratory not found"})
          }
    }

    if(successes.length === 0) {
        return res.status(400).json({errors, successes})
    } else {
        return res.status(201).json({successes, errors})
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
  },

  async deleteInBatch(req, res) {
    const { lote } = req.body;

    var errors =  []
    var successes = []

    for (var i=0; i < lote.length; i++) {
        var results = await knex("laboratorios")
        .where({
            id: lote[i].id
          }).select("id")
    
    
          if(results.length > 0) {
            await knex("laboratorios").del().where({
                id: lote[i].id
              });
        
            successes.push({laboratory_id: lote[i].id, Successes: true, Message: "Laboratory successfully deleted" })
          } else {
            errors.push({laboratory_id: lote[i].id, Successes: false, Message: "Laboratory not found"})
          }
    }

    if(successes.length === 0) {
        return res.status(400).json({errors, successes})
    } else {
        return res.status(201).json({successes, errors})
    }
  }
};

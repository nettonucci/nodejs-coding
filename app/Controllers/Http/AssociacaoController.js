const knex = require("../../../database");
const { createInBatch, deleteInBatch } = require("./LaboratorioController");

module.exports = {
  

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

  async createInBatch(req, res) {
    const { lote } = req.body;

    var errors =  []
    var successes = []

    for (var i=0; i < lote.length; i++) {

    var resultsExam = await knex("exames")
    .where({
        id: lote[i].exame_id
    }).select("status")

    var resultsLab = await knex("laboratorios")
    .where({
      id: lote[i].laboratorio_id
    }).select("status")

    if (resultsExam.length > 0) {
        if (resultsExam[0].status === 0) {
            errors.push({exam_id: lote[i].exame_id, Successes: false, Message: `Exam not active` }); 
            continue
        }
    } else {
        errors.push({exam_id: lote[i].exame_id, Successes: false, Message: `Exam not found` });
        continue
    }

    if (resultsLab.length > 0) {
        if (resultsLab[0].status === 0) {
            errors.push({laboratory_id: lote[i].laboratorio_id, Successes: false, Message: `Laboratory not active` }); 
            continue
        }
    } else {
        errors.push({laboratory_id: lote[i].laboratorio_id, Successes: false, Message: `Laboratory not found` });
        continue
    }

    await knex("rel_lab_exam").insert(lote[i]);

    successes.push({laboratory_id: lote[i].laboratorio_id, exam_id: lote[i].exame_id, Successes: true, Message: "Association successfully added" });

    }
    if(successes.length === 0) {
        return res.status(400).json({errors, successes})
    } else {
        return res.status(201).json({successes, errors})
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
    
  },

  async deleteInBatch(req, res) {
    const { lote } = req.body;

    var errors =  []
    var successes = []

    for (var i=0; i < lote.length; i++) {
        var results = await knex("rel_lab_exam")
        .where({
            id: lote[i].id
          }).select("id")
    
        if(results.length > 0) {
    
            await knex("rel_lab_exam").del().where({
                id: lote[i].id
            });
    
            successes.push({assoc_id: lote[i].id, Successes: true, Message: "Association successfully deleted" })
        } else {
            errors.push({assoc_id: lote[i].id, Successes: false, Message: "Association not found"})
        }
    }

    if(successes.length === 0) {
        return res.status(400).json({errors, successes})
    } else {
        return res.status(201).json({successes, errors})
    }
    
  }
};

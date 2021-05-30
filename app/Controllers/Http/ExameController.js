const knex = require("../../../database");
const { createInBatch, updateInBatch } = require("./LaboratorioController");

module.exports = {
  async list(req, res) {
    const results = await knex.select("id", "name", 'type', 'status').from("exames").where({
        status: 1
      });
    return res.json(results);
  },

  async show(req, res) {
    const { id } = req.params;

    const results = await knex("exames")
    .where({
        id: id
      }).select("id", "name", 'type', 'status')
  
      if(results.length > 0) {
        return res.status(201).json(results);
      } else {
        return res.status(404).json({ Successes: false, Message: `Exam not found` });
      }
  
   
  },

  async showByName(req, res) {
    const { name } = req.params;

    const respVerify = await knex('exames').where('name', 'like', `%${name}%`)

    if(respVerify.length > 0) {
        const resultsAssoc = await knex("rel_lab_exam")
        .join('laboratorios', 'rel_lab_exam.laboratorio_id', '=', 'laboratorios.id')
        .select("laboratorios.id", "laboratorios.name", 'laboratorios.address', 'laboratorios.status')
        .where({"rel_lab_exam.exame_id": respVerify[0].id })
    
        respVerify[0].laboratorios = resultsAssoc
    
        return res.status(201).json(respVerify)
    } else {
        return res.status(404).json({ Successes: false, Message: `Exam not found` });
    }

    
  
   
  },

  async create(req, res) {
    const { name, type } = req.body;

    const respVerify = await knex('exames').where('name', 'like', `%${name}%`)

    if (respVerify.length > 0) {
        return res.status(400).json({ Successes: false, Message: `An exam with this name already exists` });
    }

    const types = [
        'analise', 'clinica', 'imagem'
    ]

    const resp = types.includes(type)

    if (resp) {
        await knex("exames").insert({
            name,
            type
          });
    
        return res.status(201).json({ Successes: true, Message: "Exam successfully added" });
    } else {
        return res.status(400).json({ Successes: false, Message: `Only types allowed: ${types}` });
    }

    
  },

  async createInBatch(req, res) {
    const { lote } = req.body;

    var errors =  []
    var successes = []

    for (var i=0; i < lote.length; i++) {

        const respVerify = await knex('exames').where('name', 'like', `%${lote[i].name}%`)

        if (respVerify.length > 0) {
            errors.push({exam_name: lote[i].name, Successes: false, Message: `An exam with this name already exists` });
            continue
        }
        const types = [
            'analise', 'clinica', 'imagem'
        ]
    
        var resp = types.includes(lote[i].type)
    
        if (resp) {
            await knex("exames").insert(lote[i]);
        
           
          successes.push({exam_name: lote[i].name, Successes: true, Message: "Exam successfully added" })
        } else {
          errors.push({exam_name: lote[i].name, Successes: false, Message: `Only types allowed: ${types}`})
        }

       
    }

    if(successes.length === 0) {
        return res.status(400).json({errors, successes})
    } else {
        return res.status(201).json({successes, errors})
    }

    
  },

  async update(req, res) {
    const { id } = req.params;
    const { name, type, status } = req.body;

    if (type) {
        
        const types = [
            'analise', 'clinica', 'imagem'
        ]
    
        const resp = types.includes(type)

        if (resp) {

    const results = await knex("exames")
    .where({
        id: id
      }).select("id")


      if(results.length > 0) {
        await knex("exames").update({
            name,
            type,
            status
          }).where({
            id
          });
    
        return res.status(201).json({ Successes: true, Message: "Exam successfully updated" });
      } else {
        return res.status(404).json({ Successes: false, Message: `Exam not found` });
      }

    }else {
        return res.status(400).json({ Successes: false, Message: `Only types allowed: ${types}` });
    }

    
    } else {
        const results = await knex("exames")
    .where({
        id: id
      }).select("id")


      if(results.length > 0) {
        await knex("exames").update({
            name,
            type,
            status
          }).where({
            id
          });
    
        return res.status(201).json({ Successes: true, Message: "Exam successfully updated" });
      } else {
        return res.status(404).json({ Successes: false, Message: `Exam not found` });
      }
    }
    
  },

  async updateInBatch(req, res) {
    const { lote } = req.body;

    var errors =  []
    var successes = []

    for (var i=0; i < lote.length; i++) {

    if (lote[i].type) {
        
        const types = [
            'analise', 'clinica', 'imagem'
        ]
    
        var resp = types.includes(lote[i].type)

        if (resp) {

    var results = await knex("exames")
    .where({
        id: lote[i].id
      }).select("id")


      if(results.length > 0) {
        await knex("exames").update(lote[i]).where({
            id: lote[i].id
          });
    
        successes.push({exam_id: lote[i].id, Successes: true, Message: "Exam successfully updated" })
      } else {
        errors.push({exam_id: lote[i].id, Successes: false, Message: `Exam not found`})
      }

    } else {
        errors.push({exam_id: lote[i].id, Successes: false, Message: `Only types allowed: ${types}`})
    }

    
    } else {
        var results = await knex("exames")
    .where({
        id: lote[i].id
      }).select("id")


      if(results.length > 0) {
        await knex("exames").update(lote[i]).where({
            id: lote[i].id
          });
    
          successes.push({exam_id: lote[i].id, Successes: true, Message: "Exam successfully updated" })
        } else {
          errors.push({exam_id: lote[i].id, Successes: false, Message: `Exam not found`})
        }
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
    
    const results = await knex("exames")
    .where({
        id: id
      }).select("id")


      if(results.length > 0) {

        await knex("exames").del().where({
            id
        });

        return res.status(201).json({ Successes: true, Message: "Exam successfully deleted" });
      } else {
        return res.status(404).json({ Successes: false, Message: `Exam not found` });
      }
  },

  async deleteInBatch(req, res) {
    const { lote } = req.body;

    var errors =  []
    var successes = []

    for (var i=0; i < lote.length; i++) {
        var results = await knex("exames")
        .where({
            id: lote[i].id
          }).select("id")
    
    
          if(results.length > 0) {
    
            await knex("exames").del().where({
                id: lote[i].id
            });
    
            successes.push({exam_id: lote[i].id, Successes: true, Message: "Exam successfully deleted" })
        } else {
            errors.push({exam_id: lote[i].id, Successes: false, Message: "Exam not found"})
        }
    }

    if(successes.length === 0) {
        return res.status(400).json({errors, successes})
    } else {
        return res.status(201).json({successes, errors})
    }
    
  }
};

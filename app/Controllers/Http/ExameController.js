const knex = require("../../../database");

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

  async create(req, res) {
    const { name, type } = req.body;

    const types = [
        'analise', 'clinica', 'imagem'
    ]

    const resp = types.includes(type)

    if (resp) {
        await knex("exames").insert({
            name,
            type
          });
    
        return res.status(201).json({ Successes: "Exam successfully added" });
    } else {
        return res.status(400).json({ Successes: false, Message: `Only types allowed: ${types}` });
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
    
        return res.status(201).json({ Successes: "Exam successfully updated" });
      } else {
        return res.status(404).json({ Successes: false, Message: `Exam not found` });
      }

    }else {
        return res.status(201).json({ Successes: false, Message: `Only types allowed: ${types}` });
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
    
        return res.status(201).json({ Successes: "Exam successfully updated" });
      } else {
        return res.status(404).json({ Successes: false, Message: `Exam not found` });
      }
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

        return res.status(201).json({ Successes: "Exam successfully deleted" });
      } else {
        return res.status(404).json({ Successes: false, Message: `Exam not found` });
      }
  }
};

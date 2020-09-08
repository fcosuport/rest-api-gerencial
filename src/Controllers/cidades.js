const sequelize = require('../Database/connection')
const { QueryTypes } = require('sequelize')

const getAll = async (req, res) => {
  try {

    scriptcidades = 'select * from cidades order by nome'

    cidades = await sequelize.
      query(scriptcidades, { type: QueryTypes.SELECT })
    return res.json(cidades)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

module.exports = {
  getAll
}
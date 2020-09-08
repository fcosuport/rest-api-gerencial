const sequelize = require('../Database/connection')
const { QueryTypes } = require('sequelize')

const getAll = async (req, res) => {
  try {

    scriptestados = 'select * from estados order by nome'

    estados = await sequelize.
      query(scriptestados, { type: QueryTypes.SELECT })
    return res.json(estados)
  } catch (err) {
    return res.status(400).json({ error: err.message })
  }
}

module.exports = {
  getAll
}
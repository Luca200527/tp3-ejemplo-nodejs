const fs = require('fs').promises

const getMateriaAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
    const materias = JSON.parse(data)

    return res.status(200).json(materias)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'No se pudieron obtener las materias' })
  }
}

const getMateriaById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-materias.json', 'utf8')
    const materias = JSON.parse(data)

    const { id } = req.params
    const materia = materias.find((m) => m.idMateria === id)

    if (!materia) {
      return res.status(404).json({ msg: `No existe la materia con id ${id}` })
    }

    return res.status(200).json(materia)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'No se pudo obtener la materia' })
  }
}

module.exports = {
  getMateriaAll,
  getMateriaById
}

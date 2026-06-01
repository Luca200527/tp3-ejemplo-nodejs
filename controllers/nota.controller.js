const fs = require('fs').promises

const getNotaAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-notas.json', 'utf8')
    const notas = JSON.parse(data)

    return res.status(200).json(notas)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudieron obtener las notas' })
  }
}

const getNotaByLegajo = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-notas.json', 'utf8')
    const notas = JSON.parse(data)

    const { legajo } = req.params
    const notasAlumno = notas.filter((n) => n.legajo === Number(legajo))

    if (notasAlumno.length === 0) {
      return res.status(404).json({ msg: `No hay notas para el legajo ${legajo}` })
    }

    return res.status(200).json(notasAlumno)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudieron obtener las notas' })
  }
}

module.exports = {
  getNotaAll,
  getNotaByLegajo
}
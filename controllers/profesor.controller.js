const fs = require('fs').promises

const getProfesorAll = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-profesores.json', 'utf8')
    const profesores = JSON.parse(data)

    return res.status(200).json(profesores)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudieron obtener los profesores' })
  }
}

const getProfesorById = async (req, res) => {
  try {
    const data = await fs.readFile('./data/extras/sys-profesores.json', 'utf8')
    const profesores = JSON.parse(data)

    const { id } = req.params
    const profesor = profesores.find((p) => p.id === Number(id))

    if (!profesor) {
      return res.status(404).json({ msg: `No existe el profesor con id ${id}` })
    }

    return res.status(200).json(profesor)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error: 'No se pudo obtener el profesor' })
  }
}

module.exports = {
  getProfesorAll,
  getProfesorById
}
const Caja = require('../models/caja.model');

exports.registrarCaja = async (req, res) => {
  const { tamano } = req.body;

  try {
    // Buscar una caja existente con el mismo tamaño
    const cajaExistente = await Caja.findOne({ tamano });

    if (cajaExistente) {
      // Si ya existe una caja con el mismo tamaño, actualizamos su cantidad
      cajaExistente.cantidad += 1;
      await cajaExistente.save();
    } else {
      // Si no existe una caja con el mismo tamaño, creamos una nueva
      const nuevaCaja = new Caja({ tamano });
      await nuevaCaja.save();
    }

    return res.json({ message: 'Caja registrada exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al registrar la caja' });
  }
};

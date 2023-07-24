const User = require('./auth.dao');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const SECRET_KEY = 'secretkey123456';

exports.createUser = async (req, res, next) => {
    const { name, email, password,role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            name,
            email,
            password: hashedPassword,
            role: role || 'operator'
        };

        const user = await User.create(newUser);

        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
            expiresIn: expiresIn
        });

        const dataUser={
            name: user.name,
            email:user.email,
            role:user.role,
            accessToken:accessToken,
            expiresIn:expiresIn
        }
    

        res.send({ dataUser });
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            // Email does not exist
            return res.status(409).send({ message: 'Email not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const expiresIn = 24 * 600 * 60;
            const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
                expiresIn: expiresIn
            });

            const dataUser={
                name: user.name,
                email:user.email,
                role:user.role,
                accessToken:accessToken,
                expiresIn:expiresIn
            }

            res.send({ dataUser });
        } else {
            // Password is wrong
            res.status(409).send({ message: 'Invalid password' });
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
};

exports.getUsers = async (req, res, next) => {
    try {
      const users = await User.find({}, { password: 0 }); // Excluimos el campo "password" de los usuarios
  
      res.send(users);
    } catch (error) {
      res.status(500).send('Server error');
    }
  };

  exports.deleteUser = async (req, res) => {
    try {
      const userId = req.params.id; // Suponiendo que el ID del usuario a eliminar se pasa como parámetro en la URL
      const user = await User.findByIdAndDelete(userId);
      res.json({ message: 'Usuario eliminado exitosamente', user });
    } catch (error) {
      res.status(500).json({ message: 'Error al eliminar el usuario', error });
    }
  };

  exports.updateUser = async (req, res) => {
    try {
      const userId = req.params.id; // Suponiendo que el ID del usuario a actualizar se pasa como parámetro en la URL
      const updatedData = req.body; // Datos actualizados del usuario que vienen en el cuerpo de la solicitud
  
      // Aquí puedes realizar validaciones adicionales si es necesario
  
      // Actualizar el usuario en la base de datos
      const updatedUser = await User.findByIdAndUpdate(userId, updatedData, { new: true });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      res.json({ message: 'Usuario actualizado exitosamente', user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el usuario', error });
    }
  };
  

  exports.getUserById = async (req, res) => {
    try {
      const userId = req.params.id; // Suponiendo que el ID del usuario se pasa como parámetro en la URL
      const user = await User.findById(userId, { password: 0 }); // Excluimos el campo "password" del usuario
  
      if (!user) {
        // Si no se encuentra el usuario con el ID proporcionado, se envía una respuesta con código 404 (Not Found)
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
  
      // Si se encuentra el usuario, se envía el usuario como respuesta
      res.json(user);
    } catch (error) {
      // Si ocurre un error durante la búsqueda del usuario, se envía una respuesta con código 500 (Internal Server Error)
      res.status(500).json({ message: 'Error al obtener el usuario', error });
    }
  };
  
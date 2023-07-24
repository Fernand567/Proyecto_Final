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
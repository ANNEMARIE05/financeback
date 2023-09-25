const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { default: user } = require('../Models/user');



  
  const User = user
  
  // Endpoint d'inscription
  app.post('/inscription', async (req, res) => {
    const { email, password } = req.body;
    console.log();
  
    // Vérifiez si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
  
    if (existingUser) {
      return res.status(409).json({ message: 'Cet utilisateur existe déjà.' });
    }
  
    // Hachez le mot de passe avant de l'enregistrer dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Créez un nouvel utilisateur
    const user = new User({ email, password: hashedPassword });
  
    // Enregistrez l'utilisateur dans la base de données
    await user.save();
  
    res.status(201).json({ message: 'Inscription réussie.' });
  });
  




  
  // Endpoint de connexion
  app.post('/connexion', async (req, res) => {
    const { email, password } = req.body;
  
    // Recherchez l'utilisateur dans la base de données
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect. "});
    }
  
    // Vérifiez le mot de passe en utilisant Bcrypt
    const passwordMatch = await bcrypt.compare(password, user.password);
  
    if (!passwordMatch) {
      return res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
    }
  
    // Créez un token JWT pour l'authentification
    const token = jwt.sign({ userId: user._id }, "votre_secret_key_secrete", { expiresIn: '1h' });
  
    res.json({ token });
});
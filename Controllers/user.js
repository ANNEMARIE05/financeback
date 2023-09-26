import User from "../Models/user.js";
import { hash } from "../utils/hash.js";
class UserControllers {
  
  static async createUser(req, res) {
    console.log(req.body);
    try {
      const { email,password, ...body } = req.body;

      const user = await User.findOne({ email: email });
      if (user) {
        return res
          .status(404)
          .json({ status: false, message: "cet utilisateur existe déja" });
      }
      const userCreate = await User.create({ email,password: await hash(password) , ...body });

      if (!userCreate) {
        return res.status(404).json({
          status: false,
          message: "cet utilisateur est non enregistrer",
        });
      }
      res.status(200).json({ status: true, message: "client enregistrer" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async getAllUser(req, res) {
    try {
      const user = await User.find({});
      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: "aucun utilisateur n'a été trouvé" });
      }
      return res.status(200).json({ status: true, message: user });
    } catch (error) {
      return res
        .status(500)
        .json({ status: false, message: "erreur de serveur" });
    }
  }

  static async editUser(req, res) {
    try {
      const id = req.params.id;
      const { email, ...body } = req.body;
      const user = await User.findById(id);
      console.log(user);
      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: "aucun utilisateur n'a été trouvé" });
      }
      await User.updateOne({ _id: id }, { ...body });
      await User.deleteOne({ _id: id });
      res.status(200).json({ status: true, message: "Modifié avec succès" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findById(id);
      console.log(user);
      if (!user) {
        return res
          .status(404)
          .json({ status: false, message: "aucun utilisateur n'a été trouvé" });
      }
      await User.deleteOne({ _id: id });
      res.status(200).json({ status: true, message: "Supprimé avec succès" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  static async Login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.json({ message: "Renseigner les deux champs svp" });
      }
      const user = await User.findOne({ email });
      console.log("pqohsfpaihfdapzhidf", user);
      if (!user) {
        return res.json({ message: "Incorrect password or email" });
      }
      const auth = await bcrypt.compare(password, user.password);
      console.log(user.password);
      if (!auth) {
        return res.json({ message: "Incorrect password or email" });
      }
      const token = createSecretToken(user._id);
      res.cookie("token", token, {
        withCredentials: true,
        httpOnly: false,
      });
      res
        .status(200)
        .json({ message: "User logged in successfully", success: true });
      next();
    } catch (error) {
      console.error(error);
    }
  }
}
export default UserControllers;
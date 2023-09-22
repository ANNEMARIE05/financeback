import User from "../Models/user.js"


class UserControllers{
    static async createUser(req,res){
        try {
            const {email, ...body} = req.body
            const user = await User.findOne({email: email})
            if(user){
                return res.status(404).json({status: false, message: "cet utilisateur existe déja"})
            }
            const userCreate = await User.create({email: email, ...body})
    
            if(!userCreate){
                return res.status(404).json({status: false, message: "cet utilisateur est non enregistrer"})
                
            }
            res.status(200).json({status: true, message: "client enregistrer"})   
        } catch (error) {
            res.status(500).json({message: error.message})
        }

    }

    static async getAllUsers(req,res){
        try {
            const user = await User.find({})
            if(!user){
                return res.status(404).json({status: false, message: "aucun utilisateur n'a été trouvé"})
                
            }
            return res.status(200).json({status: true, message: user})

        }catch(error){
            return res.status(500).json({status: false, message: "erreur de serveur"})
        }
    }
    static async editUser(req,res){
        try{
            const id = req.params.id
            const {email, ...body} = req.body
            const user = await User.findById(id)
            console.log(user);
            if(!user){
                return res.status(404).json({status: false, message: "aucun utilisateur n'a été trouvé"})
            }
            await User.updateOne({_id: id}, {...body})
            await User.deleteOne({_id:id})
            res.status(200).json({status: true, message: "Modifié avec succès"})
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    }
    static async deleteUser(req,res){
        try{
            const id = req.params.id
            const user = await User.findById(id)
            console.log(user);
            if(!user){
                return res.status(404).json({status: false, message: "aucun utilisateur n'a été trouvé"})
            }
            await User.deleteOne({_id:id})
            res.status(200).json({status: true, message: "Supprimé avec succès"})
        }
        catch(error){
            res.status(500).json({message: error.message})
        }
    }
}

export default UserControllers
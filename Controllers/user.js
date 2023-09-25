import User from "../Models/user.js"


class UserControllers{
    static async createUser(req,res){
        console.log(req.body);
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

    static async login(req, res){
        try {
            const {email, password} = req.body;
            let bail = await bailleur.findOne({email:email})
            if(!bail){
                res.status(401)
                    .json({
                        status:false,
                        message: "Email introuvable"
                    })
                return; 
            }
            console.log(bail.password)
            const userBail = bailleur.findOne({password: await compar(password, bail.password)});
            if(!userBail){
                res
                    .status(401)
                    .json({
                        status: false,
                        message: "Mot de passe incorrect !!!"
                    })
            }
            res.cookie("token", tokenSend(bail.toObject()))
            res
            .status(201)
            .json({
                status: true,
                message: "Connexion encours !!!"
            })

        } catch (e) {
            if( e instanceof MongooseError) throw new Error("Erreur de server Mongose:",e.message)
            res
            .status(500)
            .json({
                status: false,
                message: e.message
            })
        }
    }

    
}

export default UserControllers
const express = require("express")
const router = express.Router();
const users = require("../models/userSchema")

// router.get("/", (req,res)=>{
//     res.send("connected")
// })

//register user
router.post("/register", async (req,res)=>{
    const {name,email,age,mobile,work,add,desc} =req.body;

    if(!name || !email || !age || !mobile || !work || !add || !desc){
        res.status(422).json("plz fill the data")
    }

    try{

        const preuser = await users.findOne({email: email})
        console.log(preuser)

        if(preuser){
            res.status(422).json("this user is already present")
        }else{
            const addUser = new users({
                name,email,age,mobile,work,add,desc
            })

            await addUser.save();
            res.status(201).json(addUser);
            console.log(addUser)
        }
    }catch(error){
        res.status(422).json(error)
    }
})

//get user data
router.get("/getdata", async (req,res)=>{
    try{
        const userdata = await users.find()
        res.status(200).json(userdata)
        console.log(userdata)
    }catch(error){
        res.status(422).json(error)
    }
})

//get individual user

router.get("/getuser/:id", async (req,res)=>{
    try {
        console.log(req.params)
        const {id} = req.params;

        const useridividual = await users.findById({_id:id})
        console.log(useridividual);
        res.status(201).json(useridividual)
    } catch (error) {
        res.status(422).json(error)
    }
})

//update user data

router.patch("/updateuser/:id", async(req,res)=>{
    try {
        const {id} = req.params;

        const updateUser = await users.findByIdAndUpdate(id, req.body,{
            new:true
        })

        console.log(updateUser)
        res.status(201).json(updateUser)
    } catch (error) {
        res.status(422).json(error)
    }
})

//delete user

router.delete("/deleteuser/:id", async(req,res)=>{
    try {
        const {id} = req.params;

        const deleteUser = await users.findByIdAndDelete({_id:id})
        console.log(deleteUser)
        res.status(201).json(deleteUser)
    } catch (error) {
        res.status(422).json(error)
    }
})



module.exports = router;
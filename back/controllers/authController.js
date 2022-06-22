const AuthModel = require("./../models/authModel");

exports.registerUser = async(req, res) =>{
        try{
            const newUser = await AuthModel.create(req.body);
            res.status(201).json({
                status: "success",
                data: {
                    user: newUser
                    
                },
            });
        } catch(err){
            res.status(400).json({
                status: "fail",
                message: err,
            });
        }
};

exports.loginUser = async(req, res) =>{
    AuthModel.findOne({ username: req.body.username },function (err, person) {
        console.log(person);
        res.status(201).json({
            status: "Success",
            user: person
        });
      });
};
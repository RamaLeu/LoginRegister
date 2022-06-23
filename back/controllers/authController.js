const AuthModel = require("./../models/authModel");


exports.getAllUsers = async (req, res) => {

    try {
        const users = await AuthModel.find();
        console.log(users)
        res.status(200).json({
            status: "success",
            results: users.length,
            data: {
                user: users,
            },
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err,
        });
    }
};

exports.registerUser = async (req, res) => {
    try {
        const newUser = await AuthModel.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                user: newUser

            },
        });
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err,
        });
    }
};

exports.loginUser = async (req, res, next) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(404).json({
            status: 'fail',
            message: 'Neįvestas prisijungimo vardas arba slaptažodis'
        });
    }

    AuthModel.findOne({ username: req.body.username }, function (err, person) {
        console.log(person);
        res.status(201).json({
            status: "Success",
            user: person
        });
    });
};
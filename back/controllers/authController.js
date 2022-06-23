const AuthModel = require("./../models/authModel");
const jwt = require('jsonwebtoken');
const { promisify } = require('util');


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

        const token = jwt.sign({ id: newUser._id }, '22simboliu', {
            expiresIn: '90d'
        });

        console.log('Registration token');
        console.log(token)

        res.status(201).json({
            status: "success",
            token: token,
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

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    // Ar yra username ir psw
    if (!username || !password) {
        return res.status(404).json({
            status: 'fail',
            message: 'Neįvestas prisijungimo vardas arba slaptažodis'
        });
    }

    const user = await AuthModel.findOne({ username }).select('+password'); // Is to user'io isimti jo psw

    console.log(user)

    // dėl correctPassword skaityti authModel'yje - 50 eilutėje
    if (!user || !(await user.correctPassword(password, user.password))) {
        return res.status(404).json({
            status: 'fail',
            message: 'Neteisingas prisijungimo vardas arba slaptažodis'
        });
    }

    const token = jwt.sign({ id: user._id }, '22simboliu', {
        expiresIn: '90d'
    });

    console.log('Login token');
    console.log(token)

    res.status(200).json({
        status: 'success',
        token: token,
        data: {
            user: user,
        },
    });
}

exports.protect = async (req, res, next) => {
    let token

    if ( //jeigu headeryje yra tokenas ir bearer'as
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(" ")[1]; //pagal tarpus isskaido i masyvus ir pasiima pirma(token)
        // zodis 'Bearer' tampa 0, o token - 1
    }

    if (!token) {
        return res.status(401).json({
            status: 'fail',
            message: 'Neprisijungta! Privaloma prisijungti dėl leidimo'
        });
    }

    // promisify - node'o irasyta funkcija
    const decoded = await promisify(jwt.verify)(token, '22simboliu');
    console.log(decoded);

    // ar useris dar egzistuoja
    const currentUser = await AuthModel.findById(decoded.id);
    if (!currentUser) {
        return res.status(401).json({
            status: 'fail',
            message: 'Useris priklausantis siam tokenui, nebeegzistuoja'
        })
    }

    req.user = currentUser; // prileisti prie contento
    next();
}
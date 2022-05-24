const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()



module.exports.register = (req, res) => {
    const { name, email, password, user_type, identification_num } = req.body;

    if (!name || !email || !password || !identification_num) {
        res.status(400).json({ msg: "Please enter all fields."})
    }

    User.findOne({email})
        .then(user => {
            if(user) {
                return res.status(400).json({ msg: "Email has already been used."})
            }
        })

    const newUser = new User ({ name, email, password, user_type, identification_num })

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
                .then(user => {
                    jwt.sign(
                        { id: user._id },
                        process.env.SECRET_KEY,
                        { expiresIn: 3600},
                        ( err, token ) => {
                            if(err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email:user.email,
                                    identification_num: user.identification_num,
                                }
                            })
                        }
                    )
                })
        })
    })

}

module.exports.login = async (req, res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        res.status(400).json({msg: 'Please enter all fields'})
    }
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({msg: 'User does not exist'});

            // validate password
            bcrypt.compare(password, user.password)
                .then( isMatch => {
                    if (!isMatch) return res.status(400).json({msg: "Invalid credentials"});

                    jwt.sign(
                        { id: user._id},
                        process.env.SECRET_KEY,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user._id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }
                    )
                })
        })
}

module.exports.get_user = (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
}
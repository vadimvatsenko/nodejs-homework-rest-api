const { User } = require("../../model/user");
const { HttpError, sendEmail} = require('../../helpers');
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require('uuid');

const {BASE_URL} = process.env


const register = async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email});

    if (user) {
        throw HttpError(409, "Email already is use")
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarUrl = gravatar.url(email);

    const verificationToken = uuidv4();

    const newUser = await User
        .create({
            ...req.body,
            password: hashPassword,
            avatarUrl,
            verificationToken
        });
    
    const mail = {
        to: email,
        subject: "Confirm your email",
        html: `<a href="${BASE_URL}/api/auth/verify/${verificationToken}" target="_blank">Click on the link to register</a>`

    }

    await sendEmail(mail);
    
    res.status(201).json({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        subscription: newUser.subscription,
        avatarUrl: newUser.avatarUrl
    })
}

module.exports = register;
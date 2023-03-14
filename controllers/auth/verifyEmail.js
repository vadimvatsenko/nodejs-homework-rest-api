const { User } = require("../../model/user");
const {HttpError} = require("../../helpers")

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    console.log(verificationToken)
    const user = await User.findOne({ verificationToken });
    if (!user) {
        HttpError(404, "Not found verifivcation token")
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: '' });

    res.json({
        message: "Email verify success"
    })

}

module.exports = verifyEmail
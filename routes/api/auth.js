const express = require("express");
const { validateBody, authenticate, isValidId, upload} = require("../../middlewares");
const {authCntr} = require("../../controllers/")
const { schemas } = require("../../model/user");

const {
    // verifyEmail,
    login,
    register,
    getCurrent,
    logout,
    subscription,
    updateAvatar,
    resendVerifyEmail
} = authCntr;

const router = express.Router();

// ---
const verifyEmail = require("../../controllers/auth/verifyEmail");
const { controllersWrapper } = require("../../helpers");
// ---

router.post(
    "/register",
    validateBody(schemas.registerSchema),
    register
);

router.post(
    "/login",
    validateBody(schemas.loginSchema),
    login
);

router.get(
    "/current",
    authenticate,
    getCurrent
);

router.post(
    "/logout",
    authenticate,
    logout
);

router.patch(
    "/:id/subscription",
    authenticate,
    isValidId,
    validateBody(schemas.updateSubscriptionJoiSchema),
    subscription
)

router.patch(
    "/avatars",
    authenticate,
    upload.single("avatar"),
    updateAvatar
);

router.get(
    "/verify/:verificationToken",
    // verifyEmail,
    controllersWrapper(verifyEmail)

);

router.post(
    "/verify",
    validateBody(schemas.verifyEmailSchema),
    resendVerifyEmail
)

module.exports = router;


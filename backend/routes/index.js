import { testRoute } from "./testRoute.js";
import { homeRoute } from "./homeRoute.js";
import { signUpRoute } from "./signUpRoute.js";
import { signUp } from "./signUp.js";
import { loginRoute } from "./loginRoute.js";
import { updateUserInfoRoute } from "./updateUserInfoRoute.js";
import { verifyEmailRoute } from "./verifiedEmailRoute.js";
import { forgotPasswordRoute } from "./forgotPasswordRoute.js";
import { resetPasswordRoute } from "./resetPasswordRoute.js";
import { getGoogleOauthUrlRoute } from "./getGoogleOauthRoute.js";
import { googleOauthCallbackRoute } from "./googleOauthCallbackRoute.js";


export const routes = [
    testRoute,
    homeRoute,
    forgotPasswordRoute,
    signUpRoute,
    signUp,
    loginRoute,
    updateUserInfoRoute,
    verifyEmailRoute,
    resetPasswordRoute,
    getGoogleOauthUrlRoute,
    googleOauthCallbackRoute

];
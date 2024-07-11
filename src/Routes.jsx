

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserInfoPage } from './pages/UserInfoPage';
import { LogInPage } from './pages/LoginPage.jsx';
import { SignUpPage } from './pages/SignUpPAge.jsx';
import { PrivateRoutes } from './auth/PrivateRoute.jsx';
import { PleaseVerifyEmailPage } from './pages/PleaseVerifiedEmailPage.jsx';
import { EmailVerificationLandingPage } from './pages/EmailVerificationLandingPage.jsx';
import { ForgotPasswordPage } from './pages/passwordPage.jsx';
import { PasswordResetLandingPage } from './pages/PasswordResetLandingPage.jsx';




function Path() {
    return (
        <>
            <BrowserRouter>
                <Routes>

                    <Route path="/login" element={<LogInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/please-verify" element={<PleaseVerifyEmailPage />} />

                    <Route element={<PrivateRoutes />} >
                        <Route path="/" element={<UserInfoPage />} />
                    </Route>

                    <Route path='/verify-email/:verificationString' element={<EmailVerificationLandingPage />} />
                    <Route path='/reset-password/:passwordResetCode' element={<PasswordResetLandingPage />} />
                    <Route path='/forgot-password' element={<ForgotPasswordPage />} />

                </Routes>
            </BrowserRouter>
        </>
    );
}

export default Path;

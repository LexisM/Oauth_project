import { sendEmail } from "../util/sendEmail.js";

export const testEmailRoute = {

    path: '/api/test_email',
    method: 'post',
    handler: async (req, res) => {
        try {
            await sendEmail({
                to: 'lexis_maxwell@hotmail.com',
                from: 'lexismfb@gmail.com',
                subject: 'Does it work?',
                text: 'Yeeeees it works!',
            });
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}
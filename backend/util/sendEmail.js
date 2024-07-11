import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.VITE_SENDGRID_API_KEY);


export const sendEmail = ({ to, from, subject, text, html }) => {

    const msg = { to, from, subject, text, html };

    return sendgrid.send(msg); //returns a promise
}
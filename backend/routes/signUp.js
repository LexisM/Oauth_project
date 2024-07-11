
export const signUp = {
    path: '/api/signupget',
    method: 'get',
    handler: async (req, res) => {

        res.status(200).send('sign up get route');

    }

}
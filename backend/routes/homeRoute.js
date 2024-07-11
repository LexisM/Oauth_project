export const homeRoute = {
    path: '/',
    method: 'get',
    handler: (req, res) => {
        res.status(200).send('Home Page route');
    }

}
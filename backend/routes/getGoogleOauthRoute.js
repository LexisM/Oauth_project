import { getGoogleOauthUrl } from '../util/getGoogleOauthUrl.js';

export const getGoogleOauthUrlRoute = {
    path: '/auth/google/url',
    method: 'get',
    handler: (req, res) => {
        const url = getGoogleOauthUrl();
        res.status(200).send({ url });
    }
};
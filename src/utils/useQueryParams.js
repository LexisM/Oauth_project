import { useLocation } from 'react-router-dom';

export const useQueryParams = () => {
    const location = useLocation();
    const currentParamsObj = new URLSearchParams(location.search);
    const params = {};

    currentParamsObj.forEach((value, key) => {
        params[key] = value;
    });

    return params;
}
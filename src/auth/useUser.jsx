import { useEffect, useState } from "react";
import { useToken } from "./useToken";

export const useUser = () => {
    const [token] = useToken();

    const getPayloadFromToken = (token) => {
        try {
            if (!token) {
                throw new Error("No token provided");
            }

            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error("Invalid token structure");
            }

            const encodedPayload = parts[1];
            console.log("Encoded Payload:", encodedPayload);

            let paddedPayload = encodedPayload;

            while (paddedPayload.length % 4 !== 0) {
                paddedPayload += '=';
            }

            const base64Pattern = /^[A-Za-z0-9+/=]+$/;
            if (!base64Pattern.test(paddedPayload)) {
                throw new Error("Invalid Base64 string");
            }

            return JSON.parse(atob(paddedPayload));
        } catch (e) {
            console.error("Failed to decode token:", e);
            return null;
        }
    };

    const [user, setUser] = useState(() => {
        if (!token) return undefined; // Return undefined while loading
        return getPayloadFromToken(token);
    });

    useEffect(() => {
        if (!token) {
            setUser(null);
        } else {
            setUser(getPayloadFromToken(token));
        }
    }, [token]);

    return user;
};

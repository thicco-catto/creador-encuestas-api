import admin from "./firebase";

const auth = admin.auth();


/**
 * Checks if a JWT token is valid.
 * @param token 
 * @returns 
 */
export async function VerifyToken(token: string) {
    return await auth.verifyIdToken(token);
}
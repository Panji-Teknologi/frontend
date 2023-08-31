import jwt_decode from "jwt-decode";

// Fungsi untuk mendapatkan ID dari token JWT
export function getUserIdFromToken(token: string): number | null {
    try {
        const decoded: any = jwt_decode(token);
        return decoded.id; // id from token
    } catch (error) {
        return null;
    }
}
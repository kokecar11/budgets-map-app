import { type DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
        } & DefaultSession["user"];
        accessToken: string;
        refreshToken: string;
        expiresIn: number;
        error: string;
    }
    interface User {
        id: string;
        accessToken: string;
        refreshToken: string;
        name: string;
        image: string;
        expiresIn: number;
        expiresAt: number;
    }
    
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        accessToken: string;
        refreshToken: string;
        name: string;
        image: string;
        expiresIn: number;
        expiresAt: number;
        error: string;
        
    }
    
}
        


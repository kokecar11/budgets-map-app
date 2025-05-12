import { type User, type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials"
import { env } from "~/env";
interface SignInResponse {
  id: string;
  email: string;
  fullname: string;
  image: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  token_type: string;
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       name: string;
//       // accessToken: string;
      
//       // ...other properties
//       // role: UserRole;
//     } & DefaultSession["user"];
//   }

//   // interface User {
//   //   // ...other properties
//   //   // role: UserRole;
//   // }
// }

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
          type: 'email',
          label: 'Email',
        },
        password: {
          type: 'password',
          label: 'Email',
        },
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const urlApiBase = new URL(env.API_BASE_URL);
  
        try {
          const requestSignIn = await fetch(`${urlApiBase.toString()}/sign-in`, {
            method: 'POST',
            headers: {
              "Content-Type": 'application/json',
            },
            body: JSON.stringify({
              email: email,
              password:password,
            }),
          });
          if (!requestSignIn.ok) {
            const errorText = await requestSignIn.text();
            throw new Error(`Error ${requestSignIn.status}: ${errorText}`);
          }
          const response = await requestSignIn.json() as SignInResponse;
          if (!response) {
            throw new Error('Invalid credentials');
          }
          const user = {
            id: response.id,
            email: response.email,
            name: response.fullname,
            image: response.image,
            accessToken: response.access_token,
            refreshToken: response.refresh_token,
            expiresIn: response.expires_in,
            expiresAt: response.expires_at,
            tokenType: response.token_type,
          };
          
          return user;
        }catch (error) {
          console.error('Fetch error:', error);
          return null
        }
      },
    }),
  ],
  secret: env.AUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      const urlApiBase = new URL(env.API_BASE_URL);
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.expiresIn = Date.now() + user.expiresIn * 1000;
        token.sub = user.id;
        token.name = user.name;
        token.image = user.image;
      }

      if (Date.now() >  (token?.expiresIn as number)) {
        try {
          const responseValidateSession = await fetch(`${urlApiBase.toString()}/get-current-user`, {
            method: 'GET',
            headers: {
              "Content-Type": 'application/json',
              "Authorization": `Bearer ${token.accessToken as string}`,
            },
          });

          if (!responseValidateSession.ok) {
            const response = await fetch(`${urlApiBase.toString()}/refresh-session?refresh_token=${token.refreshToken as string}`, {
              method: 'GET',
              headers: {
                "Content-Type": 'application/json',
              },
            });

            if (!response.ok) {
              const errorText = await response.text();
              throw new Error(`Error ${response.status}: ${errorText}`);
            }

            const data = await response.json() as SignInResponse;
            token.accessToken = data.access_token;
            token.refreshToken = data.refresh_token;
            token.sub = data.id;
            token.name = data.fullname;
            token.image = data.image;
          }
        } catch (error) {
          console.error('Fetch error:', error);
          token.error = "RefreshTokenExpired";
          return null
        }
      }
      return token;
    },
    session: ({ session, token }) => ({
        ...session,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        error: token.error,
        user: {
          ...session.user,
          id: token.sub,
          name: token.name,
        },
      }),
  },
  // pages: {
  //   signIn: "/login", // Página a la que se redirige cuando no hay sesión válida
  // },
} satisfies NextAuthConfig;
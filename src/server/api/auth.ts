import { parse } from 'cookie';


export const getServerAuthSession = (ctx: { headers: Headers }) => {
  try {
    const cookies = parse(ctx.headers.get('cookie')?? '');
    const accessToken = cookies.access_token;
    const refreshToken = cookies.refresh_token;
    
    return { accessToken, refreshToken };
  } catch (error: unknown) {
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error('Error parsing cookies:', errorMessage);
    return { accessToken: null, refreshToken: null };
  }
};
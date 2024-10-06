import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import GoogleProfile from "@/types/next-auth";
import api from "@/api";

async function refreshAccessToken(token:any) {
  try {
    console.log("Refreshing access token")
    // console.log(token);
   const response = await api.patch('/v1/users/refresh-token', {refreshToken : token.refreshToken})

  //  console.log(response.data.data)
   const refreshedTokens = response.data.data


   if (response.data.success) {
    console.log("Access token has been refreshed")
    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + (1000*60*60*24),
      refreshToken: refreshedTokens.refreshToken,
    };
  } else {
    // If the refresh token is expired or invalid, throw an error
    throw new Error('Refresh token has expired or is invalid');
  }

   
  } catch (error) {
    console.error('Error refreshing access token:', error);

    return null
}
}


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        // create request for authorized

        try {
          const res = await api.post("/v1/users/login", {
            identifier: credentials.identifier,
            password: credentials.password,
          });

          const { user } = await res.data.data;

         
          if ( user) {
            return user;
          }
          return null
        } catch (err: any) {
          console.log(err);

          throw new Error(err);
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  secret: process.env.JWT_SECRET,
 
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET, // Use the same secret as your external server
    maxAge: 10*24*60*60 , // 10 day
  },
  callbacks: {

    async jwt({ token, user ,account}) {
      // console.log({ token, user ,account});
      if (token && user &&account) {
        token._id = user._id?.toString(); // Convert ObjectId to string
        token.isVerified = user.isVerified;
        token.username = user.username;
        token.isAdmin = user.isAdmin;
        token.role = user.role;
        token.accessToken = user.accessToken;
        token.name = user.name;
        token.refreshToken = user.refreshToken;
        token.accessTokenExpires= Date.now() +   (1000*60*60*24) ; // Access token expiry
      }
      if( token &&  !token.accessToken) {
        return null
      }
      if (Date.now() < token.accessTokenExpires){
        // console.log("Access token is still valid");
        return token;
      }
      if(Date.now() >= token.accessTokenExpires) {
        console.log("Access token has expired. Refreshing it");
        return refreshAccessToken(token);
      }
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.username = token.username;
        session.user.isAdmin = token.isAdmin;
        session.user.role = token.role;
        session.user.role = token.role;
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.name = token.name;
      }
      return session;
    },
  },

  

  pages: {
    signIn: "/sign-in",
  },
};

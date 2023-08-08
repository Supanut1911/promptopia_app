import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";
import User from "@models/user";
import { NextAuthOptions } from "next-auth";
import { log } from "console";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: `${process.env.GOOGLE_ID}`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();
      return session;
    },

    async signIn({ profile }: any) {
      try {
        await connectToDB();

        //check if user already exist
        const userExists = await User.findOne({ email: profile.email });

        //if not, create a new user
        if (!userExists) {
          await User.create({
            id: profile.id,
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: `${process.env.GOOGLE_ID}`,
//       clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
//     }),
//   ],
//   callbacks: {
//     // session: async ({ session }: any) => {
//     //   console.log("called");
//     //   const sessionUser = await User.findOne({ email: session.user.email });
//     //   console.log("sessionUser", sessionUser);
//     //   session.user.id = sessionUser._id.toString();
//     //   return session;
//     // },
//     session: ({ session }: any) => {
//       console.log("session =>", session);
//     },

//     jwt: ({ token, user }: any) => {
//       console.log("token, => ", token);
//     },

//     async signIn({ profile }: any) {
//       try {
//         console.log("hiiiii signin");

//         await connectToDB();

//         //check if user already exist
//         const userExists = await User.findOne({ email: profile.email });

//         //if not, create a new user
//         if (!userExists) {
//           await User.create({
//             email: profile.email,
//             username: profile.name.replace(" ", "").toLowerCase(),
//             image: profile.picture,
//           });
//         }

//         return true;
//       } catch (error) {
//         console.log(error);
//         return false;
//       }
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

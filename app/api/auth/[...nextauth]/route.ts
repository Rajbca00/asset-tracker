import { addUser, User } from "@/app/actions/addUser";
import { getUser, getUserByEmail } from "@/app/actions/getUser";
import NextAuth, { DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

declare module "next-auth" {
    interface Session {
        user: {
            id?: string;
        } & DefaultSession["user"];
    }
}

export const handler = NextAuth({
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || (() => { throw new Error("GOOGLE_CLIENT_ID is not defined"); })(),
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || (() => { throw new Error("GOOGLE_CLIENT_SECRET is not defined"); })(),
        }),
    ],
    callbacks: {
        async session({ session }) {
            if (session.user) {
                const email = session.user.email || "";
                const user = await getUserByEmail(email);
                if (user) {
                    session.user.id = user.id;
                }
            }

            return session
        },
        async signIn({ user }) {
            const existingUser = await getUser(user.id)
            if (existingUser) {
                user.id = existingUser.id
                return true
            }
            else {
                if (!user.email || !user.name || !user.image) {
                    return false
                }

                const newUser: User = {
                    email: user.email,
                    name: user.name,
                    image: user.image
                }
                addUser(newUser)
                return true
            }
        }
    }
});

export { handler as GET, handler as POST };
import User from "@/app/models/User";
import connectToDB from "@/app/utils/db";
import bcrypt from "bcryptjs";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
/**
 * login with crendentials(email and password)
 */

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials", // internally coming
            credentials: {
                email: {
                    label: "Email",
                    type: "text",
                    placeholder: "user@example.com",
                },
                password: { label: "Password", type: "password" }, // field
                // we can add more field
            },
            async authorize(credentials) { // autherized
                await connectToDB(); // db connection
                const user = await User.findOne({ email: credentials?.email });
                if (!user) throw new Error("User not found");
                const isMatch = await bcrypt.compare(credentials?.password as string, user.password);
                if (!isMatch) throw new Error("Invalid credentials");
                return { id: user?._id, name: user?.name, email: user?.email, role: user?.role };
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    // after successfully authorized come to here try to create jwt and session
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user?.id as string;
                token.role = (user as unknown as { role: string })?.role as string; // Add role to the token
            }
            return token;
        },
        async session({ session, token }) {
            (session.user as { id: string }).id = token.id as string;
            (session.user as { id: string; role: string }).role = token.role as string; // Add role to the session
            return session;
        },
    },
    secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import NextAuth from "next-auth"
import authOption from "@/app/auth/authOptions";


const handler = NextAuth(authOption)

export { handler as GET, handler as POST }
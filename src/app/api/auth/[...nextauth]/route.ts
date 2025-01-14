import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const handler= NextAuth({
    providers:[
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
              email: { label: "Email", type: "email" },
              password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
              if (!credentials?.email || !credentials?.password) {
                throw new Error('Email and password are required');
              }
              console.log("inside")
              // Fetch the user from the database
              const user = await prisma.user.findUnique({
                where: { email: credentials.email },
              });
      
              if (!user) {
                throw new Error('invalid_user');
              }
      
            
            //   const isValid = await bcrypt.compare(credentials.password, user.password);
           const isValid=credentials.password==user.password
            
      
              if (!isValid) {
                throw new Error('invalid_creds');
              }
      
              // Return the user object if authentication was successful
              return {
                id: user.id,
                name: user.name,
                email: user.email,
              };
            }
          }),
    ],
    pages: {
    signIn: '/chat',
    signOut: '/login',
    error: '/login',
  },
})

export {handler as GET, handler as POST}
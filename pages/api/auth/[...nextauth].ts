import prisma from '@/app/libs/prismadb'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { AuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'


export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            //@ts-ignore
            async profile(profile) {
                // console.log({profile})
                return {
                    // ...profile,
                    id: profile.sub,
                    fullname: profile.name,
                    name: profile.name,
                    email: profile.email,
                    emailVerified: profile.email_verified,
                    image: profile.picture,
                    id_tipo_usuario: 1
                }
            }
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password){
                    throw new Error('1. Invalid credentials')
                }
                console.log({credentials})

                /* 1. Get the User */
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                console.log(user)
                if(!user || !user?.hashedPassword){
                    throw new Error('2. Invalid credentials: ')
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword
                )
                console.log({isCorrectPassword})

                if(!isCorrectPassword) {
                    console.log('Error')
                    throw new Error('3. Invalid credentials: ')
                }

                return user as any

            },

        })
    ],
    pages: {
        signIn: '/',
        signOut: '/'
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
        //maxAge: 2*60
    },
    secret: process.env.NEXTAUTH_SECRET

}

export default NextAuth(authOptions)
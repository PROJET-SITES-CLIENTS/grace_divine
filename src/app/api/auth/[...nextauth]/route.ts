import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@gracedivine.com" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials, req) {
        console.log("Tentative de connexion avec:", credentials?.email);
        console.log("Email attendu:", process.env.ADMIN_EMAIL);
        
        if (
          credentials?.email === process.env.ADMIN_EMAIL &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          console.log("Authentification réussie pour:", credentials.email);
          return { id: "1", name: "Admin Grace Divine", email: credentials.email }
        }
        
        console.log("Authentification échouée. Identifiants incorrects.");
        return null
      }
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: "jwt",
  },
  debug: true,
})

export { handler as GET, handler as POST }

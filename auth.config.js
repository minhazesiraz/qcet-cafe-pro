export const auth_config = {
   pages: { signIn: "/accounts/logon" },
   providers: [],
   session: {
      strategy: "jwt"
   },
   //  trustHost: true,
   callbacks: {
      async jwt({ token, user, trigger, session, account, profile }) {
         if (user) {
            token.id = user.id;
            token.role = user.role;
            token.email = user.email;
            token.name = user.name;
            token.isProve = user.isProve;
            token.avatar = user.avatar;
         }

         return token;
      },

      async session({ session, token, user, trigger, newSession }) {
         session.user.id = token.id;
         session.user.role = token.role;
         session.user.email = token.email;
         session.user.name = token.name;
         session.user.isProve = token.isProve;
         session.user.avatar = token.avatar;

         console.log(`returning session: ${JSON.stringify(session)}`);

         return session;
      }
   }
};

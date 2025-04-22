export const PUBLIC_ROUTES = [
   "/blogs/[slug]",
   "/plans",
   "/teams",
   "/accounts/enroll",
   "/accounts/awaiting-confirmation",
   "/accounts/logon",
   "/accounts/forgot-password",
   "/accounts/resetting-password",
   "/api/auth/providers",
   "/api/auth/signin",
   "/api/auth/callback/credentials",
   "/api/auth/signin/google",
   "/api/auth/callback/google",
   "/api/auth/session",
   "/api/auth/csrf",
   "/api/auth/signout",
   "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap"
];
export const ADMIN_ROUTES = ["/admin"];
export const MODERATOR_ROUTES = ["/editor"];
export const CLIENT_ROUTES = [];
export const PROVING_ROUTES = [
   "/accounts/awaiting-confirmation",
   //  "/api/auth/providers",
   "/api/auth/signout",
   //  "/api/auth/signin",
   //  "/api/auth/callback/credentials",
   //  "/api/auth/signin/google",
   //  "/api/auth/callback/google",
   "/api/auth/session",
   "/api/auth/csrf",
   "/accounts/logon"
];

export const AWAITING_CONFIRMATION_ROUTES = [
   "/accounts/awaiting-confirmation",
   "/accounts/enroll",
   "/accounts/logon"
];

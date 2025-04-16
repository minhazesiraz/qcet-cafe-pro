import crypto from "crypto";

// Creates a random 20-byte token
export function createProvingToken() {
   return crypto.randomBytes(20).toString("hex");
}

// Token expires in 24 hours
export function createProvingTokenExpires() {
   return new Date(Date.now() + 24 * 60 * 60 * 1000);
}

// Creates a random 6-digit code
export function createProvingCode() {
   return Math.floor(100000 + Math.random() * 900000).toString();
}

export function createResettingToken() {
   // to send in email
   const resettingToken = crypto.randomBytes(32).toString("hex");

   // to store in database
   const hashedToken = crypto
      .createHash("sha256")
      .update(resettingToken)
      .digest("hex");

   // to store in database
   const expires = Date.now() + 15 * 60 * 1000; // 15 minutes from now

   return {
      resettingToken,
      hashedToken,
      expires
   };
}

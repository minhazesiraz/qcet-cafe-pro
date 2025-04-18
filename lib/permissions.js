export const hasAccess = (link, role) => {
   if (link.separator) return true;

   // Admin-only
   if (link.admin && role !== "admin") return false;

   // Moderator-only
   if (link.moderator && !["admin", "moderator"].includes(role)) return false;

   return true; // Show by default
};

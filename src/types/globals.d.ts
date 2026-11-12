// Global ambient type declarations for static assets and styling imports

declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

// Fallback ambient declaration for NodeJS.ErrnoException in pure web/hybrid compiler contexts
declare namespace NodeJS {
  interface ErrnoException extends Error {
    errno?: number;
    code?: string;
    path?: string;
    syscall?: string;
  }
}

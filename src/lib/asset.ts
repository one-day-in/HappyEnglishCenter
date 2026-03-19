/**
 * Base path prefix for static assets.
 * In dev: empty string (images at /images/...)
 * In prod (GitHub Pages): /HappyEnglishCenter (images at /HappyEnglishCenter/images/...)
 */
export const BP = process.env.NEXT_PUBLIC_BASE_PATH ?? ''

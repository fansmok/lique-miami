import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  // If you host this somewhere, replace it with your actual domain
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://liquemiami.vercel.app'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // disallow: '/private/',
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}

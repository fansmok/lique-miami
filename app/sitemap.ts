import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // If you host this somewhere, replace it with your actual domain
  // e.g., 'https://liquemiami.com'
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://liquemiami.vercel.app'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    // Add more routes here as the site grows
    // {
    //   url: `${baseUrl}/menu`,
    //   lastModified: new Date(),
    //   changeFrequency: 'monthly',
    //   priority: 0.8,
    // },
  ]
}

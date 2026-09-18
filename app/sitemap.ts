import fs from 'fs';
import path from 'path';

export async function generateSitemaps() {
  return [{ id: 0 }];
}

export default async function sitemap(props?: { id: number }) {
  void props;
  const BASE_URL = 'https://ayadacliff.com';

  const staticRoutes = [
    '', // homepage
    '/accommodations/ocean-edge',
    '/accommodations/ocean-haven',
    '/gallery',
    '/reserve',
  ];

  const pageEntries = staticRoutes.map((route) => ({
    url: `${BASE_URL}/${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // 🔍 Find named assets in public/
  const assetFiles = findPublicAssets(['jpg', 'png', 'webp', 'pdf']);

  const assetEntries = assetFiles.map((filePath) => ({
    url: `${BASE_URL}/${filePath.replace(/\\/g, '/')}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'yearly',
    priority: 0.3,
  }));

  return [...pageEntries, ...assetEntries];
}

// 🔧 Utility: Recursively scan /public for assets with target extensions
function findPublicAssets(extensions: string[], dir = 'public', base = ''): string[] {
  const result: string[] = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const relPath = path.join(base, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      result.push(...findPublicAssets(extensions, fullPath, relPath));
    } else {
      const ext = path.extname(file).slice(1).toLowerCase();
      if (extensions.includes(ext)) {
        result.push(relPath);
      }
    }
  }

  return result;
}

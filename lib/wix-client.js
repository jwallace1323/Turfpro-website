import { createClient, OAuthStrategy } from '@wix/sdk';
import { items } from '@wix/data';

export const wixClient = createClient({
  modules: { items },
  auth: OAuthStrategy({
    clientId: process.env.NEXT_PUBLIC_WIX_CLIENT_ID,
  }),
});

/**
 * Fetch all items from a Wix CMS collection.
 * Returns an empty array if Wix is not configured or the request fails.
 */
export async function getCollection(collectionId) {
  if (!process.env.NEXT_PUBLIC_WIX_CLIENT_ID) return [];
  try {
    const { items: data } = await wixClient.items
      .queryDataItems({ dataCollectionId: collectionId })
      .find();
    return data || [];
  } catch (err) {
    console.warn(`[Wix CMS] Could not fetch "${collectionId}":`, err.message);
    return [];
  }
}

/**
 * Fetch the first item from a Wix CMS collection (for singleton sections).
 * Returns null if nothing is found.
 */
export async function getSingleItem(collectionId) {
  const data = await getCollection(collectionId);
  return data[0]?.data || null;
}

/**
 * Convert a Wix-hosted image URI to a usable URL with optional dimensions.
 */
export function getWixImageUrl(wixUri, width = 800, height = 600) {
  if (!wixUri) return null;
  if (wixUri.startsWith('http')) return wixUri;
  const fileId = wixUri.replace('wix:image://v1/', '').split('#')[0];
  return `https://static.wixstatic.com/media/${fileId}/v1/fill/w_${width},h_${height},al_c,q_85/${fileId}`;
}

import { api } from './client';

export type UploadedImage = { url: string };

const MIME_BY_EXT: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
};

/**
 * Upload a local image (an expo-image-picker URI) and get its hosted URL.
 * POST /api/images — multipart, `file` part. Allowed: jpg/png/webp/gif, max 5MB.
 */
export async function uploadImage(uri: string): Promise<UploadedImage> {
  const name = uri.split('/').pop() || 'image.jpg';
  const ext = name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const type = MIME_BY_EXT[ext] ?? 'image/jpeg';

  const form = new FormData();
  // React Native accepts a { uri, name, type } object as a multipart file part.
  form.append('file', { uri, name, type } as unknown as Blob);

  const res = await api.post<UploadedImage>('/api/images', form, {
    // Clear the instance's JSON default and let the platform set `multipart/form-data; boundary=…`.
    // Setting the header by hand omits the boundary, which many servers then can't parse.
    headers: { 'Content-Type': undefined } as unknown as Record<string, string>,
  });
  return res.data;
}

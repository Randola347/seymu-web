import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Deletes an image from Cloudinary given its public_id.
 */
export async function deleteFromCloudinary(publicId: string | null) {
  if (!publicId) return { success: false, message: "No public ID provided" };

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Cloudinary destroy result:", result);
    return { success: result.result === "ok", result };
  } catch (error) {
    console.error("Error deleting from Cloudinary:", error);
    return { success: false, error };
  }
}

/**
 * Extracts the public_id from a Cloudinary URL.
 * Example URL: https://res.cloudinary.com/demo/image/upload/v12345/sample.jpg -> sample
 */
export function extractPublicIdFromUrl(url: string | null | undefined): string | null {
  if (!url || !url.includes("cloudinary.com")) return null;
  
  try {
    const parts = url.split("/upload/");
    if (parts.length < 2) return null;
    
    const pathAfterUpload = parts[1];
    // Remove version segment if present (e.g., v123456789/)
    const withoutVersion = pathAfterUpload.replace(/^v\d+\//, "");
    // Remove file extension
    const publicId = withoutVersion.split(".")[0];
    
    return publicId;
  } catch (error) {
    console.error("Error extracting publicId from URL:", error);
    return null;
  }
}

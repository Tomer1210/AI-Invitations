const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export type ImageUploadError = "type" | "size" | "read";

export function validateImageFile(file: File): ImageUploadError | null {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return "type";
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return "size";
  }
  return null;
}

export function readImageAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Invalid read result"));
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

export async function processImageFile(
  file: File,
): Promise<{ dataUrl: string } | { error: ImageUploadError }> {
  const validationError = validateImageFile(file);
  if (validationError) {
    return { error: validationError };
  }

  try {
    const dataUrl = await readImageAsDataUrl(file);
    return { dataUrl };
  } catch {
    return { error: "read" };
  }
}

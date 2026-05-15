import { toPng } from "html-to-image";

const EXPORT_PIXEL_RATIO = 3;
const MAX_PIXEL_RATIO = 3;

export type ExportInvitationOptions = {
  filename: string;
};

function getPixelRatio() {
  if (typeof window === "undefined") return EXPORT_PIXEL_RATIO;
  return Math.min(window.devicePixelRatio || 2, MAX_PIXEL_RATIO);
}

function waitForNextFrame() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

async function waitForFonts() {
  if (typeof document !== "undefined" && document.fonts?.ready) {
    await document.fonts.ready;
  }
}

async function waitForImages(node: HTMLElement) {
  const images = Array.from(node.querySelectorAll("img"));

  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          img.onload = () => resolve();
          img.onerror = () => resolve();
        }),
    ),
  );
}

function triggerDownload(dataUrl: string, filename: string) {
  const link = document.createElement("a");
  link.download = filename;
  link.href = dataUrl;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function buildInvitationFilename(
  templateName: string,
  celebrantNames: string,
): string {
  const slug = [celebrantNames, templateName]
    .filter(Boolean)
    .join("-")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}\-]+/gu, "")
    .slice(0, 72);

  return `${slug || "invitation"}.png`;
}

export async function exportInvitationToPng(
  node: HTMLElement,
  options: ExportInvitationOptions,
): Promise<void> {
  await waitForFonts();
  await waitForImages(node);
  await waitForNextFrame();

  const { width, height } = node.getBoundingClientRect();
  const pixelRatio = getPixelRatio();

  const dataUrl = await toPng(node, {
    cacheBust: true,
    pixelRatio,
    backgroundColor: "#030304",
    width,
    height,
    canvasWidth: Math.round(width * pixelRatio),
    canvasHeight: Math.round(height * pixelRatio),
    style: {
      direction: "rtl",
      unicodeBidi: "plaintext",
    },
  });

  triggerDownload(dataUrl, options.filename);
}

/**
 * Share content using the Web Share API with graceful fallbacks.
 * If a path is provided, it will be resolved against window.location.origin
 * (unless it is an absolute URL). If no path/url is provided, it falls back
 * to the current window location.
 *
 * @param {Object} options
 * @param {string} [options.title] - Title for the share payload.
 * @param {string} [options.text] - Text/description for the share payload.
 * @param {string} [options.path] - Relative path (e.g., "/product/123").
 * @param {string} [options.url] - Absolute URL to share (overrides path).
 * @returns {Promise<{ ok: boolean; method: 'web-share' | 'clipboard' | 'window-open' | 'none'; url: string }>} result
 */
export async function shareContent({ title, text, path, url } = {}) {
  const isBrowser = typeof window !== "undefined";
  const hasNavigator = typeof navigator !== "undefined";

  const resolveUrl = () => {
    if (url) return url;
    if (!isBrowser) return "";

    if (path) {
      const isAbsolute = /^(https?:)?\/\//i.test(path);
      if (isAbsolute) return path;
      const origin = window.location?.origin ?? "";
      const normalizedPath = path.startsWith("/") ? path : `/${path}`;
      return `${origin}${normalizedPath}`;
    }

    return window.location?.href ?? "";
  };

  const shareUrl = resolveUrl();

  // Attempt native share first
  try {
    if (hasNavigator && typeof navigator.share === "function") {
      await navigator.share({ title, text, url: shareUrl });
      return { ok: true, method: "web-share", url: shareUrl };
    }
  } catch {
    // Fall through to clipboard
  }

  // Clipboard fallback
  try {
    if (hasNavigator && navigator.clipboard?.writeText) {
      const clipboardText = `${title ? `${title}\n` : ""}${text ? `${text}\n` : ""}${shareUrl}`;
      await navigator.clipboard.writeText(clipboardText);
      return { ok: true, method: "clipboard", url: shareUrl };
    }
  } catch {
    // Fall through to window.open
  }

  // Last resort: open the URL in a new tab/window
  if (isBrowser && shareUrl) {
    try {
      window.open(shareUrl, "_blank");
      return { ok: true, method: "window-open", url: shareUrl };
    } catch {
      // No further fallback
    }
  }

  return { ok: false, method: "none", url: shareUrl };
}

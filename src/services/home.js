import { publicClient } from "../utils/http";

export async function getHeaderSliders() {
  try {
    const res = await publicClient.get("/sliders");
    const sliders = res.data.data.map((slider) => {
      let imageUrl = "";
      try {
        const bgImage = JSON.parse(slider.background_image);
        if (Array.isArray(bgImage) && bgImage.length > 0) {
          imageUrl = `https://jswprofilesheet.com/storage/${bgImage[0].download_link}`;
        }
      } catch (e) {
        console.error("Error parsing background_image", e);
      }
      return {
        ...slider,
        imageUrl,
      };
    });
    return sliders;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error?.message ||
        "Unable to fetch details, Please try again.",
    );
  }
}

const SECTION_STORAGE_BASE = "https://jswprofilesheet.com/storage";

export async function getSection(sectionId) {
  try {
    const res = await publicClient.get(`/sections/${sectionId}`);
    const raw = res.data?.data;
    if (!raw) return null;
    let backgroundImageUrl = null;
    if (raw.background_image) {
      try {
        const parsed = JSON.parse(raw.background_image);
        if (
          Array.isArray(parsed) &&
          parsed.length > 0 &&
          parsed[0].download_link
        ) {
          backgroundImageUrl = `${SECTION_STORAGE_BASE}/${parsed[0].download_link.replace(/\\\\/g, "/")}`;
        }
      } catch (e) {
        console.error("Error parsing section background_image", e);
      }
    }
    return {
      id: raw.id,
      title: raw.title ?? "Best Products",
      text: raw.text ?? "",
      link_text: raw.link_text,
      link_url: raw.link_url,
      background_image: backgroundImageUrl,
      vertical_alignment: raw.vertical_alignment ?? "top",
      status: raw.status,
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error?.message ||
        "Unable to fetch section, Please try again.",
    );
  }
}

export async function getBestProducts() {
  try {
    const res = await publicClient.get("/products", {
      params: { type: "best_quality", group_by: "category" },
    });
    return res.data?.data ?? null;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error?.message ||
        "Unable to fetch best products, Please try again.",
    );
  }
}

export async function getHomeBlogPosts() {
  try {
    const res = await publicClient.get("/v1/home/blog-posts");
    return res.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error?.message ||
        "Unable to fetch blog posts, Please try again.",
    );
  }
}

export async function getTeamMembers() {
  try {
    const res = await publicClient.get("/v1/home/team-members");
    return res.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error?.message ||
        "Unable to fetch team members, Please try again.",
    );
  }
}

export async function getServiceFeatures() {
  try {
    const res = await publicClient.get("/v1/home/service-features");
    return res.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error?.message ||
        "Unable to fetch service features, Please try again.",
    );
  }
}

export async function getGalleryItems() {
  try {
    const res = await publicClient.get("/v1/home/gallery");
    return res.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error?.message ||
        "Unable to fetch gallery items, Please try again.",
    );
  }
}

export async function getSpecialOffers() {
  try {
    const res = await publicClient.get("/v1/home/parallax");
    return res.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error?.message ||
        "Unable to fetch parallax content, Please try again.",
    );
  }
}

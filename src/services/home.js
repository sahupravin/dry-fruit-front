import { publicClient } from "../utils/http";

export async function getHeaderSliders() {
  try {
    const res = await publicClient.get("/v1/sliders");
    return res.data.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        error?.message ||
        "Unable to fetch details, Please try again.",
    );
  }
}

export async function getBestProducts() {
  try {
    const res = await publicClient.get("/v1/home/best-products");
    return res.data.data;
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

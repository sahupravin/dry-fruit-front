import { useQuery } from "@tanstack/react-query";
import { getSection, getBestProducts } from "../../services/home";

const SECTION_ID_BEST_PRODUCTS = 1;

const FALLBACK_SECTION = {
  id: SECTION_ID_BEST_PRODUCTS,
  title: "Best Products",
  text: "Explore our top-rated products, handpicked for their quality and value.",
  link_text: null,
  link_url: null,
  background_image: null,
  vertical_alignment: "top",
  status: "Active",
};

export function useBestProducts(options = {}) {
  const sectionQuery = useQuery({
    queryKey: ["home", "best-products", "section", SECTION_ID_BEST_PRODUCTS],
    queryFn: () => getSection(SECTION_ID_BEST_PRODUCTS),
    staleTime: 30_000,
    retry: 1,
    ...options,
  });

  const productsQuery = useQuery({
    queryKey: ["home", "best-products", "products"],
    queryFn: () => getBestProducts(),
    staleTime: 30_000,
    retry: 1,
    ...options,
  });

  const isLoading = sectionQuery.isLoading || productsQuery.isLoading;
  const isSectionError = sectionQuery.isError;
  const isProductsError = productsQuery.isError;
  const productsFailedOrEmpty =
    isProductsError ||
    !productsQuery.data?.categories?.length ||
    !productsQuery.data.categories.some(
      (cat) => Array.isArray(cat.products) && cat.products.length > 0,
    );

  const section = isSectionError
    ? FALLBACK_SECTION
    : (sectionQuery.data ?? null);
  const categories = productsQuery.data?.categories ?? [];

  return {
    section,
    categories,
    isLoading,
    isSectionError,
    isProductsError,
    productsFailedOrEmpty,
    error: sectionQuery.error || productsQuery.error,
  };
}

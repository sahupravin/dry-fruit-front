import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router";
import FeaturedProductCard from "../componenets/common/FeaturedProductCard";
import ProductListCard from "../componenets/common/ProductListCard";
import Button from "../componenets/common/Button";
import ContainerWrapper from "../componenets/common/ContainerWrapper";
import SectionWrapper from "../componenets/common/SectionWrapper";
import Breadcrumb from "../componenets/Breadcrumb";
import ModalDrawer from "../componenets/common/model/ModelDrawer";
import Select from "../componenets/common/Select";
import { TbGridDots, TbListDetails } from "react-icons/tb";
import { CiFilter } from "react-icons/ci";

// ... (sample product data remains the same)

// Sample product data
const sampleProducts = [
  {
    id: 1,
    title: "Barberry",
    salePrice: "$286.00",
    regularPrice: null,
    tag: null,
    image1:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    category: "Masalas",
    weight: "500 gm",
    price: 286,
    brand: "catch",
  },
  {
    id: 2,
    title: "Black Cardamom",
    salePrice: "$569.00",
    regularPrice: null,
    tag: null,
    image1:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    category: "Masalas",
    weight: "250 gm",
    price: 569,
    brand: "Vedaka",
  },
  {
    id: 3,
    title: "Black Mustard",
    salePrice: "$286.00",
    regularPrice: null,
    tag: null,
    image1:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    category: "Masalas",
    weight: "1 kg",
    price: 286,
    brand: "Kesari",
  },
  {
    id: 4,
    title: "Black Sesame",
    salePrice: "$795.00",
    regularPrice: "$800.00",
    tag: "Sale",
    image1:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    category: "Cooking Essentials",
    weight: "500 gm",
    price: 795,
    brand: "Eastern",
  },
  {
    id: 5,
    title: "Cardamom",
    salePrice: "$897.00",
    regularPrice: "$900.00",
    tag: "Sale",
    image1:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    category: "Masalas",
    weight: "250 gm",
    price: 897,
    brand: "Oskino",
  },
  {
    id: 6,
    title: "Cinnamon",
    salePrice: "$421.00",
    regularPrice: null,
    tag: null,
    image1:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    category: "Masalas",
    weight: "1 kg",
    price: 421,
    brand: "catch",
  },
  {
    id: 7,
    title: "Clove",
    salePrice: "$299.00",
    regularPrice: null,
    tag: null,
    image1:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    category: "Clove",
    weight: "500 gm",
    price: 299,
    brand: "Vedaka",
  },
  {
    id: 8,
    title: "Coriander",
    salePrice: "$197.00",
    regularPrice: "$300.00",
    tag: "Sale",
    image1:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    category: "Cooking Essentials",
    weight: "2 kg",
    price: 197,
    brand: "Kesari",
  },
  {
    id: 9,
    title: "Cubeb Pepper",
    salePrice: "$298.00",
    regularPrice: null,
    tag: null,
    image1:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    category: "Pepper Powder",
    weight: "250 gm",
    price: 298,
    brand: "Eastern",
  },
  {
    id: 10,
    title: "Dill Seeds",
    salePrice: "$289.00",
    regularPrice: null,
    tag: null,
    image1:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    category: "Cooking Essentials",
    weight: "500 gm",
    price: 289,
    brand: "Oskino",
  },
  {
    id: 11,
    title: "Dried Ginger",
    salePrice: "$299.00",
    regularPrice: null,
    tag: null,
    image1:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    category: "Cooking Essentials",
    weight: "1 kg",
    price: 299,
    brand: "catch",
  },
  {
    id: 12,
    title: "Dried Rosemary",
    salePrice: "$649.00",
    regularPrice: null,
    tag: null,
    image1:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    category: "Cooking Essentials",
    weight: "250 gm",
    price: 649,
    brand: "Vedaka",
  },
  {
    id: 13,
    title: "Rosehip Berries",
    salePrice: "$579.00",
    regularPrice: null,
    tag: null,
    image1:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    category: "Household",
    weight: "500 gm",
    price: 579,
    brand: "Kesari",
  },
  {
    id: 14,
    title: "Fennel Seeds",
    salePrice: "$489.00",
    regularPrice: null,
    tag: "Sale",
    image1:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    category: "Cooking Essentials",
    weight: "1 kg",
    price: 489,
    brand: "Eastern",
  },
  {
    id: 15,
    title: "Fenugreek Dal",
    salePrice: "$129.00",
    regularPrice: "$900.00",
    tag: "Sale",
    image1:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    category: "Cooking Essentials",
    weight: "2 kg",
    price: 129,
    brand: "Oskino",
  },
  {
    id: 16,
    title: "Green Peppercorn",
    salePrice: "$759.00",
    regularPrice: null,
    tag: null,
    image1:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
    category: "Pepper Powder",
    weight: "500 gm",
    price: 759,
    brand: "catch",
  },
  {
    id: 17,
    title: "Nutmeg",
    salePrice: "$199.00",
    regularPrice: "$405.00",
    tag: "Sale",
    image1:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
    category: "Masalas",
    weight: "250 gm",
    price: 199,
    brand: "Vedaka",
  },
];

const categories = [
  { name: "Masalas", hasSub: true },
  { name: "Chat Masalas", hasSub: true },
  { name: "Pepper Powder", hasSub: false },
  { name: "Cooking Essentials", hasSub: false },
  { name: "Refund Oil", hasSub: true },
  { name: "Household", hasSub: false },
  { name: "Personal Care", hasSub: false },
  { name: "Clove", hasSub: true },
];

const weights = ["250 gm", "500 gm", "1 kg", "2 kg", "3 kg"];
const priceRanges = [
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200 - $300", min: 200, max: 300 },
  { label: "$300 - $500", min: 300, max: 500 },
  { label: "$500 - $700", min: 500, max: 700 },
  { label: "$700 - $1000", min: 700, max: 1000 },
];
const brands = ["catch", "Vedaka", "Kesari", "Eastern", "Oskino"];

function ProductListing() {
  const { category: urlCategory } = useParams();
  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get("category");
  const searchQuery = searchParams.get("q");

  const [filters, setFilters] = useState({
    category: null,
    weight: null,
    priceRange: null,
    brand: null,
    search: null,
  });

  useEffect(() => {
    const categoryToFilter = urlCategory || queryCategory;
    if (categoryToFilter) {
      // Find the actual category name from our list if it's a slug
      const actualCategory = categories.find(
        (c) => c.name.toLowerCase().replace(/\s+/g, "-") === categoryToFilter,
      );

      setFilters((prev) => ({
        ...prev,
        category: actualCategory ? actualCategory.name : categoryToFilter,
      }));
    }

    if (searchQuery) {
      setFilters((prev) => ({
        ...prev,
        search: searchQuery,
      }));
    }
  }, [urlCategory, queryCategory, searchQuery]);

  const [sortBy, setSortBy] = useState("featured");
  const [itemsPerPage, setItemsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter products based on selected filters
  const filteredProducts = sampleProducts.filter((product) => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.weight && product.weight !== filters.weight) return false;
    if (filters.brand && product.brand !== filters.brand) return false;
    if (filters.priceRange) {
      const { min, max } = filters.priceRange;
      if (product.price < min || product.price > max) return false;
    }
    if (
      filters.search &&
      !product.title.toLowerCase().includes(filters.search.toLowerCase())
    )
      return false;
    return true;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name":
        return a.title.localeCompare(b.title);
      default:
        return 0; // featured - keep original order
    }
  });

  // Pagination
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = sortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType] === value ? null : value,
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearAllFilters = () => {
    setFilters({
      category: null,
      weight: null,
      priceRange: null,
      brand: null,
    });
    setCurrentPage(1);
  };

  // Check if any filters are active
  const hasActiveFilters =
    filters.category || filters.weight || filters.priceRange || filters.brand;

  // Filter Drawer Component
  const FilterDrawer = () => (
    <ModalDrawer
      isOpen={isMobileFilterOpen}
      onClose={() => setIsMobileFilterOpen(false)}
      position="left"
    >
      <div className="h-full overflow-y-auto">
        <div className="space-y-8">
          {/* Category Filter */}
          <div>
            <h3 className="text-brand-500 mb-4 text-lg font-semibold">
              Category
            </h3>
            <div className="space-y-1">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center justify-between py-2"
                >
                  <button
                    onClick={() =>
                      handleFilterChange("category", category.name)
                    }
                    className={`flex-1 text-left text-sm transition-all duration-300 ease-in-out ${
                      filters.category === category.name
                        ? "text-brand-50 font-medium"
                        : "text-brand-600 hover:text-brand-50"
                    }`}
                  >
                    {category.name}
                  </button>
                  {category.hasSub && (
                    <span className="text-brand-100 ml-2 text-sm">+</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Weight Filter */}
          <div>
            <h3 className="text-brand-500 mb-4 text-lg font-semibold">
              Shop By Weight
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {weights.map((weight) => (
                <button
                  key={weight}
                  onClick={() => handleFilterChange("weight", weight)}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out ${
                    filters.weight === weight
                      ? "bg-brand-50 text-brand-500 border-brand-50 border-2 shadow-sm"
                      : "border-brand-200 bg-brand-300 text-brand-600 hover:border-brand-50 hover:bg-brand-50 hover:text-brand-500 border"
                  }`}
                >
                  {weight}
                </button>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <h3 className="text-brand-500 mb-4 text-lg font-semibold">
              Shop By Price
            </h3>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <button
                  key={range.label}
                  onClick={() => handleFilterChange("priceRange", range)}
                  className={`w-full rounded-md px-3 py-2 text-sm font-medium transition-all duration-300 ease-in-out ${
                    filters.priceRange?.label === range.label
                      ? "bg-brand-50 text-brand-500 border-brand-50 border-2 shadow-sm"
                      : "border-brand-200 bg-brand-300 text-brand-600 hover:border-brand-50 hover:bg-brand-50 hover:text-brand-500 border"
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <h3 className="text-brand-500 mb-4 text-lg font-semibold">
              Shop By Brand
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => handleFilterChange("brand", brand)}
                  className={`rounded-md px-3 py-2 text-sm font-medium capitalize transition-all duration-300 ease-in-out ${
                    filters.brand === brand
                      ? "bg-brand-50 text-brand-500 border-brand-50 border-2 shadow-sm"
                      : "border-brand-200 bg-brand-300 text-brand-600 hover:border-brand-50 hover:bg-brand-50 hover:text-brand-500 border"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Advertisement Banner */}
          <div className="border-brand-200 from-brand-50 to-brand-50 relative overflow-hidden rounded-lg border bg-gradient-to-br p-6 text-center">
            <div className="bg-brand-50 absolute -top-2 -right-2 h-16 w-16 rounded-full opacity-20"></div>
            <div className="bg-brand-50 absolute -bottom-2 -left-2 h-12 w-12 rounded-full opacity-20"></div>
            <div className="relative z-10">
              <div className="mb-3">
                <div className="bg-brand-500 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                  <svg
                    className="text-brand-400 h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h4 className="text-brand-500 mb-1 text-sm font-bold">
                Organic Spices
              </h4>
              <p className="text-brand-500 mb-1 text-xl font-bold">50% OFF</p>
              <p className="text-brand-600 text-xs font-medium">ALL PRODUCTS</p>
            </div>
          </div>

          {/* Best Sellers */}
          <div>
            <h3 className="text-brand-500 mb-4 text-lg font-semibold">
              Best Sellers
            </h3>
            <div className="space-y-3">
              <div className="py-4 text-center">
                <div className="bg-brand-200 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                  <svg
                    className="text-brand-100 h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <p className="text-brand-100 text-sm">No products available</p>
              </div>
            </div>
          </div>

          {/* Clear Filters - Only show when filters are active */}
          {hasActiveFilters && (
            <Button
              onClick={() => {
                clearAllFilters();
                setIsMobileFilterOpen(false);
              }}
              variant="secondary"
              borderColor="primary"
              size="small"
              className="w-full"
            >
              Clear All Filters
            </Button>
          )}

          {/* Apply Filters Button */}
          <Button
            onClick={() => setIsMobileFilterOpen(false)}
            variant="primary"
            size="medium"
            className="w-full"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </ModalDrawer>
  );

  return (
    <div className="min-h-screen">
      <SectionWrapper>
        <ContainerWrapper>
          {/* Mobile Filter Button */}

          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Desktop Sidebar */}
            <div className="hidden w-full flex-shrink-0 lg:block lg:w-80">
              <div className="bg-brand-400 border-brand-200 space-y-8">
                {/* Clear All Button - Only show when filters are active */}
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="hover:text-brand-500 w-full text-right transition-all duration-300"
                  >
                    Clear All
                  </button>
                )}
                {/* Category Filter */}
                <div className="">
                  <h3 className="text-brand-700 font-heading before:bg-brand-500 bg-brand-300 relative mb-4 px-4 py-2 text-lg before:absolute before:top-0 before:left-0 before:h-full before:w-1">
                    Category
                  </h3>
                  <div className="space-y-1">
                    {categories.map((category) => (
                      <div
                        key={category.name}
                        className="flex items-center justify-between py-2"
                      >
                        <button
                          onClick={() =>
                            handleFilterChange("category", category.name)
                          }
                          className={`flex-1 text-left text-sm transition-all duration-300 ease-in-out ${
                            filters.category === category.name
                              ? "text-brand-50 font-medium"
                              : "text-brand-600 hover:text-brand-50"
                          }`}
                        >
                          {category.name}
                        </button>
                        {category.hasSub && (
                          <span className="text-brand-100 ml-2 text-sm">+</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weight Filter */}
                <div>
                  <h3 className="text-brand-700 font-heading before:bg-brand-500 bg-brand-300 relative mb-4 px-4 py-2 text-lg before:absolute before:top-0 before:left-0 before:h-full before:w-1">
                    Shop By Weight
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {weights.map((weight) => (
                      <button
                        key={weight}
                        onClick={() => handleFilterChange("weight", weight)}
                        className={`border-brand-200 border px-5 py-2 text-sm transition-all duration-300 ease-in-out ${
                          filters.weight === weight
                            ? "bg-brand-500 border-brand-500 text-white"
                            : "text-brand-600 hover:bg-brand-500 hover:text-white"
                        }`}
                      >
                        {weight}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h3 className="text-brand-700 font-heading before:bg-brand-500 bg-brand-300 relative mb-4 px-4 py-2 text-lg before:absolute before:top-0 before:left-0 before:h-full before:w-1">
                    Shop By Price
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {priceRanges.map((range) => (
                      <button
                        key={range.label}
                        onClick={() => handleFilterChange("priceRange", range)}
                        className={`border-brand-200 border px-5 py-2 text-sm transition-all duration-300 ease-in-out ${
                          filters.priceRange?.label === range.label
                            ? "bg-brand-500 border-brand-500 text-white"
                            : "text-brand-600 hover:bg-brand-500 hover:text-white"
                        }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <h3 className="text-brand-700 font-heading before:bg-brand-500 bg-brand-300 relative mb-4 px-4 py-2 text-lg before:absolute before:top-0 before:left-0 before:h-full before:w-1">
                    Shop By Brand
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {brands.map((brand) => (
                      <button
                        key={brand}
                        onClick={() => handleFilterChange("brand", brand)}
                        className={`border-brand-200 border px-5 py-2 text-sm transition-all duration-300 ease-in-out ${
                          filters.brand === brand
                            ? "bg-brand-500 border-brand-500 text-white"
                            : "text-brand-600 hover:bg-brand-500 hover:text-white"
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Advertisement Banner */}
                <div className="border-brand-200 from-brand-50 to-brand-50 relative overflow-hidden rounded-lg border bg-gradient-to-br p-6 text-center">
                  <div className="bg-brand-50 absolute -top-2 -right-2 h-16 w-16 rounded-full opacity-20"></div>
                  <div className="bg-brand-50 absolute -bottom-2 -left-2 h-12 w-12 rounded-full opacity-20"></div>
                  <div className="relative z-10">
                    <div className="mb-3">
                      <div className="bg-brand-500 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                        <svg
                          className="text-brand-400 h-6 w-6"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                    <h4 className="text-brand-500 mb-1 text-sm font-bold">
                      Organic Spices
                    </h4>
                    <p className="text-brand-500 mb-1 text-xl font-bold">
                      50% OFF
                    </p>
                    <p className="text-brand-600 text-xs font-medium">
                      ALL PRODUCTS
                    </p>
                  </div>
                </div>

                {/* Best Sellers */}
                <div>
                  <h3 className="text-brand-700 font-heading before:bg-brand-500 bg-brand-300 relative mb-4 px-4 py-2 text-lg before:absolute before:top-0 before:left-0 before:h-full before:w-1">
                    Best Sellers
                  </h3>
                  <div className="space-y-3">
                    <div className="py-4 text-center">
                      <div className="bg-brand-200 mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full">
                        <svg
                          className="text-brand-100 h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                      <p className="text-brand-100 text-sm">
                        No products available
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Top Controls */}
              <div className="bg-brand-200 mb-6 p-4">
                <div className="flex flex-wrap gap-4 sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    {/* View Toggle */}
                    <div className="flex items-center">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 transition-all duration-300 ease-in-out ${
                          viewMode === "grid"
                            ? "bg-brand-500 border-brand-500 text-white"
                            : "text-brand-600 hover:bg-brand-500 bg-white hover:text-white"
                        }`}
                      >
                        <TbGridDots className="h-5 w-5 stroke-current" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 transition-all duration-300 ease-in-out ${
                          viewMode === "list"
                            ? "bg-brand-500 border-brand-500 text-white"
                            : "text-brand-600 hover:bg-brand-500 bg-white hover:text-white"
                        }`}
                      >
                        <TbListDetails className="h-5 w-5 stroke-current" />
                      </button>
                    </div>

                    {/* Results Count */}
                    <span className="text-brand-600 text-sm text-nowrap">
                      Showing {startIndex + 1}-
                      {Math.min(
                        startIndex + itemsPerPage,
                        sortedProducts.length,
                      )}{" "}
                      of {sortedProducts.length} products
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    {/* Paginate by */}
                    <div className="flex items-center gap-2">
                      <label className="text-brand-600 text-sm text-nowrap">
                        Paginate by:
                      </label>
                      <Select
                        value={itemsPerPage}
                        onValueChange={(value) => {
                          setItemsPerPage(Number(value));
                          setCurrentPage(1);
                        }}
                        options={[
                          { value: 8, label: "8" },
                          { value: 12, label: "12" },
                          { value: 16, label: "16" },
                          { value: 20, label: "20" },
                        ]}
                        className="w-20"
                      />
                    </div>

                    {/* Sort by */}
                    <div className="flex items-center gap-2">
                      <label className="text-brand-600 text-sm text-nowrap">
                        Sort by:
                      </label>
                      <Select
                        value={sortBy}
                        onValueChange={setSortBy}
                        options={[
                          { value: "featured", label: "Featured" },
                          { value: "price-low", label: "Price: Low to High" },
                          { value: "price-high", label: "Price: High to Low" },
                          { value: "name", label: "Name: A to Z" },
                        ]}
                        className="w-48"
                      />
                    </div>

                    {/* Filter Button */}
                    <div className="lg:hidden">
                      <button
                        onClick={() => setIsMobileFilterOpen(true)}
                        className="text-brand-600 hover:bg-brand-500 flex items-center justify-center gap-2 bg-white px-4 py-2 text-nowrap transition-all duration-300 ease-in-out *:shrink-0 hover:text-white"
                      >
                        <CiFilter className="h-5 w-5" />
                        Filter Products
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Grid/List */}
              <div
                className={`grid gap-8 ${
                  viewMode === "grid"
                    ? "grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"
                    : "grid-cols-1"
                }`}
              >
                {paginatedProducts.map((product) =>
                  viewMode === "grid" ? (
                    <FeaturedProductCard
                      key={product.id}
                      productDetails={{
                        title: product.title,
                        salePrice: product.salePrice,
                        regularPrice: product.regularPrice,
                      }}
                      tag={product.tag}
                      productImage1={product.image1}
                      productImage2={product.image2}
                      maxWidth={false}
                    />
                  ) : (
                    <ProductListCard
                      key={product.id}
                      productDetails={{
                        id: product.id,
                        title: product.title,
                        salePrice: product.salePrice,
                        regularPrice: product.regularPrice,
                        weight: product.weight,
                        category: product.category,
                      }}
                      tag={product.tag}
                      productImage1={product.image1}
                      productImage2={product.image2}
                    />
                  ),
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="border-brand-200 bg-brand-300 text-brand-600 hover:bg-brand-50 hover:text-brand-500 rounded-md border p-2 transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`rounded-md px-3 py-2 text-sm transition-all duration-300 ease-in-out ${
                          currentPage === page
                            ? "bg-brand-50 text-brand-500 border-brand-50 border-2 shadow-sm"
                            : "border-brand-200 bg-brand-300 text-brand-600 hover:bg-brand-50 hover:text-brand-500 border"
                        }`}
                      >
                        {page}
                      </button>
                    ),
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="border-brand-200 bg-brand-300 text-brand-600 hover:bg-brand-50 hover:text-brand-500 rounded-md border p-2 transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        </ContainerWrapper>
      </SectionWrapper>

      {/* Filter Modal Drawer */}
      <FilterDrawer />
    </div>
  );
}

export default ProductListing;

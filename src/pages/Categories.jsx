import {} from "react";
import { useHorizontalDragScroll } from "../hooks/useHorizontalDragScroll";
import { Link, useNavigate } from "react-router";
import ContainerWrapper from "../componenets/common/ContainerWrapper";
import SectionWrapper from "../componenets/common/SectionWrapper";
import FeaturedProductCard from "../componenets/common/FeaturedProductCard";
import Button from "../componenets/common/Button";

function CategorySection({ title, products, onViewAll }) {
  const {
    scrollerRef,
    innerRef,
    isDragging,
    showHint,
    onMouseDown,
    onMouseMove,
    onMouseUp,
    onMouseLeave,
    onScroll,
    onDragStart,
  } = useHorizontalDragScroll({
    idleHintDelayMs: 1500,
    viewportThreshold: 0.8,
  });

  return (
    <div className="space-y-6">
      <div className="mb-2 flex items-center justify-between gap-4">
        <h2 className="font-heading text-brand-600 text-2xl">{title}</h2>
        <Button
          variant="secondary"
          borderColor="primary"
          size="small"
          onClick={onViewAll}
        >
          View All
        </Button>
      </div>
      <div
        className={`scrollbar-hide overflow-x-auto py-4 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        ref={scrollerRef}
        onScroll={onScroll}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        onDragStart={onDragStart}
        onTouchStart={onScroll}
      >
        <div
          ref={innerRef}
          className={`flex gap-6 ${showHint ? "scroll-hint-animate" : ""}`}
        >
          {products.map((p) => (
            <div key={p.id} className="flex-shrink-0">
              <FeaturedProductCard
                productDetails={{
                  title: p.name,
                  salePrice: p.price,
                  regularPrice: p.regularPrice,
                }}
                tag={p.tag}
                productImage1={p.image}
                productImage2={p.image2}
                className={"h-full min-w-[13.8rem] select-none"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const sampleCategoryData = {
  Almonds: Array.from({ length: 10 }).map((_, i) => ({
    id: `almond-${i + 1}`,
    name: `Almond ${i + 1}`,
    price: "$599.00",
    regularPrice: i % 3 === 0 ? "$699.00" : null,
    image:
      "https://images.unsplash.com/photo-1603189802940-00a4f2b1a76f?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1477506350614-fcdc29a3b157?w=300&h=300&fit=crop",
    tag: i % 5 === 0 ? "sale" : null,
  })),
  Cashews: Array.from({ length: 10 }).map((_, i) => ({
    id: `cashew-${i + 1}`,
    name: `Cashew ${i + 1}`,
    price: "$699.00",
    regularPrice: null,
    image:
      "https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
    tag: null,
  })),
  Pistachios: Array.from({ length: 10 }).map((_, i) => ({
    id: `pista-${i + 1}`,
    name: `Pistachio ${i + 1}`,
    price: "$799.00",
    regularPrice: i % 4 === 0 ? "$899.00" : null,
    image:
      "https://images.unsplash.com/photo-1604908554007-0d2e974a4830?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop",
    tag: i % 6 === 0 ? "new" : null,
  })),
  Walnuts: Array.from({ length: 10 }).map((_, i) => ({
    id: `walnut-${i + 1}`,
    name: `Walnut ${i + 1}`,
    price: "$749.00",
    regularPrice: null,
    image:
      "https://images.unsplash.com/photo-1605557615047-9e7354001c14?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?w=300&h=300&fit=crop",
    tag: null,
  })),
  Raisins: Array.from({ length: 10 }).map((_, i) => ({
    id: `raisin-${i + 1}`,
    name: `Raisin ${i + 1}`,
    price: "$299.00",
    regularPrice: null,
    image:
      "https://images.unsplash.com/photo-1602872030023-b0a58a720deb?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1571680322277-0ba1dc952b66?w=300&h=300&fit=crop",
    tag: null,
  })),
  Dates: Array.from({ length: 10 }).map((_, i) => ({
    id: `dates-${i + 1}`,
    name: `Dates ${i + 1}`,
    price: "$399.00",
    regularPrice: null,
    image:
      "https://images.unsplash.com/photo-1569442133152-5d7b42bfd2f8?w=300&h=300&fit=crop",
    image2:
      "https://images.unsplash.com/photo-1606664763354-3b0acf68f70b?w=300&h=300&fit=crop",
    tag: null,
  })),
};

function Categories() {
  const navigate = useNavigate();
  const categories = Object.keys(sampleCategoryData);

  return (
    <main className="min-h-screen bg-white py-8">
      <ContainerWrapper>
        <SectionWrapper>
          <div className="mb-8 flex items-center justify-center">
            <h1 className="font-heading text-brand-500 text-center text-4xl">
              Our Categories
            </h1>
          </div>

          <div className="space-y-12">
            {categories.map((cat) => (
              <CategorySection
                key={cat}
                title={cat}
                products={sampleCategoryData[cat]}
                onViewAll={() =>
                  navigate(`/products?category=${encodeURIComponent(cat)}`)
                }
              />
            ))}
          </div>
        </SectionWrapper>
      </ContainerWrapper>
    </main>
  );
}

export default Categories;

import { useCallback } from "react";
import { Link } from "react-router";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import ContainerWrapper from "../common/ContainerWrapper";
import SectionWrapper from "../common/SectionWrapper";
import {
  PrevButton,
  NextButton,
} from "../carousel/componenets/EmblaCarouselArrowButton";

const posts = [
  {
    title: "The full cardamom",
    author: "Ram M",
    date: "November 13, 2018",
    comments: 2,
    excerpt:
      "Gravida quis blandit turpis cursus in hac. Fames ac turpis egestas integer eget aliquet nibh praesent. Elementum facilisis leo vel fringilla est ul...",
    image:
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Saffron secrets",
    author: "Aisha K",
    date: "July 22, 2019",
    comments: 5,
    excerpt:
      "Egestas congue quisque egestas diam in arcu cursus. Aliquet bibendum enim facilisis gravida neque convallis.",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Roasted almonds guide",
    author: "John D",
    date: "March 02, 2020",
    comments: 8,
    excerpt:
      "Porttitor leo a diam sollicitudin tempor id. Habitant morbi tristique senectus et netus et malesuada.",
    image:
      "https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=1200&auto=format&fit=crop",
  },
];

// Using shared Embla arrow button components for consistent styling

function SectionBlogPost() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { align: "start", loop: true },
    [
      Autoplay({
        delay: 5000,
        playOnInit: true,
        stopOnInteraction: false,
      }),
    ],
  );

  const handlePrev = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const handleNext = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <SectionWrapper>
      <ContainerWrapper>
        <div className="relative mb-20 after:absolute after:-bottom-10 after:left-1/2 after:h-8 after:w-16 after:-translate-x-1/2 after:bg-[url('https://waffy-demo.myshopify.com/cdn/shop/files/heading-img_1.png?v=1621580212')] after:bg-contain after:bg-no-repeat after:content-['']">
          <h2 className="font-heading text-brand-500 mb-2 text-center text-5xl">
            Blog Post
          </h2>
          <p className="text-center">
            Suspendisse potenti nullam ac tortor vitae purus faucibus orn.
          </p>
        </div>

        <div className="relative flex items-center gap-4 md:gap-8">
          <PrevButton
            onClick={handlePrev}
            className="!text-brand-700 hidden md:block"
          />

          <div
            className="embla__viewport relative min-w-0 flex-1 overflow-hidden md:max-w-[68.5rem]"
            ref={emblaRef}
          >
            <div className="embla__container ml-[calc(var(--slide-spacing)*-1)] flex touch-pan-y touch-pinch-zoom">
              {posts.map((post, index) => (
                <div className="embla__slide" key={index}>
                  <div className="grid items-center gap-4 px-1 md:grid-cols-[0.6fr_minmax(0,1fr)] md:gap-10">
                    <div className="h-72 overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="flex flex-col gap-4 p-4">
                      <h3 className="font-heading text-brand-600 text-3xl md:text-4xl">
                        {post.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-black/70">
                        <span className="inline-flex items-center gap-2">
                          <span className="i">By</span> {post.author}
                        </span>
                        <span className="opacity-50">|</span>
                        <span>{post.date}</span>
                        <span className="opacity-50">|</span>
                        <span>{post.comments} Comments</span>
                      </div>
                      <p className="text-black/80">{post.excerpt}</p>
                      <div>
                        <Link
                          to="/blog"
                          className="border-brand-500 text-brand-500 hover:bg-brand-50 hover:text-brand-600 hover:border-brand-50 inline-block rounded-full border-2 px-6 py-3 transition-all duration-300 ease-in-out"
                        >
                          Read more
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <NextButton
            onClick={handleNext}
            className="!text-brand-700 hidden md:block"
          />
        </div>
      </ContainerWrapper>
    </SectionWrapper>
  );
}

export default SectionBlogPost;

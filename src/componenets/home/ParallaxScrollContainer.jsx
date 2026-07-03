import { useEffect, useRef, useState } from "react";

function ParallaxScrollContainer({
  children,
  minHeight = "38rem",
  height = "100%",
  bgImage = "https://waffy-demo.myshopify.com/cdn/shop/files/parallax2.jpg?v=1614285054",
  speedFactor,
}) {
  const sectionRef = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // progress of this section in viewport (0 = top of screen, 1 = bottom of screen)
      const progress = 1 - rect.top / windowHeight;

      // calculate offset relative to section
      const newOffset = progress * speedFactor * 100; // tweak multiplier for effect
      setOffset(newOffset);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once on mount
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speedFactor]);

  return (
    <section
      ref={sectionRef}
      className="flex items-center justify-center bg-cover py-12"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: `center -${offset}px`,
        minHeight,
        height,
      }}
    >
      {children}
    </section>
  );
}

export default ParallaxScrollContainer;

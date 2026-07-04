import { useEffect, useState } from "react";

function ParallaxScrollContainer({
  children,
  minHeight = "38rem",
  height = "100%",
}) {
  const [offset, setOffset] = useState(0);

  const speedFactor = 0.15;

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * speedFactor);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="flex items-center justify-center bg-cover bg-fixed bg-no-repeat py-12"
      style={{
        backgroundImage: `url(https://waffy-demo.myshopify.com/cdn/shop/files/parallax2.jpg?v=1614285054)`,
        backgroundPosition: `center -${offset}px`,
        minHeight: minHeight,
        height: height,
      }}
    >
      {children}
    </div>
  );
}

export default ParallaxScrollContainer;

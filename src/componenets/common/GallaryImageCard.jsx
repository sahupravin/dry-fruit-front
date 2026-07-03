function GallaryImageCard({
  children,
  image = "https://waffy-demo.myshopify.com/cdn/shop/files/category-img1_470x.jpg?v=1614285054",
  className,
  ...props
}) {
  return (
    <div className="group relative h-full w-full overflow-hidden">
      <div className="bg-brand-700/70 absolute inset-0 z-10 w-0 transition-all duration-600 ease-in-out group-hover:w-full"></div>
      <img
        src={image}
        alt=""
        className={`h-full w-full ${className} object-cover object-center`}
        draggable={false}
        {...props}
      />
      {children}
    </div>
  );
}

export default GallaryImageCard;

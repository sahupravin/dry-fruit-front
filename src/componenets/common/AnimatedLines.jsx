const AnimatedLines = () => {
  return (
    <>
      <div className="bg-brand-50 absolute top-0 left-0 z-10 h-1 w-0 transition-all duration-600 ease-out group-hover:w-[calc(100%-0.25rem)]"></div>

      <div className="bg-brand-500 absolute right-0 bottom-0 z-10 h-1 w-0 transition-all duration-600 ease-out group-hover:w-[calc(100%-0.25rem)]"></div>

      <div className="bg-brand-50 absolute top-0 right-0 z-10 h-0 w-1 transition-all duration-600 ease-out group-hover:h-[calc(100%-0.25rem)]"></div>

      <div className="bg-brand-500 absolute bottom-0 left-0 z-10 h-0 w-1 transition-all duration-600 ease-out group-hover:h-[calc(100%-0.25rem)]"></div>
    </>
  );
};

export default AnimatedLines;


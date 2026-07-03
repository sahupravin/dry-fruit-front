function ContainerWrapper({ children, className, style, ...props }) {
  return (
    <div
      className={`mx-auto w-full max-w-7xl px-4 lg:px-6 ${className}`}
      style={style}
      {...props}
    >
      {children}
    </div>
  );
}

export default ContainerWrapper;

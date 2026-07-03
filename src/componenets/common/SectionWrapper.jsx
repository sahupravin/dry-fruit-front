function SectionWrapper({ children, className, style, ...props }) {
  return (
    <section
      style={style}
      className={`py-12 md:py-16 ${className} `}
      {...props}
    >
      {children}
    </section>
  );
}

export default SectionWrapper;

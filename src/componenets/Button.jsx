function Buttom({
  children,
  variant = "primary",
  size = "medium",
  borderColor = "primary",
  textColor = "secondary",
  disabled = false,
}) {
  const styles = {
    base: "cursor-pointer rounded-full border-2 transition-all duration-300 ease-in-out hover:bg-brand-50 hover:border-brand-50 hover:text-brand-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
    variant: {
      primary: "bg-brand-50 border-brand-50  shadow-lg",
      secondary: "bg-transparent  ",
    },
    size: {
      small: "px-4 py-1 text-sm",
      medium: "px-6 py-3 text-base",
      large: "px-8 py-4 text-lg",
    },
    borderColor: {
      primary: "border-brand-50",
      secondary: "border-brand-400",
      white: "border-white",
    },
    textColor: {
      primary: "text-brand-600",
      secondary: "text-brand-400",
      white: "text-white",
    },
  };

  const finalClass = [
    styles.base,
    styles.variant[variant],
    styles.size[size],
    styles.borderColor[borderColor],
    styles.textColor[textColor],
  ].join(" ");

  return (
    <button className={finalClass} disabled={disabled}>
      {children}
    </button>
  );
}

export default Buttom;

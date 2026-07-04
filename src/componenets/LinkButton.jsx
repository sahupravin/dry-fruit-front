import { Link } from "react-router";

function LinkButton({
  children,
  path,
  variant = "primary",
  size = "medium",
  borderColor = "primary",
  textColor = "secondary",
}) {
  const styles = {
    base: "inline-block cursor-pointer rounded-full border-2 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2",
    variant: {
      primary: `
        link:text-brand-600 link:border-brand-50 link:bg-brand-50 link:shadow-md
        visited:text-brand-500 visited:border-brand-50
        hover:bg-brand-100 hover:border-brand-100 hover:text-brand-700 hover:shadow-lg
        active:scale-95 active:bg-brand-200 active:border-brand-200 active:text-brand-800
        focus:ring-brand-200
      `,
      secondary: `
        link:text-brand-400 link:border-brand-400 link:bg-transparent
        visited:text-brand-300 visited:border-brand-400
        hover:bg-brand-50 hover:border-brand-50 hover:text-brand-600 hover:shadow-lg
        active:scale-95 active:bg-brand-100 active:border-brand-100 active:text-brand-700
        focus:ring-brand-200
      `,
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
    <Link to={path} className={finalClass}>
      {children}
    </Link>
  );
}

export default LinkButton;

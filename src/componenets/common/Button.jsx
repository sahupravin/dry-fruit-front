import { forwardRef } from "react";
import { Link, useLocation } from "react-router";

const Button = forwardRef(
  (
    {
      children,
      to, // React Router link
      href, // external link
      variant = "primary",
      size = "medium",
      borderColor = "primary",
      textColor = "black",
      disabled = false,
      onClick,
      className = "",
      activeClass = "ring-2 ring-brand-500", // optional active state
      ...rest
    },
    ref,
  ) => {
    const location = useLocation();

    const styles = {
      base: "cursor-pointer rounded-full border-2 transition-all duration-300 ease-in-out hover:bg-brand-50 hover:border-brand-50 hover:text-brand-600 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed",
      variant: {
        primary: "bg-brand-50 border-brand-50 shadow-lg",
        secondary: "bg-transparent",
        unstyled: "",
      },
      size: {
        small: "px-4 py-2 text-sm",
        medium: "px-6 py-3 text-base",
        large: "px-10 py-4 text-lg",
      },
      borderColor: {
        primary: "border-brand-50",
        secondary: "border-brand-500",
        white: "border-white",
      },
      textColor: {
        primary: "text-brand-50",
        secondary: "text-brand-500",
        white: "text-white",
        black: "text-black",
      },
    };

    const {
      base,
      variant: variants,
      size: sizes,
      borderColor: borders,
      textColor: textColors,
    } = styles;

    const isUnstyled = variant === "unstyled";

    let finalClass = isUnstyled
      ? className
      : [
          base,
          variants[variant],
          sizes[size],
          borders[borderColor],
          textColors[textColor],
          className,
        ].join(" ");

    // Add active class if `to` matches current path
    if (!isUnstyled && to && location.pathname === to) {
      finalClass += ` ${activeClass}`;
    }

    // React Router <Link>
    if (to) {
      return (
        <Link
          ref={ref}
          to={to}
          className={finalClass}
          aria-disabled={disabled}
          role={disabled ? "button" : undefined}
          {...rest}
        >
          {children}
        </Link>
      );
    }

    // External <a>
    if (href) {
      return (
        <a
          ref={ref}
          href={href}
          className={finalClass}
          aria-disabled={disabled}
          role={disabled ? "button" : undefined}
          {...rest}
        >
          {children}
        </a>
      );
    }

    // Default <button>
    return (
      <button
        ref={ref}
        onClick={onClick}
        className={finalClass}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;

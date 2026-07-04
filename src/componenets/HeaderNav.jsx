import { forwardRef, useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  HiMagnifyingGlass,
  HiShoppingCart,
  HiUser,
  HiHeart,
  HiBars3,
  HiXMark,
  HiChevronDown,
} from "react-icons/hi2";
import useClickOutside from "../hooks/useClickOutside";
import { useMediaQuery } from "../hooks/useMediaQuery";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import { useWishlist } from "../features/wishlist/hooks/useWishlist";
import { getLocalStorage } from "../utils/localStorage";

// Navigation links
const navLinks = [
  { to: "/", label: "Home" },
  { to: "/collections/all", label: "Shop" },
  { to: "/collections/dryfruits", label: "DryFruits" },
  { to: "/collections/grocery", label: "Grocery" },
  { to: "/collections/beverages", label: "Beverages" },
];

// Pages dropdown links
const pagesLinks = [
  { to: "/about", label: "About us" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "Faq's" },
  { to: "/pages/contact-us", label: "Contact us" },
];

// Dropdown component for Pages
const PagesDropdown = ({
  isOpen,
  onClose,
  onMouseEnter,
  onMouseLeave,
  closeOnOutside = false,
}) => {
  const dropdownRef = useRef(null);

  // Always call hook; use enabled flag to avoid conditional calls
  useClickOutside(dropdownRef, onClose, closeOnOutside);

  return (
    <div
      ref={dropdownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute top-full left-0 z-50 w-48 border border-gray-200 bg-white shadow-lg transition-all duration-500 ease-out ${
        isOpen
          ? "visible translate-y-0 opacity-100 !duration-1000"
          : "invisible -translate-y-3 opacity-0"
      }`}
    >
      <ul className="py-2">
        {pagesLinks.map(({ to, label }, index) => (
          <li key={to}>
            <NavLink
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `block px-4 py-2 text-sm transition-colors duration-200 ${
                  isActive
                    ? "text-brand-50"
                    : "hover:text-brand-50 text-brand-600"
                }`
              }
            >
              {label}
            </NavLink>
            {index < pagesLinks.length - 1 && (
              <hr className="border-gray-100" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Reusable Nav Icons with handlers
const NavIcons = ({
  onSearch,
  onCart,
  onWishlist,
  onProfile,
  wishlistCount,
  cartCount,
}) => {
  const icons = [
    { IconComponent: HiMagnifyingGlass, handler: onSearch },
    { IconComponent: HiShoppingCart, handler: onCart, badge: cartCount },
    { IconComponent: HiHeart, handler: onWishlist, badge: wishlistCount },
    { IconComponent: HiUser, handler: onProfile },
  ];

  return (
    <div className="text-brand-400 flex items-center gap-4 *:p-2">
      {icons.map((icon, idx) => {
        const Comp = icon.IconComponent;
        const count = Number(icon.badge ?? 0);
        const showBadge = Number.isFinite(count) && count > 0;
        return (
          <button
            key={idx}
            onClick={icon.handler}
            className="hover:text-brand-50 relative cursor-pointer transition-all duration-300 ease-in-out"
          >
            <Comp className="h-6 w-6 text-inherit" />
            {showBadge && (
              <span className="bg-brand-50 text-brand-700 absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium">
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

const HeaderNav = forwardRef(function HeaderNav({ isSticky = true }, ref) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPagesDropdownOpen, setIsPagesDropdownOpen] = useState(false);
  const hoverCloseTimeoutRef = useRef(null);
  const navigate = useNavigate();
  const { openCart, getCartCount } = useCart();
  const { toggleSearch } = useSearch();
  const { getWishlistCount } = useWishlist();
  const isHoverable = useMediaQuery("(hover: hover) and (pointer: fine)");
  const mobilePagesRef = useRef(null);

  // Close menu when clicking outside
  useClickOutside(ref, () => setIsOpen(false));
  // On non-hover devices, close mobile pages dropdown when clicking outside it
  useClickOutside(
    mobilePagesRef,
    () => setIsPagesDropdownOpen(false),
    !isHoverable && isPagesDropdownOpen,
  );

  const baseSticky =
    "bg-grey-400/80 fixed top-0 z-50 w-full gap-4 px-6 py-4 shadow-md backdrop-blur-lg select-none";
  const baseNormal =
    "bg-grey-400 absolute top-25 left-1/2 z-50 w-full max-w-[90%] -translate-x-1/2 gap-4 px-6 py-4 shadow-md select-none xl:max-w-6xl";

  const navClasses = isSticky ? baseSticky : baseNormal;

  useEffect(() => {
    return () => {
      if (hoverCloseTimeoutRef.current)
        clearTimeout(hoverCloseTimeoutRef.current);
    };
  }, []);

  const openPages = () => {
    if (hoverCloseTimeoutRef.current)
      clearTimeout(hoverCloseTimeoutRef.current);
    setIsPagesDropdownOpen(true);
  };

  const scheduleClosePages = () => {
    if (hoverCloseTimeoutRef.current)
      clearTimeout(hoverCloseTimeoutRef.current);
    hoverCloseTimeoutRef.current = setTimeout(() => {
      setIsPagesDropdownOpen(false);
    }, 120);
  };

  const handleProfileClick = () => {
    const token = getLocalStorage("access_token");
    if (token) {
      navigate("/auth/profile");
    } else {
      navigate("/auth/login");
    }
    setIsOpen(false);
  };

  return (
    <nav ref={ref} className={navClasses}>
      {/* Desktop Nav */}
      <div className="mx-auto hidden w-full max-w-6xl items-center justify-between gap-4 md:flex">
        {/* Links */}
        <ul className="flex w-full max-w-lg list-none items-center justify-between text-base">
          {navLinks.map(({ to, label }) => (
            <li className="p-2" key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "text-brand-50"
                    : "text-brand-400 hover:text-brand-50 transition-all duration-300 ease-in-out"
                }
                end
              >
                {label}
              </NavLink>
            </li>
          ))}

          {/* Pages Dropdown */}
          <li
            className="relative p-2"
            onMouseEnter={isHoverable ? openPages : undefined}
            onMouseLeave={isHoverable ? scheduleClosePages : undefined}
          >
            <button
              onClick={() => {
                if (!isHoverable) setIsPagesDropdownOpen((v) => !v);
              }}
              className="text-brand-400 hover:text-brand-50 flex items-center gap-1 transition-all duration-300 ease-in-out"
            >
              Pages
              <HiChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  isPagesDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <PagesDropdown
              isOpen={isPagesDropdownOpen}
              onClose={() => setIsPagesDropdownOpen(false)}
              onMouseEnter={isHoverable ? openPages : undefined}
              onMouseLeave={isHoverable ? scheduleClosePages : undefined}
              closeOnOutside={!isHoverable}
            />
          </li>
        </ul>

        {/* Icons with handlers */}
        <NavIcons
          onSearch={toggleSearch}
          onCart={() => openCart()}
          onWishlist={() => navigate("/pages/wishlist")}
          onProfile={handleProfileClick}
          wishlistCount={getWishlistCount()}
          cartCount={getCartCount()}
        />
      </div>

      {/* Mobile Nav */}
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 md:hidden">
        {/* Toggle Button */}
        <button
          onClick={() => {
            if (isOpen) setIsPagesDropdownOpen(false);
            setIsOpen(!isOpen);
          }}
          className="hover:text-brand-50 flex w-full cursor-pointer items-center gap-2 p-2 text-white transition-all duration-300 ease-in-out"
        >
          {isOpen ? (
            <HiXMark className="h-6 w-6" />
          ) : (
            <HiBars3 className="h-6 w-6" />
          )}
          <span className="hidden sm:inline">Menu</span>
        </button>

        {/* Icons (close menu if clicked) */}
        <NavIcons
          onSearch={() => {
            toggleSearch();
            setIsOpen(false);
          }}
          onCart={() => {
            openCart();
            setIsOpen(false);
          }}
          onWishlist={() => {
            navigate("/pages/wishlist");
            setIsOpen(false);
          }}
          onProfile={handleProfileClick}
          wishlistCount={getWishlistCount()}
          cartCount={getCartCount()}
        />
      </div>

      {/* Mobile Dropdown */}
      <ul
        className={`divide-brand-100/30 flex w-full list-none flex-col items-center justify-between divide-y-2 overflow-hidden text-base transition-all duration-500 ease-in-out md:hidden ${
          isOpen ? "max-h-auto" : "max-h-0"
        }`}
      >
        {navLinks.map(({ to, label }) => (
          <li className="w-full py-3 text-center" key={to}>
            <NavLink
              to={to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? "text-brand-50 block"
                  : "text-brand-400 hover:text-brand-50 block transition-all duration-300 ease-in-out"
              }
              end
            >
              {label}
            </NavLink>
          </li>
        ))}

        {/* Mobile Pages Dropdown */}
        <li className="w-full py-3 text-center" ref={mobilePagesRef}>
          <button
            onClick={() => setIsPagesDropdownOpen(!isPagesDropdownOpen)}
            className={`text-brand-400 hover:text-brand-50 mx-auto flex items-center justify-center gap-1 transition-all duration-300 ease-in-out ${isPagesDropdownOpen ? "mb-2" : ""}`}
          >
            Pages
            <HiChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                isPagesDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Mobile Pages Submenu */}
          <ul
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isPagesDropdownOpen ? "max-h-64" : "max-h-0"
            }`}
          >
            {pagesLinks.map(({ to, label }) => (
              <li key={to} className="border-brand-100 border-b bg-white py-2">
                <NavLink
                  to={to}
                  onClick={() => {
                    setIsOpen(false);
                    setIsPagesDropdownOpen(false);
                  }}
                  className={({ isActive }) =>
                    isActive
                      ? "text-brand-50 block text-sm"
                      : "text-brand-600 hover:text-brand-50 block text-sm transition-all duration-300 ease-in-out"
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </nav>
  );
});

export default HeaderNav;

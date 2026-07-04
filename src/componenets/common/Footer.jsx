import { Link } from "react-router";
import { LogoSmall } from "../Logo";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-600 text-brand-400 border-t border-brand-500/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between md:items-start">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <Link to="/" className="block w-24">
              <LogoSmall />
            </Link>
            <p className="text-brand-100/90 text-center text-sm md:text-left">
              Quality dry fruits and spices.
            </p>
          </div>
          <nav className="flex flex-wrap justify-center gap-6 md:gap-8" aria-label="Footer navigation">
            <Link to="/" className="text-sm text-brand-100/90 transition hover:text-brand-50">
              Home
            </Link>
            <Link to="/products" className="text-sm text-brand-100/90 transition hover:text-brand-50">
              Products
            </Link>
            <Link to="/auth/profile" className="text-sm text-brand-100/90 transition hover:text-brand-50">
              Account
            </Link>
          </nav>
        </div>
        <div className="mt-10 border-t border-brand-500/30 pt-8 text-center text-sm text-brand-100/80">
          &copy; {currentYear} All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;

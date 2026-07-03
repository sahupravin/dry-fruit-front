import { HiSlash } from "react-icons/hi2";
import { Link, useLocation } from "react-router";

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const heading =
    decodeURIComponent(pathnames[0]).slice(0, 1).toUpperCase() +
    decodeURIComponent(pathnames[0]).slice(1);

  return (
    <>
      <h1 className="font-heading text-header mb-4 text-center text-5xl tracking-wider">
        {heading.replace(/-/g, " ")}
      </h1>
      <nav
        className="text-brand-400 flex items-center text-lg"
        aria-label="Breadcrumb"
      >
        <Link
          to="/"
          className="hover:text-brand-50 transition-all duration-300 ease-in-out"
        >
          Home
        </Link>
        {pathnames.map((name, index) => {
          const routeTo = "/" + pathnames.slice(0, index + 1).join("/");
          const isLast = index === pathnames.length - 1;

          if (index === 0) return null;

          return (
            <div key={name} className="flex items-center">
              <HiSlash className="text-brand-400 mx-2" />
              {isLast ? (
                <span className="text-brand-400 capitalize">
                  {decodeURIComponent(name).replace(/-/g, " ")}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="hover:text-brand-50 capitalize transition-all duration-300 ease-in-out"
                >
                  {decodeURIComponent(name).replace(/-/g, " ")}
                </Link>
              )}
            </div>
          );
        })}
      </nav>
    </>
  );
};

export default Breadcrumb;

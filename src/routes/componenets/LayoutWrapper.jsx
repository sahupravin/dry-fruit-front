import ScrollToTop from "../../utils/ScrollToTop";
import Header from "../../componenets/Header";
import Footer from "../../componenets/common/Footer";
import SearchBar from "../../componenets/SearchBar";
import { useLocation } from "react-router";

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <SearchBar />
      {!location.pathname.includes("/auth/") ||
      location.pathname === "/auth/profile" ? (
        <Header />
      ) : null}
      {children}
      {!location.pathname.includes("/auth/") ||
      location.pathname === "/auth/profile" ? (
        <Footer />
      ) : null}
    </>
  );
};

export default LayoutWrapper;

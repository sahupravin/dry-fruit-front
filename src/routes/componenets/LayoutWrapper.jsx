import ScrollToTop from "../../utils/ScrollToTop";
import Header from "../../componenets/common/Header";
import SearchBar from "../../componenets/SearchBar";
import { useLocation } from "react-router";

const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <SearchBar />
      {!location.pathname.includes("/auth/") && <Header />}
      {children}
      {/* <Footer /> */}
    </>
  );
};

export default LayoutWrapper;

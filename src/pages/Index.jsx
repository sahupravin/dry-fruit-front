import Hero from "../componenets/home/Hero";
import Gallary from "../componenets/home/Gallary1";
// import SpecialOffers from "../componenets/home/SpecialOffers";
import SectionBestProducts from "../componenets/home/SectionBestProducts";
// import SectionServiceFeatures from "../componenets/home/SectionServiceFeatures";

function Index() {
  return (
    <main>
      <Hero />
      <SectionBestProducts />
      {/* <SpecialOffers /> */}
      <Gallary />
      {/* <SectionServiceFeatures /> */}
    </main>
  );
}

export default Index;

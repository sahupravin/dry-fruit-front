import Gallary from "../componenets/home/Gallary1";
import SpecialOffers from "../componenets/home/SpecialOffers";
import SectionBestProducts from "../componenets/home/SectionBestProducts";
import SectionOurTeam from "../componenets/home/SectionOurTeam";
import SectionServiceFeatures from "../componenets/home/SectionServiceFeatures";
import SectionBlogPost from "../componenets/home/SectionBlogPost";

function Index() {
  return (
    <main>
      <SectionBestProducts />
      <SpecialOffers />
      <Gallary />
      <SectionOurTeam />
      <SectionServiceFeatures />
      <SectionBlogPost />
    </main>
  );
}

export default Index;

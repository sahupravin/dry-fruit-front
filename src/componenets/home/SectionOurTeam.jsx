import ContainerWrapper from "../common/ContainerWrapper";
import SectionWrapper from "../common/SectionWrapper";
import {
  FaFacebookF,
  FaTwitter,
  FaPinterestP,
  FaYoutube,
} from "react-icons/fa";

const teamMembers = [
  {
    id: 1,
    name: "Ethelyn Hilaire",
    title: "CEO",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Timmy Bard",
    title: "Product Manager",
    img: "https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Willie Hagel",
    title: "Customer support",
    img: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=400&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Soraya Rolston",
    title: "Manager",
    img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400&auto=format&fit=crop",
  },
];

function TeamCard({ member }) {
  return (
    <div className="group border-brand-50 flex flex-col items-center border">
      <div className="bg-brand-50 flex w-full items-center justify-center px-4 py-8">
        <div className="bg-brand-50 group-hover:bg-brand-500 relative mb-6 flex h-44 w-44 items-center justify-center rounded-full p-2 transition-all duration-300 group-hover:scale-105">
          <img
            src={member.img}
            alt={member.name}
            className="group-hover:ring-brand-500 h-full w-full rounded-full object-cover ring-4 ring-transparent transition-all duration-300"
          />
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-4 bg-white px-4 py-8">
        <h3 className="font-heading text-brand-500 text-2xl">{member.name}</h3>
        <p className="mb-2 text-sm">{member.title}</p>
        <div className="flex items-center gap-4 text-lg">
          <a
            href="#"
            aria-label="facebook"
            className="hover:text-brand-500 text-black/60 transition-colors"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            aria-label="twitter"
            className="hover:text-brand-500 text-black/60 transition-colors"
          >
            <FaTwitter />
          </a>

          <a
            href="#"
            aria-label="youtube"
            className="hover:text-brand-500 text-black/60 transition-colors"
          >
            <FaYoutube />
          </a>
        </div>
      </div>
    </div>
  );
}

function SectionOurTeam() {
  return (
    <SectionWrapper>
      <ContainerWrapper>
        <div className="relative mb-16 after:absolute after:-bottom-10 after:left-1/2 after:h-8 after:w-16 after:-translate-x-1/2 after:bg-[url('https://waffy-demo.myshopify.com/cdn/shop/files/heading-img_1.png?v=1621580212')] after:bg-contain after:bg-no-repeat after:content-['']">
          <h2 className="font-heading text-brand-500 mb-2 text-center text-5xl">
            Our Team
          </h2>
          <p className="text-center">
            Lacus vestibulum sed arcu non sit eru racdi odio euismod.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((m) => (
            <TeamCard key={m.id} member={m} />
          ))}
        </div>
      </ContainerWrapper>
    </SectionWrapper>
  );
}

export default SectionOurTeam;

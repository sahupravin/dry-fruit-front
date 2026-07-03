import ContainerWrapper from "../common/ContainerWrapper";
import SectionWrapper from "../common/SectionWrapper";

const features = [
  {
    id: 1,
    title: "Money Back Guarantee",
    description:
      "Consecteur adipisicing elit sed do eiusmod tempor incididunt ullamco et dolore ullamco et dolore dolor sit amet.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-8 w-8 text-white"
      >
        <path d="M12 6V3L8 7l4 4V8c2.757 0 5 2.243 5 5a5.006 5.006 0 0 1-5 5 5.004 5.004 0 0 1-4.582-3H5.392A7.003 7.003 0 0 0 12 20a7 7 0 0 0 0-14Z" />
        <path d="M7 12a5.006 5.006 0 0 1 5-5V4a7 7 0 0 0-6.608 9h2.026A5.004 5.004 0 0 1 12 7v3l4-4-4-4v3a7 7 0 0 0-5 12.124V16A5.006 5.006 0 0 1 7 12Z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Free Shipping",
    description:
      "Sit amet dolor consectetur adipisicing elit sed do eiusmod tempor incididunt ullamco et dolore ullamco et dolore.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-8 w-8 text-white"
      >
        <path d="M3 7a2 2 0 0 1 2-2h8v10H3V7Zm10 2h3.586a2 2 0 0 1 1.414.586L21 12v3h-8V9Zm-8 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 .001 4.001A2 2 0 0 0 17 18Z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "24/7 Customer Service",
    description:
      "Dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ullamco et dolore ullamco et dolore.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-8 w-8 text-white"
      >
        <path d="M12 2a9 9 0 0 0-9 9v3a3 3 0 0 0 3 3h1v-6H5a7 7 0 1 1 7 7v2a9 9 0 0 0 0-18Zm1 5h-2v6h6v-2h-4V7Z" />
      </svg>
    ),
  },
];

function FeatureCard({ feature }) {
  return (
    <div className="relative flex h-full flex-col items-center rounded-xl border border-[var(--color-brand-200)] bg-white px-8 pt-14 pb-10 text-center shadow-sm">
      <div className="bg-brand-500 absolute -top-8 left-1/2 z-10 -translate-x-1/2 rounded-full p-5">
        {feature.icon}
      </div>
      <h3 className="font-heading text-brand-500 mb-3 text-xl md:text-2xl">
        {feature.title}
      </h3>
      <p className="text-sm leading-6 text-black/70">{feature.description}</p>
    </div>
  );
}

function SectionServiceFeatures() {
  return (
    <SectionWrapper className="bg-brand-100">
      <ContainerWrapper>
        <div className="grid grid-cols-1 grid-rows-3 gap-8 lg:grid-cols-3 lg:grid-rows-1">
          {features.map((f) => (
            <div
              key={f.id}
              className="mx-auto my-8 max-w-full md:max-w-[80%] lg:my-0 lg:max-w-none"
            >
              <FeatureCard feature={f} />
            </div>
          ))}
        </div>
      </ContainerWrapper>
    </SectionWrapper>
  );
}

export default SectionServiceFeatures;

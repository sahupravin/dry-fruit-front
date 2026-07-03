import ParallaxScrollContainer from "./ParallaxScrollContainer";
import Button from "../common/Button";

function SpecialOffers() {
  return (
    <ParallaxScrollContainer minHeight="auto" speedFactor={2.2}>
      <div className="text-brand-400 relative z-20 w-full p-8">
        <div className="w-full px-4 py-6">
          <div className="flex w-full flex-col gap-8 md:max-w-[50%]">
            <span className="block text-xl">Healthy Herbs</span>
            <h2 className="font-heading text-brand-50 text-5xl leading-tight tracking-wider">
              Get 10% off <br /> On all Spicy & Herbs
            </h2>
            <p className="mb-8 text-xl">
              Lorem ipsum has become the industry standard for design mockups
              and prototypes. By adding a little bit of Latin to a mockup.
            </p>
            <div className="flex items-center gap-4">
              <Button
                variant="secondary"
                borderColor="primary"
                size="medium"
                textColor="white"
              >
                View more
              </Button>
              <Button
                variant="secondary"
                borderColor="white"
                size="medium"
                textColor="white"
              >
                Shop now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ParallaxScrollContainer>
  );
}

export default SpecialOffers;

import ContainerWrapper from "../componenets/common/ContainerWrapper";
import SectionWrapper from "../componenets/common/SectionWrapper";
import Button from "../componenets/common/Button";

function ComingSoon() {
  return (
    <SectionWrapper className="flex min-h-[60vh] items-center justify-center">
      <ContainerWrapper>
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="font-heading text-brand-500 mb-4 text-5xl">Coming Soon</h1>
          <p className="text-brand-600 mb-8 max-w-md text-lg">
            We're working hard to bring you this page. Stay tuned for updates!
          </p>
          <Button to="/" variant="primary" size="medium">
            Back to Home
          </Button>
        </div>
      </ContainerWrapper>
    </SectionWrapper>
  );
}

export default ComingSoon;


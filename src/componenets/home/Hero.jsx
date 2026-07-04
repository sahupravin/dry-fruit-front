import Button from "../common/Button";
import ContainerWrapper from "../common/ContainerWrapper";
import SectionWrapper from "../common/SectionWrapper";

function Hero() {
  return (
    <SectionWrapper className="relative flex min-h-screen items-center overflow-hidden py-0!">
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1596591606975-97ee5cef3a1e?q=80&w=2042&auto=format&fit=crop"
          alt="Premium Dry Fruits"
          className="h-full w-full object-cover"
        />
        {/* Gradient Overlay for Depth and Text Contrast */}
        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>
      </div>

      <ContainerWrapper className="relative z-10">
        <div className="max-w-3xl">
          <span className="mb-6 inline-block rounded-full bg-brand-50 px-6 py-2 text-sm font-bold tracking-widest text-brand-500 uppercase">
            Premium Selection 2026
          </span>
          <h1 className="font-heading mb-8 text-7xl leading-[1.1] text-white md:text-8xl lg:text-9xl">
            Pure <span className="text-brand-50">Nature</span> <br />
            In Every <span className="text-brand-50">Bite</span>
          </h1>
          <p className="mb-10 max-w-xl text-lg leading-relaxed text-gray-200 md:text-xl">
            Discover our handpicked collection of exotic dry fruits and nuts. 
            Sourced ethically, delivered with love, and packed with nutrition 
            to fuel your healthy lifestyle.
          </p>
          <div className="flex flex-wrap gap-6">
            <Button
              to="/collections/all"
              variant="primary"
              size="large"
              className="group flex items-center gap-3 transition-transform hover:scale-105"
            >
              Shop Collection
              <svg
                className="h-5 w-5 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="No 17 8l8 8-8 8"
                />
              </svg>
            </Button>
            <Button
              to="/pages/contact-us"
              variant="secondary"
              size="large"
              borderColor="white"
              textColor="white"
              className="backdrop-blur-sm transition-all hover:bg-white/10"
            >
              Contact Us
            </Button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/2 -right-20 hidden h-80 w-80 -translate-y-1/2 rounded-full bg-brand-50/10 blur-3xl lg:block"></div>
        <div className="absolute -bottom-20 -left-20 hidden h-60 w-60 rounded-full bg-brand-500/10 blur-3xl lg:block"></div>
      </ContainerWrapper>

      {/* Floating Badges or Features */}
      <div className="absolute bottom-12 left-1/2 hidden -translate-x-1/2 md:block">
        <div className="flex gap-12 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50/20 backdrop-blur-md">
              <span className="text-2xl font-bold text-brand-50">01</span>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider">Organic</p>
              <p className="text-xs text-gray-400">Purely Natural</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50/20 backdrop-blur-md">
              <span className="text-2xl font-bold text-brand-50">02</span>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider">Premium</p>
              <p className="text-xs text-gray-400">Highest Quality</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-50/20 backdrop-blur-md">
              <span className="text-2xl font-bold text-brand-50">03</span>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-wider">Fresh</p>
              <p className="text-xs text-gray-400">Directly Sourced</p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Hero;

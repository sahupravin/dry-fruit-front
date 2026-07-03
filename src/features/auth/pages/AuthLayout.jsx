import ContainerWrapper from "../../../componenets/common/ContainerWrapper";
import Button from "../../../componenets/common/Button";
import { HiArrowLeft, HiShieldCheck, HiSparkles } from "react-icons/hi2";

function AuthLayout({ title, subtitle, children, backTo = "/" }) {
  return (
    <div className="to-brand-200 relative min-h-[85vh] w-full bg-gradient-to-b from-white">
      {/* Background accents */}
      <div className="bg-brand-50/10 pointer-events-none absolute -top-10 right-0 h-52 w-52 rounded-full blur-2xl" />
      <div className="bg-brand-600/5 pointer-events-none absolute bottom-10 left-0 h-64 w-64 rounded-full blur-2xl" />

      <ContainerWrapper className="py-12 md:py-20">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2">
          {/* Visual Side */}
          <div className="order-2 hidden md:order-1 md:flex">
            <div className="relative mx-auto w-full max-w-md">
              {/* Main Card */}
              <div className="border-brand-100 relative overflow-hidden rounded-3xl border bg-white shadow-2xl">
                <img
                  src="/public/sliderImg/hero_slider1.jpg"
                  alt="Taste the best dry fruits"
                  className="h-72 w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                  <h3 className="font-heading text-2xl">Welcome Back</h3>
                  <p className="text-sm opacity-90">
                    Sign in to access exclusive offers and your wishlist.
                  </p>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-3 -left-3 flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-3 py-2 shadow-xl backdrop-blur">
                <HiShieldCheck className="text-brand-50 h-5 w-5" />
                <span className="text-brand-600 text-xs font-medium">
                  Secure Access
                </span>
              </div>
              <div className="absolute top-16 -right-4 flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-3 py-2 shadow-xl backdrop-blur">
                <HiSparkles className="text-brand-50 h-5 w-5" />
                <span className="text-brand-600 text-xs font-medium">
                  Member Rewards
                </span>
              </div>

              {/* Secondary visual */}
              <div className="border-brand-100 absolute right-6 -bottom-6 overflow-hidden rounded-2xl border bg-white shadow-xl">
                <img
                  src="/public/sliderImg/hero_slider2.jpg"
                  alt="Fresh & premium"
                  className="h-24 w-36 object-cover"
                />
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="order-1 md:order-2">
            <div className="mb-6">
              <Button
                to={backTo}
                variant="secondary"
                borderColor="secondary"
                size="small"
                className="inline-flex items-center gap-2"
              >
                <HiArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </div>
            <div className="border-brand-100 rounded-3xl border bg-white/95 p-6 shadow-2xl backdrop-blur md:p-8">
              <h1 className="font-heading text-brand-600 mb-2 text-3xl">
                {title}
              </h1>
              {subtitle && (
                <p className="text-brand-600/80 mb-6 text-sm">{subtitle}</p>
              )}
              {children}
            </div>
          </div>
        </div>
      </ContainerWrapper>
    </div>
  );
}

export default AuthLayout;

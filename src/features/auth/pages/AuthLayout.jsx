import { motion } from "motion/react";
import ContainerWrapper from "../../../componenets/common/ContainerWrapper";
import Button from "../../../componenets/common/Button";
import { HiArrowLeft, HiShieldCheck, HiSparkles } from "react-icons/hi2";

function AuthLayout({
  title,
  subtitle,
  children,
  backTo = "/",
  visualImage = "/sliderImg/hero_slider1.jpg",
  visualTitle = "Nature's Finest Handpicked For You",
  visualDescription = "Join our community to access exclusive deals on the highest quality dry fruits, nuts, and healthy snacks delivered to your doorstep.",
  visualBadgeText = "100% Secure & Premium",
  visualBadgeIcon: VisualBadgeIcon = HiShieldCheck,
  visualLayout = "default", // "default" or "centered"
}) {
  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <div className="bg-brand-300 relative min-h-screen w-full overflow-hidden">
      {/* Background abstract shapes */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="bg-brand-50/20 absolute -top-24 -right-24 h-96 w-96 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="bg-brand-500/10 absolute -bottom-24 -left-24 h-96 w-96 rounded-full blur-3xl"
      />

      <ContainerWrapper className="relative z-10 flex min-h-screen items-center justify-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="border-brand-100 flex w-full max-w-5xl flex-col overflow-hidden rounded-[2.5rem] border bg-white/80 shadow-2xl backdrop-blur-sm lg:flex-row"
        >
          {/* Visual Side - Hidden on mobile */}
          <div className="relative hidden w-full lg:block lg:w-1/2">
            {visualLayout === "default" ? (
              <>
                <div className="from-brand-500/40 to-brand-700/60 absolute inset-0 z-10 bg-gradient-to-br" />
                <img
                  src={visualImage}
                  alt="Premium Dry Fruits"
                  className="h-full w-full object-cover"
                />
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute inset-0 z-20 flex flex-col justify-end p-12 text-white"
                >
                  <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 backdrop-blur-md">
                    <VisualBadgeIcon className="text-brand-50 h-5 w-5" />
                    <span className="text-xs font-medium tracking-wide">
                      {visualBadgeText}
                    </span>
                  </div>
                  <h2 className="font-heading mb-4 text-4xl leading-tight">
                    {visualTitle}
                  </h2>
                  <p className="max-w-md text-sm leading-relaxed opacity-90">
                    {visualDescription}
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-10 w-10 overflow-hidden rounded-full border-2 border-white"
                        >
                          <img
                            src={`https://i.pravatar.cc/100?img=${i + 15}`}
                            alt="User"
                          />
                        </div>
                      ))}
                    </div>
                    <span className="text-sm font-medium">
                      10k+ Happy Customers
                    </span>
                  </div>
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-brand-600 relative flex h-full flex-col items-center justify-center p-12 text-center text-white"
              >
                {/* Subtle pattern overlay */}
                <div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `radial-gradient(var(--color-brand-50) 0.5px, transparent 0.5px)`,
                    backgroundSize: "24px 24px",
                  }}
                />

                <div className="relative mb-10 h-64 w-64">
                  <div className="bg-brand-50 absolute inset-0 animate-pulse rounded-full opacity-20 blur-3xl" />
                  <img
                    src={visualImage}
                    alt="Reset Password"
                    className="relative z-10 h-full w-full rounded-3xl object-cover shadow-2xl"
                  />
                </div>

                <div>
                  <div className="mb-4 flex justify-center">
                    <div className="bg-brand-50/10 flex h-14 w-14 items-center justify-center rounded-2xl backdrop-blur-md">
                      <VisualBadgeIcon className="text-brand-50 h-8 w-8" />
                    </div>
                  </div>
                  <h2 className="font-heading text-brand-50 mb-4 text-3xl leading-tight">
                    {visualTitle}
                  </h2>
                  <p className="mx-auto max-w-sm text-sm leading-relaxed opacity-80">
                    {visualDescription}
                  </p>
                </div>

                <div className="mt-12 flex items-center gap-3 opacity-40">
                  <HiShieldCheck className="h-5 w-5" />
                  <span className="text-xs font-medium tracking-[0.2em] uppercase">
                    End-to-End Encrypted
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Form Side */}
          <div className="relative flex w-full flex-col p-6 md:p-10 lg:w-1/2">
            {/* Header with Back Button & Icon */}
            <div className="mb-8 flex items-center justify-between lg:mb-4">
              <Button
                to={backTo}
                variant="unstyled"
                className="text-brand-600 hover:text-brand-50 flex items-center gap-2 text-sm font-medium transition-colors"
              >
                <HiArrowLeft className="h-4 w-4" />
                Back to home
              </Button>
              <div className="bg-brand-50 h-8 w-8 overflow-hidden rounded-lg p-1.5 shadow-md">
                <HiSparkles className="text-brand-500 h-full w-full" />
              </div>
            </div>

            {/* Centered Form Content */}
            <div className="flex flex-grow flex-col items-center justify-center">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md"
              >
                <motion.div variants={itemVariants} className="mb-6 text-center">
                  <h1 className="font-heading text-brand-600 mb-2 text-3xl md:text-4xl">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="text-brand-600/60 text-sm md:text-base">
                      {subtitle}
                    </p>
                  )}
                </motion.div>

                <motion.div variants={itemVariants}>
                  {children}
                </motion.div>
              </motion.div>
            </div>

            {/* Footer */}
            <div className="border-brand-100/50 mt-8 w-full border-t pt-8">
              <p className="text-brand-600/40 text-center text-xs">
                &copy; {new Date().getFullYear()} DryFruit Premium. All rights
                reserved.
              </p>
            </div>
          </div>
        </motion.div>
      </ContainerWrapper>
    </div>
  );
}

export default AuthLayout;

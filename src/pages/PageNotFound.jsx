import Button from "../componenets/common/Button";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import SectionWrapper from "../componenets/common/SectionWrapper";
import ContainerWrapper from "../componenets/common/ContainerWrapper";

function PageNotFound() {
  return (
    <SectionWrapper>
      <ContainerWrapper className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center text-center">
        <h1 className="font-heading mb-2 flex space-x-2 text-9xl">
          <motion.span
            className="text-brand-500"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            4
          </motion.span>
          <motion.span
            className="text-yellow-600"
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              delay: 0.4,
            }}
          >
            0
          </motion.span>
          <motion.span
            className="text-brand-500"
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: "easeInOut",
              delay: 0.8,
            }}
          >
            4
          </motion.span>
        </h1>
        <h2 className="font-heading mb-6 text-4xl">Page Not Found</h2>
        <p className="mb-8 max-w-lg text-gray-500">
          Oops! The page you are looking for doesn’t exist. Try searching or go
          back to the homepage.
        </p>

        {/* <div className="mb-8 flex w-full max-w-md flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search products..."
          className="flex-grow rounded-lg border px-4 py-2"
        />
        <button className="rounded-lg bg-yellow-600 px-6 py-2 text-white hover:bg-yellow-700">
          Search
        </button>
      </div> */}

        <Button
          to="/"
          variant="primary"
          size="medium"
          textColor="black"
          className="font-semibold"
        >
          Back to Homepage
        </Button>

        {/* <div className="mt-12 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
        <a
          href="/collections/herbs-spices"
          className="rounded-lg border p-4 hover:bg-gray-100"
        >
          Herbs & Spices
        </a>
        <a
          href="/collections/gourmet-foods"
          className="rounded-lg border p-4 hover:bg-gray-100"
        >
          Gourmet Foods
        </a>
        <a
          href="/collections/all-organic"
          className="rounded-lg border p-4 hover:bg-gray-100"
        >
          All Organic Spices
        </a>
        <a
          href="/collections/beverages"
          className="rounded-lg border p-4 hover:bg-gray-100"
        >
          Beverages
        </a>
      </div> */}
      </ContainerWrapper>
    </SectionWrapper>
  );
}

export default PageNotFound;

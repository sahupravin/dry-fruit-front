import ReactDOM from "react-dom";
//eslint-disable-next-line
import { motion, AnimatePresence } from "framer-motion";
import { RxCross2 } from "react-icons/rx";
import { useEffect } from "react";

const slideVariants = {
  left: {
    initial: { x: "-100%" },
    animate: { x: 0 },
    exit: { x: "-100%" },
  },
  right: {
    initial: { x: "100%" },
    animate: { x: 0 },
    exit: { x: "100%" },
  },
};

const ModalDrawer = ({
  isOpen,
  onClose,
  children,
  position = "right",
  isDisabled = false,
}) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && !isDisabled) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, isDisabled, onClose]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex ${position === "right" ? "justify-end" : "justify-start"}`}
        >
          <motion.div
            className={`absolute inset-0 bg-black/50 ${isDisabled ? "cursor-not-allowed" : "cursor-pointer"}`}
            onClick={!isDisabled ? onClose : undefined}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Content wraper */}
          <motion.div
            key="modal"
            initial={slideVariants[position].initial}
            animate={slideVariants[position].animate}
            exit={slideVariants[position].exit}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative h-full w-80 bg-white p-4 shadow-xl"
          >
            <button
              onClick={!isDisabled ? onClose : undefined}
              disabled={isDisabled}
              className="absolute top-3 right-3 cursor-pointer text-gray-500 transition-all duration-300 ease-in-out hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RxCross2 className="size-6 text-inherit" />
            </button>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.getElementById("root"),
  );
};

export default ModalDrawer;

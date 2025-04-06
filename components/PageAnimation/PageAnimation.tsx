"use client"
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


const PageAnimation = ({ children }) => {
  const pathname = usePathname(); // ✅ Corrected to usePathname

  const [displayedChildren, setDisplayedChildren] = useState(children);

  useEffect(() => {
    setDisplayedChildren(children);
  }, [pathname, children]);
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname} 
        initial={{ opacity: 0, y: 0 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="min-h-screen"
      >
        {displayedChildren}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageAnimation;

import { motion } from "framer-motion";
import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const RevealOnScroll: React.FC<Props> = ({ children, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 100, scale: 0.8 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 1, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.2 }}
  >
    {children}
  </motion.div>
);

export default RevealOnScroll;

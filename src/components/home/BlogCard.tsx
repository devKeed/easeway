"use client";

import React from"react";
import { motion } from"framer-motion";

interface BlogCardProps {
 image: string;
 title: string;
 id?: number;
 link?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ image, title, link }) => {
 const handleClick = () => {
 if (link) {
 window.open(link,"_blank");
 }
 };

 return (
 <motion.div
 whileHover={{ scale: 1.05 }}
 transition={{ type:"keyframes", stiffness: 300 }}
 className="relative rounded-xl overflow-hidden cursor-pointer h-[270px] sm:h-[250px] md:h-[420px]"
 onClick={handleClick}
 >
 <img src={image} alt={title} className="w-full h-full object-cover" />
 <div className="absolute inset-0 bg-black bg-opacity-30 hover:bg-opacity-50 transition-all duration-300"></div>
 <div className="absolute bottom-0 left-0 right-0 p-2">
 <p className="text-white p-2 sm:p-4 rounded-md text-left font-semibold text-body font-uber">
 {title}
 </p>
 </div>
 </motion.div>
 );
};

export default BlogCard;

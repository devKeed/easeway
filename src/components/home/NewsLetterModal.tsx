"use client";

import React, { useEffect, useRef } from"react";
import { NewsLetterForm } from"../reusables/NewsLetterForm";

interface NewsletterModalProps {
 isOpen: boolean;
 onClose: () => void;
}

const NewsletterModal: React.FC<NewsletterModalProps> = ({
 isOpen,
 onClose,
}) => {
 const modalRef = useRef<HTMLDivElement>(null);

 useEffect(() => {
 const handleClickOutside = (event: MouseEvent) => {
 if (
 modalRef.current &&
 !modalRef.current.contains(event.target as Node)
 ) {
 onClose();
 }
 };

 if (isOpen) {
 document.addEventListener("mousedown", handleClickOutside);
 }

 return () => {
 document.removeEventListener("mousedown", handleClickOutside);
 };
 }, [isOpen, onClose]);

 return (
 <div
 className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center px-4 transition-opacity duration-300 ${
 isOpen
 ?"opacity-100 pointer-events-auto"
 :"opacity-0 pointer-events-none"
 }`}
 >
 <div
 ref={modalRef}
 className={`bg-[#f9e8dd] w-full max-w-2xl flex flex-col md:flex-row overflow-hidden transform transition-all duration-300 ${
 isOpen ?"scale-100 opacity-100" :"scale-95 opacity-0"
 }`}
 >
 <button
 onClick={onClose}
 className="absolute top-1 right-2 text-gray-500 hover:text-gray-700 text-2xl z-10"
 aria-label="Close newsletter modal"
 >
 &times;
 </button>
 <div className="hidden md:block w-1/2">
 <img
 src="/images/news.png"
 alt="Newsletter"
 className="h-full w-full object-cover"
 />
 </div>

 <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center items-start text-left">
 <NewsLetterForm />
 </div>
 </div>
 </div>
 );
};

export default NewsletterModal;

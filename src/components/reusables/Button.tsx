import { FiArrowUpRight } from"react-icons/fi";
import { FC } from"react";

interface TButtonProps {
 arrow?: boolean;
 text: string;
 link: string;
 color?: string;
 bgColor?: string;
 hoverTextColor?: string;
 hoverBgColor?: string;
 ariaLabel?: string;
}

interface ButtonProps {
 onClick?: () => void;
 className?: string;
 children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({ onClick, className, children }) => {
 return (
 <button onClick={onClick} className={className}>
 {children}
 </button>
 );
};

export const MyFillButton: FC<TButtonProps> = ({
 arrow = true,
 text,
 link,
 color ="white",
 bgColor ="#E6292C",
 hoverTextColor ="white",
 hoverBgColor ="#E6292C",
 ariaLabel,
}) => {
 const isExternal =
 link.startsWith("http") ||
 link.startsWith("mailto:") ||
 link.startsWith("tel:");

 const buttonStyle = {
 color: color,
 backgroundColor: bgColor,
 };

 const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
 e.currentTarget.style.backgroundColor = hoverBgColor;
 e.currentTarget.style.color = hoverTextColor;
 };

 const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
 e.currentTarget.style.backgroundColor = bgColor;
 e.currentTarget.style.color = color;
 };

 const className = `inline-flex items-center gap-2 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl transition-colors duration-300 text-button-sm sm:text-button font-uber`;

 return (
 <a
 href={link}
 target={isExternal ?"_blank" :"_self"}
 rel={isExternal ?"noopener noreferrer" : undefined}
 aria-label={ariaLabel || text}
 className={className}
 style={buttonStyle}
 onMouseEnter={handleMouseEnter}
 onMouseLeave={handleMouseLeave}
 >
 {text}
 {arrow && <FiArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />}
 </a>
 );
};

export const MyOutlinedButton: FC<TButtonProps> = ({
 arrow = true,
 text,
 link,
 color ="#1A1A1A",
 bgColor ="transparent",
 hoverTextColor ="white",
 hoverBgColor ="#1A1A1A",
 ariaLabel,
}) => {
 const isExternal =
 link.startsWith("http") ||
 link.startsWith("mailto:") ||
 link.startsWith("tel:");

 const buttonStyle = {
 color: color,
 backgroundColor: bgColor,
 borderColor: color,
 };

 const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
 e.currentTarget.style.backgroundColor = hoverBgColor;
 e.currentTarget.style.color = hoverTextColor;
 };

 const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
 e.currentTarget.style.backgroundColor = bgColor;
 e.currentTarget.style.color = color;
 };

 const className = `inline-flex items-center gap-2 px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border-2 transition-colors duration-300 text-button-sm sm:text-button font-uber`;

 return (
 <a
 href={link}
 target={isExternal ?"_blank" :"_self"}
 rel={isExternal ?"noopener noreferrer" : undefined}
 aria-label={ariaLabel || text}
 className={className}
 style={buttonStyle}
 onMouseEnter={handleMouseEnter}
 onMouseLeave={handleMouseLeave}
 >
 {text}
 {arrow && <FiArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6" />}
 </a>
 );
};

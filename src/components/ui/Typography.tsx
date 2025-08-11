import React from"react";

interface TypographyProps {
 children: React.ReactNode;
 className?: string;
 as?: keyof JSX.IntrinsicElements;
}

// Utility function to combine class names
const cn = (...classes: (string | undefined)[]) => {
 return classes.filter(Boolean).join("");
};

// Heading Components
export const H1: React.FC<TypographyProps> = ({
 children,
 className,
 as: Component ="h1",
}) => (
 <Component
 className={cn(
">text-h1-mobile md:text-h1-desktop font-axiforma text-gray-900",
 className
 )}
 >
 {children}
 </Component>
);

export const H2: React.FC<TypographyProps> = ({
 children,
 className,
 as: Component ="h2",
}) => (
 <Component
 className={cn(
">text-h2-mobile md:text-h2-desktop font-axiforma text-gray-900",
 className
 )}
 >
 {children}
 </Component>
);

export const H3: React.FC<TypographyProps> = ({
 children,
 className,
 as: Component ="h3",
}) => (
 <Component
 className={cn(
">text-h3-mobile md:text-h3-desktop font-axiforma text-gray-900",
 className
 )}
 >
 {children}
 </Component>
);

export const H4: React.FC<TypographyProps> = ({
 children,
 className,
 as: Component ="h4",
}) => (
 <Component
 className={cn(
">text-h4-mobile md:text-h4-desktop font-axiforma text-gray-900",
 className
 )}
 >
 {children}
 </Component>
);

export const H5: React.FC<TypographyProps> = ({
 children,
 className,
 as: Component ="h5",
}) => (
 <Component
 className={cn(
">text-h5-mobile md:text-h5-desktop font-axiforma text-gray-700",
 className
 )}
 >
 {children}
 </Component>
);

export const H6: React.FC<TypographyProps> = ({
 children,
 className,
 as: Component ="h6",
}) => (
 <Component
 className={cn(
">text-h6-mobile md:text-h6-desktop font-axiforma text-gray-700",
 className
 )}
 >
 {children}
 </Component>
);

// Body Text Components
export const BodyLarge: React.FC<TypographyProps> = ({
 children,
 className,
 as: Component ="p",
}) => (
 <Component className={cn("text-body-lg font-uber text-gray-600", className)}>
 {children}
 </Component>
);

export const Body: React.FC<TypographyProps> = ({
 children,
 className,
 as: Component ="p",
}) => (
 <Component className={cn("text-body font-uber text-gray-600", className)}>
 {children}
 </Component>
);

export const BodySmall: React.FC<TypographyProps> = ({
 children,
 className,
 as: Component ="p",
}) => (
 <Component className={cn("text-body-sm font-uber text-gray-600", className)}>
 {children}
 </Component>
);

export const BodyXSmall: React.FC<TypographyProps> = ({
 children,
 className,
 as: Component ="span",
}) => (
 <Component className={cn("text-body-xs font-uber text-gray-500", className)}>
 {children}
 </Component>
);

// Button Text Components
export const ButtonText: React.FC<TypographyProps> = ({
 children,
 className,
 as: Component ="span",
}) => (
 <Component className={cn("text-button font-uber", className)}>
 {children}
 </Component>
);

export const ButtonTextLarge: React.FC<TypographyProps> = ({
 children,
 className,
 as: Component ="span",
}) => (
 <Component className={cn("text-button-lg font-uber", className)}>
 {children}
 </Component>
);

export const ButtonTextSmall: React.FC<TypographyProps> = ({
 children,
 className,
 as: Component ="span",
}) => (
 <Component className={cn("text-button-sm font-uber", className)}>
 {children}
 </Component>
);

// Utility Classes for custom usage
export const typographyClasses = {
 h1:"text-h1-mobile md:text-h1-desktop font-axiforma text-gray-900",
 h2:"text-h2-mobile md:text-h2-desktop font-axiforma text-gray-900",
 h3:"text-h3-mobile md:text-h3-desktop font-axiforma text-gray-900",
 h4:"text-h4-mobile md:text-h4-desktop font-axiforma text-gray-900",
 h5:"text-h5-mobile md:text-h5-desktop font-axiforma text-gray-700",
 h6:"text-h6-mobile md:text-h6-desktop font-axiforma text-gray-700",
 bodyLarge:"text-body-lg font-uber text-gray-600",
 body:"text-body font-uber text-gray-600",
 bodySmall:"text-body-sm font-uber text-gray-600",
 bodyXSmall:"text-body-xs font-uber text-gray-500",
 buttonLarge:"text-button-lg font-uber",
 button:"text-button font-uber",
 buttonSmall:"text-button-sm font-uber",
};

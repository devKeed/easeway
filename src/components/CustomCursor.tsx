import React, { useEffect, useState, useRef, useCallback } from "react";

interface CursorPosition {
  x: number;
  y: number;
}

const CustomCursor: React.FC = () => {
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });
  const [trailingPosition, setTrailingPosition] = useState<CursorPosition>({
    x: 0,
    y: 0,
  });
  const [cursorVariant, setCursorVariant] = useState<string>("default");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const animationRef = useRef<number>();
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailingRef = useRef<HTMLDivElement>(null);

  // Check if device is desktop
  useEffect(() => {
    const checkDevice = () => {
      const isDesktopDevice =
        window.innerWidth > 768 &&
        !("ontouchstart" in window) &&
        window.matchMedia("(pointer: fine)").matches;
      setIsDesktop(isDesktopDevice);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  // Smooth trailing animation for the ring
  const animateTrailing = useCallback(() => {
    setTrailingPosition((prev) => ({
      x: prev.x + (cursorPosition.x - prev.x) * 0.1,
      y: prev.y + (cursorPosition.y - prev.y) * 0.1,
    }));

    animationRef.current = requestAnimationFrame(animateTrailing);
  }, [cursorPosition]);

  useEffect(() => {
    if (isDesktop) {
      animationRef.current = requestAnimationFrame(animateTrailing);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animateTrailing, isDesktop]);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Handle hover effects for interactive elements
    const handleMouseOverInteractive = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "BUTTON" && target.textContent?.includes("Book")) {
        setCursorVariant("cta");
      } else {
        setCursorVariant("hover");
      }
    };

    const handleMouseOutInteractive = () => {
      setCursorVariant("default");
    };

    // Handle click effect
    const handleMouseDown = () => {
      setCursorVariant("click");
    };

    const handleMouseUp = () => {
      setCursorVariant("default");
    };

    // Add event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, [role='button'], .cursor-pointer"
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseOverInteractive);
      element.addEventListener("mouseleave", handleMouseOutInteractive);
    });

    // Observe for dynamically added elements
    const observer = new MutationObserver(() => {
      const newInteractiveElements = document.querySelectorAll(
        "a, button, input, textarea, select, [role='button'], .cursor-pointer"
      );

      newInteractiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseOverInteractive);
        element.removeEventListener("mouseleave", handleMouseOutInteractive);
        element.addEventListener("mouseenter", handleMouseOverInteractive);
        element.addEventListener("mouseleave", handleMouseOutInteractive);
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      observer.disconnect();

      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseOverInteractive);
        element.removeEventListener("mouseleave", handleMouseOutInteractive);
      });
    };
  }, [isDesktop]);

  if (!isDesktop) {
    return null;
  }

  const getCursorClasses = () => {
    const baseClasses =
      "fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-200 ease-out will-change-transform";

    switch (cursorVariant) {
      case "hover":
        return `${baseClasses} w-12 h-12 bg-[#FF3133] rounded-full opacity-80 scale-150 mix-blend-difference`;
      case "click":
        return `${baseClasses} w-6 h-6 bg-[#FF3133] rounded-full opacity-100 scale-75 mix-blend-difference`;
      case "cta":
        return `${baseClasses} w-16 h-16 bg-gradient-to-br from-[#FF3133] to-[#e62a2c] rounded-full opacity-90 scale-175 shadow-lg shadow-[#FF3133]/30`;
      default:
        return `${baseClasses} w-8 h-8 bg-[#FF3133] rounded-full opacity-70 mix-blend-difference`;
    }
  };

  const getCursorStyle = (): React.CSSProperties => ({
    transform: `translate3d(${cursorPosition.x - 16}px, ${
      cursorPosition.y - 16
    }px, 0)`,
    opacity: isVisible
      ? cursorVariant === "hover"
        ? 0.8
        : cursorVariant === "cta"
        ? 0.9
        : 0.7
      : 0,
  });

  const getTrailingStyle = (): React.CSSProperties => ({
    transform: `translate3d(${trailingPosition.x - 20}px, ${
      trailingPosition.y - 20
    }px, 0)`,
    opacity: isVisible ? 0.3 : 0,
    scale:
      cursorVariant === "hover" ? "1.8" : cursorVariant === "cta" ? "2.2" : "1",
  });

  return (
    <>
      {/* Main cursor dot */}
      <div
        ref={cursorRef}
        className={getCursorClasses()}
        style={getCursorStyle()}
      >
        {cursorVariant === "cta" && (
          <div className="absolute inset-0 rounded-full animate-pulse bg-[#FF3133] opacity-30"></div>
        )}
      </div>

      {/* Trailing cursor ring */}
      <div
        ref={trailingRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-10 h-10 border border-[#FF3133] rounded-full transition-all duration-300 ease-out mix-blend-difference will-change-transform"
        style={getTrailingStyle()}
      />
    </>
  );
};

export default CustomCursor;

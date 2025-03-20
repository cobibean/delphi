"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";

// Define button variants using class-variance-authority
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-lg font-heading transition-all duration-300 relative overflow-hidden",
  {
    variants: {
      variant: {
        primary: "bg-cosmic-combustion text-oracle-white",
        secondary: "border-2 border-oracle-orange text-oracle-orange hover:bg-oracle-orange hover:text-oracle-white",
        outline: "border-2 border-oracle-white/30 text-oracle-white hover:border-oracle-orange",
        ghost: "text-oracle-white hover:text-oracle-orange bg-transparent",
        turquoise: "bg-quantum-entanglement text-oracle-white",
        danger: "bg-gradient-to-r from-oracle-error to-oracle-error-hot text-oracle-white",
      },
      size: {
        sm: "px-3 py-1.5 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        icon: "p-2",
      },
      animation: {
        none: "",
        pulse: "hover:animate-oracle-pulse",
        glitch: "hover:animate-digital-glitch",
        cosmic: "hover:animate-cosmic-flow",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      animation: "none",
      fullWidth: false,
    },
  }
);

// Define the props for the Button component
export interface ButtonProps extends Omit<HTMLMotionProps<"button">, "disabled"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "turquoise" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  animation?: "none" | "pulse" | "glitch" | "cosmic";
  fullWidth?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  loadingText?: string;
  withShine?: boolean;
  className?: string;
}

export const Button = ({
  children,
  variant = "primary",
  size = "md",
  animation = "none",
  fullWidth = false,
  disabled = false,
  leftIcon,
  rightIcon,
  isLoading = false,
  loadingText,
  withShine = false,
  className = "",
  ...props
}: ButtonProps) => {
  // Button animation variants
  const buttonAnimationVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 },
    disabled: { opacity: 0.6 },
  };

  // Loading spinner animation
  const spinnerVariants = {
    animate: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "linear",
      },
    },
  };

  // Shine effect animation
  const shineVariants = {
    initial: { x: "-100%", opacity: 0 },
    hover: {
      x: "100%",
      opacity: 0.5,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <motion.button
      className={`${buttonVariants({ variant, size, animation, fullWidth })} ${className}`}
      variants={buttonAnimationVariants}
      initial="initial"
      whileHover={!disabled && !isLoading ? "hover" : undefined}
      whileTap={!disabled && !isLoading ? "tap" : undefined}
      animate={disabled ? "disabled" : "initial"}
      disabled={disabled || isLoading}
      {...props}
    >
      {withShine && !disabled && !isLoading && (
        <motion.div
          className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 pointer-events-none"
          variants={shineVariants}
          initial="initial"
          whileHover="hover"
        />
      )}

      {isLoading && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            variants={spinnerVariants}
            animate="animate"
            className="w-5 h-5 border-2 border-oracle-white/80 border-t-transparent rounded-full"
          />
          {loadingText && <span className="ml-2 text-sm">{loadingText}</span>}
        </motion.div>
      )}

      {leftIcon && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </motion.button>
  );
};

export default Button; 
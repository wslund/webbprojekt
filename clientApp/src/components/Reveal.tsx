import React from "react";
import { Box } from "@chakra-ui/react";
import type { BoxProps } from "@chakra-ui/react";
import { useScrollReveal } from "../hooks/useScrollReveal";

type Direction = "up" | "left" | "right" | "scale";

interface RevealProps extends BoxProps {
  direction?: Direction;
  delay?: number;
  children: React.ReactNode;
}

const initialStyles: Record<Direction, { opacity: number; transform: string }> = {
  up: { opacity: 0, transform: "translateY(40px)" },
  left: { opacity: 0, transform: "translateX(-40px)" },
  right: { opacity: 0, transform: "translateX(40px)" },
  scale: { opacity: 0, transform: "scale(0.92)" },
};

export const Reveal: React.FC<RevealProps> = ({
  direction = "up",
  delay = 0,
  children,
  ...rest
}) => {
  const ref = useScrollReveal<HTMLDivElement>();
  const initial = initialStyles[direction];

  return (
    <Box
      ref={ref}
      style={initial}
      transition={`all 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`}
      {...rest}
    >
      {children}
    </Box>
  );
};

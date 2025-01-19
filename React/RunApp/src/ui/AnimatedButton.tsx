import * as React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useGlobal } from "@/utils/GlobalProvider";

interface AnimatedStoreButtonProps {
  size?: "sm" | "md" | "lg" | "xl";
}

export default function AnimatedStoreButton({
  size = "lg",
}: AnimatedStoreButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  const { setSearchQuery } = useGlobal();
  let navigate = useNavigate();

  const handleDispatch = () => {
    setSearchQuery("all");
    navigate("/products");
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
  };

  const iconVariants = {
    initial: { y: 0 },
    hover: { y: -3 },
  };

  const sizes = {
    sm: "h-16 w-16 text-xs",
    md: "h-24 w-24 text-sm",
    lg: "h-32 w-32 text-base",
    xl: "h-40 w-40 text-lg",
  };

  const iconSizes = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
    xl: "w-12 h-12",
  };

  return (
    <motion.div
      initial="initial"
      animate={isHovered ? "hover" : "initial"}
      variants={buttonVariants}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <Button
        className={`${sizes[size]} flex flex-col items-center justify-center p-2 rounded-none bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold shadow-lg`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleDispatch}
      >
        <motion.div
          variants={iconVariants}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          className="mb-1"
        >
          <ShoppingBag className={iconSizes[size]} />
        </motion.div>
        <span className="text-center leading-tight">Go to Store</span>
      </Button>
    </motion.div>
  );
}

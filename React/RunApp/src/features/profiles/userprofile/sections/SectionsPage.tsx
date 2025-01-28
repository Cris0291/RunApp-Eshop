import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Users,
  Settings,
  Bell,
  MessageCircle,
  ChevronRight,
  FileChartColumnIncreasing,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

interface AppSection {
  title: string;
  description: string;
  icon: React.ReactNode;
  path: string;
}

const appSections: AppSection[] = [
  {
    title: "Main",
    description: "Go to the main page",
    icon: <FileChartColumnIncreasing className="h-8 w-8 text-pink-500" />,
    path: "/",
  },
  {
    title: "Products",
    description: "Manage your product catalog and inventory",
    icon: <Bell className="h-8 w-8 text-pink-500" />,
    path: "/products",
  },
  {
    title: "Creation Center",
    description: "Create and manage your own products",
    icon: <Users className="h-8 w-8 text-pink-600" />,
    path: "/userprofile/creationcenter",
  },
  {
    title: "Settings",
    description: "Configure your app preferences and system settings",
    icon: <Settings className="h-8 w-8 text-pink-600" />,
    path: "/userprofile",
  },
  {
    title: "Cart",
    description: "Manage the itmes you added to your cart",
    icon: <ShoppingCart className="h-8 w-8 text-pink-500" />,
    path: "/orders/cart",
  },
  {
    title: "Checkout",
    description: "Manage your order ",
    icon: <MessageCircle className="h-8 w-8 text-pink-600" />,
    path: "/orders/checkout",
  },
];

export default function SectionPage({
  onSetActiveLink,
}: {
  onSetActiveLink: (newLink: string) => void;
}) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleActiveRoute = (path: string, link: string) => {
    switch (link) {
      case "Settings":
        onSetActiveLink(link);
        return;
      default:
        navigate(path);
        break;
    }
  };

  return (
    <>
      <h1 className="text-5xl font-extrabold text-center mb-4 text-black">
        App Sections
      </h1>
      <p className="text-xl text-center mb-12 text-gray-600">
        Explore and manage different areas of your application
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {appSections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card
              className="bg-white shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-pink-100 overflow-hidden group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-pink-50 to-white">
                <CardTitle className="text-2xl font-bold text-black group-hover:text-pink-600 transition-colors duration-300">
                  {section.title}
                </CardTitle>
                <div className="p-2 bg-white rounded-full shadow-md group-hover:shadow-lg transition-all duration-300">
                  {section.icon}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-sm text-gray-600 mb-6 h-12 overflow-hidden">
                  {section.description}
                </p>
                <Button
                  className="w-full bg-gradient-to-r from-pink-400 to-pink-600 text-white hover:from-pink-500 hover:to-pink-700 transition-all duration-300 shadow-md hover:shadow-lg group-hover:translate-y-[2px]"
                  onClick={() => handleActiveRoute(section.path, section.title)}
                >
                  Go to {section.title}
                  <ChevronRight
                    className={`ml-2 h-4 w-4 transition-transform duration-300 ${
                      hoveredIndex === index ? "translate-x-1" : ""
                    }`}
                  />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </>
  );
}

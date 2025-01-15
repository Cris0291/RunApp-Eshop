import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function UserInfoErrorCard() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center text-red-500">
          <AlertCircle className="w-6 h-6 mr-2" />
          User Information Error
        </CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-gray-600 mb-4">
            We encountered a problem while fetching your user information. This
            could be due to a network issue or a temporary server problem.
          </p>
        </motion.div>
      </CardContent>
    </Card>
  );
}

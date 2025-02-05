import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function SpinnerCard() {
  return (
    <Card>
      <CardContent
        className="flex items-center justify-center"
        style={{ height: "300px" }}
      >
        <Loader2 className="h-32 w-32 animate-spin text-primary" />
      </CardContent>
    </Card>
  );
}

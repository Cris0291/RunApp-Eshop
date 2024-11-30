import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import { CreditCard } from "lucide-react";

export default function PaymentInfoForm(){
    return <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
    <CardHeader className="bg-gray-50 border-b border-gray-200">
      <CardTitle className="text-xl text-gray-800 flex items-center">
        <CreditCard className="mr-2 text-yellow-500"/> Payment Method
      </CardTitle>
    </CardHeader>
    <form>
    <CardContent className="p-6">
      <div className="space-y-2">
        <Label htmlFor="card-name">Card Name</Label>
        <Input id="card-name" placeholder="John Doe" className="border-gray-300 focus:border-yellow-400"/>
      </div>
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card number">Card Number</Label>
            <Input id="card-number" placeholder="1234 5678 9012 3456" className="border-gray-300 focus:border-yellow-400"/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry-date">Expiry Date</Label>
              <Input id="expiry-date" placeholder="MM/YY" className="border-gray-300 focus:border-yellow-400"/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv" placeholder="123" className="border-gray-300 focus:border-yellow-400"/>
            </div>
          </div>
        </div>
    </CardContent>
    <CardFooter>
    <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold">
      Save Payment Information
    </Button>
  </CardFooter>
    </form>
  </Card>
}
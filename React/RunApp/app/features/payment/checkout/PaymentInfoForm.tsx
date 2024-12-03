import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react"
import { CreditCard } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { PaymentResponse, PaymentSettingsForm } from "./contracts";
import { useAppDispatch, useAppSelector } from "@/app/hooks/reduxHooks";
import { getCurrentOrderId } from "./orderSlice";
import useModifyOrderPaymentMethod from "./useModifyOrderPaymentMethod";
import { addUserCard } from "../../registration/userSlice";

export default function PaymentInfoForm(){
  const dispatch = useAppDispatch();
  const orderId = useAppSelector(getCurrentOrderId);
  const {updateOrderPamentMethod} = useModifyOrderPaymentMethod();
  const [submittedErrors, setSubmittedErrors] = useState<(string | undefined)[]>([]);
  const {register, handleSubmit, formState: {errors}} = useForm<PaymentSettingsForm>({
    defaultValues: {
      cardnumber: "",
      cardname: "",
      expirydate: "",
      cvv: "",
    }
  })
  const router = useRouter();

  const onPaymentInfoSubmit: SubmitHandler<PaymentResponse> = (data) => {
    if(orderId.trim().length === 0) router.push("/userprofile/settings");
    updateOrderPamentMethod({orderId, paymentInfo: data}, {
      onSuccess: (data) => {
        dispatch(addUserCard(data))
      }
    })
  }
  
  const onPaymentInfoError = () => {
    const newErrors: (string | undefined)[] = [];
    const values = Object.values(errors);

    values.forEach(element => {
      newErrors.push(element.message);
    });

    setSubmittedErrors(newErrors);
  }

    return <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
    <CardHeader className="bg-gray-50 border-b border-gray-200">
      <CardTitle className="text-xl text-gray-800 flex items-center">
        <CreditCard className="mr-2 text-yellow-500"/> Payment Method
      </CardTitle>
    </CardHeader>
    <form onSubmit={handleSubmit(onPaymentInfoSubmit, onPaymentInfoError)}>
    <CardContent className="p-6">
      <div className="space-y-2">
        <Label htmlFor="card-name">Card Name</Label>
        <Input id="cardname" 
               placeholder="John Doe"
               type="text"  
               className="border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-black" 
               {...register("cardname", {
                required: "Card name is required"
               })}/>
      </div>
        <div className="mt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="card number">Card Number</Label>
            <Input id="card-number" 
                   placeholder="1234 5678 9012 3456"
                   type="number"  
                   className="border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-black"
                   {...register("cardnumber", {
                    required: "Card number is required"
                   })}/>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry-date">Expiry Date</Label>
              <Input id="expiry-date" 
                     placeholder="MM/YY" 
                     className="border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-black"
                     {...register("expirydate", {
                      required: "Expiry date is required"
                     })}/>
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvv">CVV</Label>
              <Input id="cvv"
                     type="number" 
                     placeholder="123" 
                     className="border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-black"
                     {...register("cvv",{
                      required: "Cvv is required"
                     })}/>
            </div>
          </div>
        </div>
    </CardContent>
    <CardFooter>
      <div className="flex flex-col justify-center items-center w-full">
    {submittedErrors.length > 0 && (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
          <AlertDescription>
              {submittedErrors.map((error, index) => (
                <p key={index}>{error}</p>
                             ))}
          </AlertDescription>
        </Alert>
                       )} 
    <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold mt-3">
      Save Payment Information
    </Button>
    </div>
  </CardFooter>
    </form>
  </Card>
}
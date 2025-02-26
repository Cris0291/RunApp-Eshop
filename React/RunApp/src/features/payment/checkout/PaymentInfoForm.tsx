import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { CreditCard } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PaymentResponse, PaymentSettingsForm } from "./contracts";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { addOrderPayment, getCurrentOrderId } from "./orderSlice";
import useModifyOrderPaymentMethod from "./useModifyOrderPaymentMethod";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import isValidExpirationDate from "@/features/profiles/userprofile/settings/dateValidation";

export default function PaymentInfoForm({
  handlePayment,
}: {
  handlePayment: (change: boolean) => void;
}) {
  const dispatch = useAppDispatch();
  const orderId = useAppSelector(getCurrentOrderId);
  const { updateOrderPamentMethod } = useModifyOrderPaymentMethod();
  const [submittedErrors, setSubmittedErrors] = useState<
    (string | undefined)[]
  >([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentSettingsForm>({
    defaultValues: {
      cardnumber: "",
      cardname: "",
      expirydate: "",
      cvv: "",
    },
  });
  let navigate = useNavigate();

  const onPaymentInfoSubmit: SubmitHandler<PaymentResponse> = (data) => {
    if (orderId.trim().length === 0) {
      toast.error(
        "No order was created. Please add your personal info inthe settings page"
      );
      navigate("/userprofile");
    }
    updateOrderPamentMethod(
      { orderId, paymentInfo: data },
      {
        onSuccess: (data) => {
          toast.success("Order payment information was succesfully updated");
          dispatch(addOrderPayment(data));
          handlePayment(true);
        },
        onError: (error) => {
          toast.error("Something unexpected happened");
          return error;
        },
      }
    );
  };

  const onPaymentInfoError = () => {
    const newErrors: (string | undefined)[] = [];
    const values = Object.values(errors);

    values.forEach((element) => {
      newErrors.push(element.message);
    });

    setSubmittedErrors(newErrors);
  };

  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gray-50 border-b border-gray-200">
        <CardTitle className="text-xl text-gray-800 flex items-center">
          <CreditCard className="mr-2 text-yellow-500" /> Payment Method
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onPaymentInfoSubmit, onPaymentInfoError)}>
        <CardContent className="p-6">
          <div className="space-y-2">
            <Label htmlFor="card-name">Card Name</Label>
            <Input
              id="cardname"
              placeholder="John Doe"
              type="text"
              className="border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-black"
              {...register("cardname", {
                required: "Card name is required",
              })}
            />
          </div>
          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="card number">Card Number</Label>
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                type="number"
                className="border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-black"
                {...register("cardnumber", {
                  required: "Card number is required",
                  pattern: {
                    value: /^(?:\d[ -]*?){13,19}$/,
                    message: "Card number must be between 13 and 19 digits.",
                  },
                })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry-date">Expiry Date</Label>
                <Input
                  id="expiry-date"
                  placeholder="MM/YY or MM/YYYY"
                  className="border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-black"
                  {...register("expirydate", {
                    required: "Expiry date is required",
                    pattern: {
                      value: /^(0[1-9]|1[0-2])\/\d{2}(\d{2})?$/,
                      message:
                        "Expiration date must be in MM/YY or MM/YYYY format.",
                    },
                    validate: (fieldValue) => isValidExpirationDate(fieldValue),
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  type="number"
                  placeholder="123"
                  className="border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-black"
                  {...register("cvv", {
                    required: "Cvv is required",
                    pattern: {
                      value: /^\d{3}$/,
                      message: "Invalid CVV",
                    },
                  })}
                />
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
            <Button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold mt-3"
            >
              Save Payment Information
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

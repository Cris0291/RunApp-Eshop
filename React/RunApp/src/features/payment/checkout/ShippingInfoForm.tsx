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
import { useForm, SubmitHandler } from "react-hook-form";
import { AddressSettingsForm } from "./contracts";
import useModifyOrderAddress from "./useModifyOrderAddress";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { addOrderAddress, getCurrentOrderId } from "./orderSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function ShippingInfoForm({
  handleAddress,
}: {
  handleAddress: (change: boolean) => void;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const orderId = useAppSelector(getCurrentOrderId);
  const [submittedErrors, setSubmittedErrors] = useState<
    (string | undefined)[]
  >([]);
  const { updateOrderAddress } = useModifyOrderAddress();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressSettingsForm>({
    defaultValues: {
      address: "",
      city: "",
      state: "",
      zipcode: "",
      country: "",
    },
  });

  const onAddressInfoSubmit: SubmitHandler<AddressSettingsForm> = (data) => {
    if (orderId.trim().length === 0) {
      toast.error(
        "No order was created. Please add your personal info in the settings page"
      );
      navigate("/userprofile");
    }
    updateOrderAddress(
      { orderId, addressInfo: data },
      {
        onSuccess: (data) => {
          dispatch(addOrderAddress(data));
          handleAddress(true);
        },
      }
    );
  };

  const onAddressInfoError = () => {
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
        <CardTitle className="text-2xl font-bold text-center">
          Shipping Information
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onAddressInfoSubmit, onAddressInfoError)}>
        <CardContent className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="address" className="text-black">
              Address
            </Label>
            <Input
              id="address"
              {...register("address", {
                required: "Address is required",
              })}
              className="border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-black"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-black">
                City
              </Label>
              <Input
                id="city"
                {...register("city", {
                  required: "City is required",
                })}
                className="border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-black"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state" className="text-black">
                State
              </Label>
              <Input
                id="state"
                {...register("state", {
                  required: "State is required",
                })}
                className="border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-black"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="zipCode" className="text-black">
              ZIP Code
            </Label>
            <Input
              id="zipcode"
              {...register("zipcode", {
                required: "Zipcode is required",
                pattern: {
                  value: /^\d{5}(?:[-\s]\d{4})?$/,
                  message: "Zipcode is invalid",
                },
              })}
              className="border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-black"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="country" className="text-black">
              Country
            </Label>
            <Input
              id="country"
              type="text"
              {...register("country", { required: "Country is required" })}
              className="border-yellow-500 focus:ring-yellow-500 focus:border-yellow-500 text-black"
            />
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
              Save Shipping Information
            </Button>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}

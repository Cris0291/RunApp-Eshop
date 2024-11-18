"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CreditCard,
  MapPin,
  User,
  Briefcase,
  Users,
  Calendar,
  Lock,
  Home,
  Globe,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Console } from "console";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

function RegistrationFormSales() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    businessName: "",
    businessType: "",
    employeeCount: "",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    agreeTerms: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, agreeTerms: checked }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          formData.businessName &&
          formData.businessType &&
          formData.employeeCount
        );
      case 2:
        return (
          formData.cardNumber &&
          formData.cardName &&
          formData.expiryDate &&
          formData.cvv
        );
      case 3:
        return (
          formData.address &&
          formData.city &&
          formData.postalCode &&
          formData.country &&
          formData.agreeTerms
        );
      default:
        return false;
    }
  };

  const steps = [
    { name: "Business", icon: Building2 },
    { name: "Payment", icon: CreditCard },
    { name: "Address", icon: MapPin },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 3 && isStepValid()) {
      console.log("test");
    } else {
      nextStep();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 via-white to-yellow-200 p-4">
      <Card className="w-full max-w-2xl shadow-xl bg-white/80 backdrop:blur-sm border border-yellow-200">
        <CardHeader className="bg-yellow-400 text-black rounded-t-lg">
          <CardTitle className="text-2xl">Business Registration</CardTitle>
          <CardDescription className="text-gray-800">
            Complete the form to register your business
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="mb-8">
            <Progress
              value={(step / 3) * 100}
              className="h-2 mb-2 bg-gray-200"
            />
            <div className="flex justify-between">
              {steps.map((s, index) => (
                <div
                  key={s.name}
                  className={`flex flex-col items-center ${
                    index + 1 <= step ? "text-yellow-500" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`rounded-full p-2 ${
                      index + 1 <= step ? "bg-yellow-400" : "bg-gray-200"
                    }`}
                  >
                    <s.icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs mt-1">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="businessName"
                    className="flex items-center text-black"
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    Bussiness Name
                  </Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300 text-black focus:border-yellow-500 bg-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center text-black">
                    <Briefcase className="w-4 h-4 mr-2" /> Bussiness Type
                  </Label>
                  <RadioGroup
                    name="businessType"
                    value={formData.businessType}
                    onValueChange={(value) =>
                      handleSelectChange("businessType", value)
                    }
                    required
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="sole-proprietorship"
                        id="sole-proprietorship"
                        className="border-yellow-500 text-yellow-500"
                      />
                      <Label
                        htmlFor="Sole Proprietorship"
                        className="text-black"
                      >
                        Sole Proprietorship
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="partnership"
                        id="partnership"
                        className="border-yellow-500 text-yellow-500"
                      />
                      <Label htmlFor="partnership" className="text-black">
                        Partnership
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="corporation"
                        id="corporation"
                        className="border-yellow-500 text-yellow-500"
                      />
                      <Label htmlFor="corporation" className="text-black">
                        Corporation
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="employeeCount"
                    className="flex items-center text-black"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Number of Employees
                  </Label>
                  <Select
                    name="employeeCount"
                    value={formData.employeeCount}
                    onValueChange={(value) =>
                      handleSelectChange("employeeCount", value)
                    }
                  >
                    <SelectTrigger className="border-gray-300 text-black focus:border-yellow-500 bg-white/50">
                      <SelectValue placeholder="Select employee count" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10</SelectItem>
                      <SelectItem value="11-50">11-50</SelectItem>
                      <SelectItem value="51-200">51-200</SelectItem>
                      <SelectItem value="201+">201+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="cardNumber"
                    className="flex items-center text-black"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Card Number
                  </Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300 text-black focus:border-yellow-500 bg-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="cardName"
                    className="flex items-center text-black"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Name on Card
                  </Label>
                  <Input
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300 text-black focus:border-yellow-500 bg-white/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="expiryDate"
                      className="flex items-center text-black"
                    >
                      <Calendar className="w-4 h-4 mr-2" />
                      Expiry Dtae
                    </Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 text-black focus:border-yellow-500 bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="cvv"
                      className="flex items-center text-black"
                    >
                      <Lock className="w-4 h-4 mr-2" />
                      CVV
                    </Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 text-black focus:border-yellow-500 bg-white/50"
                    />
                  </div>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="address"
                    className="flex items-center text-black"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    className="border-gray-300 text-black focus:border-yellow-500 bg-white/50"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="city"
                      className="flex items-center text-bla"
                    >
                      <Building2 className="w-4 h-4 mr-2" />
                      City
                    </Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 text-black focus:border-yellow-500 bg-white/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="postalCode"
                      className="flex items-center text-balck"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Postal Code
                    </Label>
                    <Input
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="border-gray-300 text-black focus:border-yellow-500 bg-white/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="country"
                    className="flex items-center text-black"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Country
                  </Label>
                  <Select
                    name="country"
                    value={formData.country}
                    onValueChange={(value) =>
                      handleSelectChange("country", value)
                    }
                  >
                    <SelectTrigger className="border-gray-300 text-black focus:border-yellow-500 bg-white/50">
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="uk">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center space-x-4">
                  <Checkbox
                    id="agreeTerms"
                    checked={formData.agreeTerms}
                    onCheckedChange={handleCheckboxChange}
                    className="border-yellow-500 text-yellow-500"
                  />
                  <Label htmlFor="agreeTerms" className="text-black">
                    I agree to the terms and conditions
                  </Label>
                </div>
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
          )}
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!isStepValid()}
            className="bg-yellow-400 text-black hover:bg-yellow-500"
          >
            {step === 3 ? "Submit" : "Next"}{" "}
            {step < 3 && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default RegistrationFormSales;

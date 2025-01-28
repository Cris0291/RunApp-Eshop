import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Mail,
  MapPin,
  Check,
  Eye,
  EyeOff,
  Lock,
  MapPinHouse,
  CreditCard,
  AlertCircle,
  KeyRound,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AccountSettingsForm,
  AddressSettingsForm,
  PaymentSettingsForm,
  PasswordSettingsForm,
} from "./contracts";
import { useForm, SubmitHandler } from "react-hook-form";
import useGetUserAccountInfo from "./useGetUserAccountInfo";
import useUpdateAccountInfo from "./useUpdateAccountInfo";
import useUpdatePasswordInfo from "./useUpdatePasswordInfo";
import useUpdateOrCreateAddressInfo from "./useUpdateOrCreateAddressInfo";
import { useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "@/hooks/reduxHooks";
import { updateUser } from "@/features/registration/userSlice";
import useUpdateOrCreatePaymentInfo from "./useUpdateOrCreatePaymentInfo";
import toast from "react-hot-toast";
import ProductLoadingCard from "@/ui/ProductLoadingCard";
import UserInfoErrorCard from "@/ui/UserInfoErrorCard";
import Cookies from "js-cookie";

export default function UserSettingsPage() {
  const { userInfo, isLoading, error, isError } = useGetUserAccountInfo();
  const { updateUserAccountInfo, updatingUserAccount } = useUpdateAccountInfo();
  const { updateOrCreateAddress, updatingOrCreatingAddress } =
    useUpdateOrCreateAddressInfo();
  const { updateOrCreatePayment, updatingOrCreatingPayment } =
    useUpdateOrCreatePaymentInfo();
  const { updatePassword, updatingPassword } = useUpdatePasswordInfo();
  const [wasCreated, setWasCreated] = useState(false);
  const [activeTab, setActiveTab] = useState("account");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const queryClient = useQueryClient();
  const [submittedAccountErrors, setSubmittedAccountErrors] = useState<
    (string | undefined)[]
  >([]);
  const [submittedAddressErrors, setSubmittedAddressErrors] = useState<
    (string | undefined)[]
  >([]);
  const [submittedPaymentErrors, setSubmittedPaymentErrors] = useState<
    (string | undefined)[]
  >([]);
  const [submittedPasswordErrors, setSubmittedPasswordErrors] = useState<
    (string | undefined)[]
  >([]);
  const dispatch = useAppDispatch();
  console.log(userInfo);

  useEffect(() => {
    if (userInfo === undefined && isError) {
      toast.error("Something unexpected hapenned. User was not found");
      throw new Error(
        "Something unexpected happened, users could not be found"
      );
    }
  }, [userInfo, isError]);

  const isUpdateOrCreate = (field: string) => {
    if (userInfo === undefined) return null;
    switch (field) {
      case "payment":
        return (
          userInfo.cardnumber &&
          userInfo.cardname &&
          userInfo.cvv &&
          userInfo.expirydate
        );
      case "address":
        return (
          userInfo.address &&
          userInfo.city &&
          userInfo.country &&
          userInfo.state &&
          userInfo.zipcode
        );
    }
  };

  const handleUpdateOrCreation = (field: string) => {
    const result = isUpdateOrCreate(field);
    setWasCreated(result != undefined && result !== null && result.length > 0);
  };

  const {
    register: accountRegister,
    getValues: getAccountValues,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors },
    reset: accountReset,
  } = useForm<AccountSettingsForm>({
    defaultValues: {
      oldemail: userInfo?.email,
      confirmoldemail: "",
      newemail: "",
      confirmnewemail: "",
      username: userInfo?.username,
      name: userInfo?.name,
    },
  });
  const {
    register: passwordRegister,
    getValues: getPasswordValues,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: passwordReset,
  } = useForm<PasswordSettingsForm>({
    defaultValues: {
      oldpassword: "",
      newpassword: "",
      confirmoldpassword: "",
      confirmnewpassword: "",
    },
  });
  const {
    register: addressRegister,
    handleSubmit: handleAddressSubmit,
    formState: { errors: addressErrors },
    reset: addressReset,
  } = useForm<AddressSettingsForm>({
    defaultValues: {
      address:
        userInfo === undefined
          ? ""
          : userInfo.address === null
          ? ""
          : userInfo.address,
      city:
        userInfo === undefined
          ? ""
          : userInfo.city === null
          ? ""
          : userInfo.city,
      state:
        userInfo === undefined
          ? ""
          : userInfo.state === null
          ? ""
          : userInfo.state,
      zipcode:
        userInfo === undefined
          ? ""
          : userInfo.zipcode === null
          ? ""
          : userInfo.zipcode,
      country:
        userInfo === undefined
          ? ""
          : userInfo.country === null
          ? ""
          : userInfo.country,
    },
  });
  const {
    register: paymentRegister,
    handleSubmit: handlePaymentSubmit,
    formState: { errors: paymentErrors },
    reset: paymentReset,
  } = useForm<PaymentSettingsForm>({
    defaultValues: {
      cardnumber:
        userInfo === undefined
          ? ""
          : userInfo.cardnumber === null
          ? ""
          : userInfo.cardnumber,
      cardname:
        userInfo === undefined
          ? ""
          : userInfo.cardname === null
          ? ""
          : userInfo.cardname,
      expirydate:
        userInfo === undefined
          ? ""
          : userInfo.expirydate === null
          ? ""
          : userInfo.expirydate,
      cvv:
        userInfo === undefined ? "" : userInfo.cvv === null ? "" : userInfo.cvv,
    },
  });

  const onAccountSubmit: SubmitHandler<AccountSettingsForm> = (data) => {
    updateUserAccountInfo(data, {
      onSuccess: (data) => {
        toast.success("User account info was updated");
        Cookies.set(
          "Session",
          JSON.stringify({
            name: data.name,
            email: data.email,
            userName: data.nickname,
          })
        );
        dispatch(
          updateUser({
            name: data.name,
            email: data.email,
            userName: data.nickname,
          })
        );
        accountReset();
        queryClient.invalidateQueries({
          queryKey: ["userInfo"],
        });
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };
  const onPasswordSubmit: SubmitHandler<PasswordSettingsForm> = (data) => {
    const mail = userInfo === undefined ? "" : userInfo.email;

    const newPassword = {
      oldpassword: data.oldpassword,
      newpassword: data.newpassword,
      email: mail,
    };
    updatePassword(newPassword, {
      onSuccess: () => passwordReset(),
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const onAddressSubmit: SubmitHandler<AddressSettingsForm> = (data) => {
    updateOrCreateAddress(
      { addressInfo: data, wasCreated },
      {
        onSuccess: (data) => {
          toast.success("User address was updated");
          Cookies.set("Address", JSON.stringify(data));
          addressReset();
          queryClient.invalidateQueries({
            queryKey: ["userInfo"],
          });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const onPaymentSubmit: SubmitHandler<PaymentSettingsForm> = (data) => {
    updateOrCreatePayment(
      { paymentInfo: data, wasCreated },
      {
        onSuccess: (data) => {
          toast.success("User payment info was updated");
          Cookies.set("Payment", JSON.stringify(data));
          paymentReset();
          queryClient.invalidateQueries({
            queryKey: ["userInfo"],
          });
        },
        onError: (error) => {
          toast.error(error.message);
        },
      }
    );
  };

  const onAccountError = () => {
    const newErrors: (string | undefined)[] = [];
    const values = Object.values(accountErrors);

    values.forEach((element) => {
      newErrors.push(element.message);
    });

    setSubmittedAccountErrors(newErrors);
  };

  const onPasswordError = () => {
    const newErrors: (string | undefined)[] = [];
    const values = Object.values(passwordErrors);

    values.forEach((element) => {
      newErrors.push(element.message);
    });

    setSubmittedPasswordErrors(newErrors);
  };

  const onAddressError = () => {
    const newErrors: (string | undefined)[] = [];
    const values = Object.values(addressErrors);

    values.forEach((element) => {
      newErrors.push(element.message);
    });

    setSubmittedAddressErrors(newErrors);
  };

  const onPaymentError = () => {
    const newErrors: (string | undefined)[] = [];
    const values = Object.values(paymentErrors);

    values.forEach((element) => {
      newErrors.push(element.message);
    });

    setSubmittedPaymentErrors(newErrors);
  };

  const tabIcons = {
    account: <User className="w-4 h-4" />,
    password: <KeyRound className="w-4 h-4" />,
    address: <MapPin className="w-4 h-4" />,
    payment: <CreditCard className="w-4 h-4" />,
  };

  return isLoading ? (
    <ProductLoadingCard />
  ) : userInfo !== undefined && !isError ? (
    <>
      <div className="container mx-auto max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center mb-8 text-pink-600"
        >
          User Settings
        </motion.h1>
        <Card className="shadow-lg">
          <CardContent className="p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-4 mb-8">
                {Object.entries(tabIcons).map(([key, icon]) => (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="flex items-center justify-center space-x-2 data-[state=active]:bg-pink-100 data-[state=active]:text-pink-600"
                    onClick={
                      key === "address" || key === "payment"
                        ? () => handleUpdateOrCreation(key)
                        : () => {}
                    }
                  >
                    {icon}
                    <span className="hidden sm:inline">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <form
                    onSubmit={handleAccountSubmit(
                      onAccountSubmit,
                      onAccountError
                    )}
                  >
                    <TabsContent value="account">
                      <CardHeader>
                        <CardTitle>Account Information</CardTitle>
                        <CardDescription>
                          Make changes to your account here.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <div className="relative">
                            <User
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                            <Input
                              id="username"
                              type="text"
                              className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                              {...accountRegister("username", {
                                required: "User name is required",
                              })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <div className="relative">
                            <User
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                            <Input
                              id="name"
                              type="text"
                              className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                              {...accountRegister("name", {
                                required: "Name is required",
                              })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newemail">New Email</Label>
                          <div className="relative">
                            <Mail
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />

                            <Input
                              id="newemail"
                              type="email"
                              className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                              {...accountRegister("newemail", {
                                required: "New email is required",
                                pattern: {
                                  value: /\S+@\S+\.\S+/,
                                  message: "New email is invalid",
                                },
                              })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmnewemail">
                            Confirm New Email
                          </Label>
                          <div className="relative">
                            <Mail
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                            <Input
                              id="confirmnewemail"
                              type="email"
                              className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                              {...accountRegister("confirmnewemail", {
                                required:
                                  "Confirmation of new email is required",
                                validate: (value) =>
                                  value === getAccountValues("newemail") ||
                                  " New email and confirmation of new email do not match",
                              })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="oldemail">Old Email</Label>
                          <div className="relative">
                            <Mail
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />

                            <Input
                              id="oldemail"
                              type="email"
                              className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                              {...accountRegister("oldemail", {
                                required: "Old Email is required",
                                pattern: {
                                  value: /\S+@\S+\.\S+/,
                                  message: "Old Email is invalid",
                                },
                              })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmoldemail">
                            Confirm Old Email
                          </Label>
                          <div className="relative">
                            <Mail
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                            <Input
                              id="confirmoldemail"
                              type="email"
                              className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                              {...accountRegister("confirmoldemail", {
                                required: "Confirmation email is required",
                                validate: (value) =>
                                  value === getAccountValues("oldemail") ||
                                  "Old Email and confirmation of old email do not match",
                              })}
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="grid grid-cols-1 mt-6">
                        {submittedAccountErrors.length > 0 && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              {submittedAccountErrors.map((error, index) => (
                                <p key={index}>{error}</p>
                              ))}
                            </AlertDescription>
                          </Alert>
                        )}
                        <Button
                          type="submit"
                          className="bg-pink-500 hover:bg-pink-600 transition-colors"
                        >
                          Save Changes
                        </Button>
                      </CardFooter>
                    </TabsContent>
                  </form>
                  <form
                    onSubmit={handlePasswordSubmit(
                      onPasswordSubmit,
                      onPasswordError
                    )}
                  >
                    <TabsContent value="password">
                      <CardHeader>
                        <CardTitle>Password Information</CardTitle>
                        <CardDescription>
                          Make changes to your password here.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label
                            htmlFor="oldpassword"
                            className="text-sm font-medium"
                          >
                            Old Password
                          </Label>
                          <div className="relative">
                            <Lock
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                            <Input
                              id="oldpassword"
                              type={showOldPassword ? "text" : "password"}
                              {...passwordRegister("oldpassword", {
                                required: "Old Password is required",
                                min: {
                                  value: 8,
                                  message:
                                    "Old password must be at least 8 characters",
                                },
                              })}
                              className="pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowOldPassword(!showOldPassword)
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showOldPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="confirmpoldassword"
                            className="text-sm font-medium"
                          >
                            Confirm Old Password
                          </Label>
                          <div className="relative">
                            <Lock
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                            <Input
                              id="confirmoldpassword"
                              type={showOldPassword ? "text" : "password"}
                              {...passwordRegister("confirmoldpassword", {
                                required:
                                  "Confirmation of old password is required",
                                validate: (value) =>
                                  value === getPasswordValues("oldpassword") ||
                                  "Old passwords do not match",
                              })}
                              className="pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="newpassword"
                            className="text-sm font-medium"
                          >
                            New Password
                          </Label>
                          <div className="relative">
                            <Lock
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                            <Input
                              id="newpassword"
                              type={showNewPassword ? "text" : "password"}
                              {...passwordRegister("newpassword", {
                                required: "New password is required",
                                min: {
                                  value: 8,
                                  message:
                                    "New password must be at least 8 characters",
                                },
                              })}
                              className="pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showNewPassword ? (
                                <EyeOff size={18} />
                              ) : (
                                <Eye size={18} />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="confirmpnewassword"
                            className="text-sm font-medium"
                          >
                            Confirm New Password
                          </Label>
                          <div className="relative">
                            <Lock
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                            <Input
                              id="confirmnewpassword"
                              type={showNewPassword ? "text" : "password"}
                              {...passwordRegister("confirmnewpassword", {
                                required:
                                  "Confirmation of new password is required",
                                validate: (value) =>
                                  value === getPasswordValues("newpassword") ||
                                  "New passwords do not match",
                              })}
                              className="pl-10 pr-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="grid grid-cols-1 mt-6">
                        {submittedPasswordErrors.length > 0 && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              {submittedPasswordErrors.map((error, index) => (
                                <p key={index}>{error}</p>
                              ))}
                            </AlertDescription>
                          </Alert>
                        )}
                        <Button
                          type="submit"
                          className="bg-pink-500 hover:bg-pink-600 transition-colors"
                        >
                          Save Changes
                        </Button>
                      </CardFooter>
                    </TabsContent>
                  </form>
                  <form
                    onSubmit={handleAddressSubmit(
                      onAddressSubmit,
                      onAddressError
                    )}
                  >
                    <TabsContent value="address">
                      <CardHeader>
                        <CardTitle>Shipping Address</CardTitle>
                        <CardDescription>
                          Update your shipping address.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <div className="relative">
                            <MapPinHouse
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                            <Input
                              id="address"
                              type="text"
                              className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                              {...addressRegister("address", {
                                required: "Address is required",
                              })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <div className="relative">
                              <MapPinHouse
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={18}
                              />
                              <Input
                                id="city"
                                type="text"
                                className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                                {...addressRegister("city", {
                                  required: "City is required",
                                })}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <div className="relative">
                              <MapPinHouse
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={18}
                              />
                              <Input
                                id="state"
                                type="text"
                                className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                                {...addressRegister("state", {
                                  required: "State is required",
                                })}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            <div className="relative">
                              <MapPinHouse
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={18}
                              />
                              <Input
                                id="country"
                                type="text"
                                className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                                {...addressRegister("country", {
                                  required: "Country is required",
                                })}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zipcode">ZIP Code</Label>
                          <div className="relative">
                            <MapPinHouse
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                            <Input
                              id="zipcode"
                              type="number"
                              className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                              {...addressRegister("zipcode", {
                                required: "Zipcode is required",
                                pattern: {
                                  value: /^\d{5}(?:[-\s]\d{4})?$/,
                                  message: "Zipcode is invalid",
                                },
                              })}
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="grid grid-cols-1 mt-6">
                        {submittedAddressErrors.length > 0 && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              {submittedAddressErrors.map((error, index) => (
                                <p key={index}>{error}</p>
                              ))}
                            </AlertDescription>
                          </Alert>
                        )}
                        <Button
                          type="submit"
                          className="bg-pink-500 hover:bg-pink-600 transition-colors"
                        >
                          Save Changes
                        </Button>
                      </CardFooter>
                    </TabsContent>
                  </form>
                  <form
                    onSubmit={handlePaymentSubmit(
                      onPaymentSubmit,
                      onPaymentError
                    )}
                  >
                    <TabsContent value="payment">
                      <CardHeader>
                        <CardTitle>Payment Method</CardTitle>
                        <CardDescription>
                          Update your payment information.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Card Name</Label>
                          <div className="relative">
                            <CreditCard
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                            <Input
                              id="cardName"
                              type="text"
                              className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                              {...paymentRegister("cardname", {
                                required: "Card name is required",
                              })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <div className="relative">
                            <CreditCard
                              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                              size={18}
                            />
                            <Input
                              id="cardNumber"
                              type="number"
                              className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                              {...paymentRegister("cardnumber", {
                                required: "Card number is required",
                                pattern: {
                                  value: /^(?:\d[ -]*?){13,16}$/,
                                  message: "Card number is invalid",
                                },
                              })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryDate">Expiry Date</Label>
                            <div className="relative">
                              <CreditCard
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={18}
                              />
                              <Input
                                id="expiryDate"
                                type="text"
                                className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                                {...paymentRegister("expirydate", {
                                  required: "Expiry date is required",
                                })}
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV</Label>
                            <div className="relative">
                              <CreditCard
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                                size={18}
                              />
                              <Input
                                id="cvv"
                                typeof="number"
                                type="password"
                                className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-blue-500"
                                {...paymentRegister("cvv", {
                                  required: "Cvv is required",
                                  pattern: {
                                    value: /^[0-9]{3,4}$/,
                                    message: "Cvv is inva;id",
                                  },
                                })}
                              />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="grid grid-cols-1 mt-6">
                        {submittedPaymentErrors.length > 0 && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              {submittedPaymentErrors.map((error, index) => (
                                <p key={index}>{error}</p>
                              ))}
                            </AlertDescription>
                          </Alert>
                        )}
                        <Button
                          type="submit"
                          className="bg-pink-500 hover:bg-pink-600 transition-colors"
                        >
                          Save Changes
                        </Button>
                      </CardFooter>
                    </TabsContent>
                  </form>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </>
  ) : (
    <UserInfoErrorCard />
  );
}

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { ProductCreationDto, ProductResponseDto } from "./contracts";
import useCreateProductCommand from "./useCreateProductCommand";
import StatusPopup from "@/ui/SatusPopup";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import Spinner from "@/ui/Spinner";

const CATEGORIES = [
  "Equipment",
  "Apparel",
  "Nutrition",
  "Cardio",
  "Wellness",
  "Supplements",
  "Yoga",
  "HIIT",
  "Weight Loss",
  "Group Fitness",
];

export default function CreationForm({
  onHandleAddAnImage,
  onHandleAddLink,
}: {
  onHandleAddAnImage: (product: ProductResponseDto) => void;
  onHandleAddLink: (link: string) => void;
}) {
  const { ProductsCraetionFunction, isCreating, isError, isSuccess, isIdle } =
    useCreateProductCommand();
  const [hasPromotion, setHasPromotion] = useState(false);
  const [submittedErrors, setSubmittedErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<ProductCreationDto>({
    name: "",
    description: "",
    price: 0,
    bulletPoints: [""],
    priceWithDiscount: undefined,
    promotionalText: undefined,
    categories: [],
    brand: "",
    color: "",
    weight: 0,
    type: "",
  });
  console.log(`idle ${isIdle} isError ${isError} isSuccess ${isSuccess}`);
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateFormData();

    if (errors.length === 0) {
      ProductsCraetionFunction(formData, {
        onSuccess: (data) => {
          toast.success("product was created");
          onHandleAddAnImage(data);
          setFormData({
            name: "",
            description: "",
            price: 0,
            bulletPoints: [""],
            priceWithDiscount: undefined,
            promotionalText: undefined,
            categories: [],
            brand: "",
            color: "",
            weight: 0,
            type: "",
          });
        },
        onError: (error) => {
          const axiosError = error as AxiosError;
          console.log(axiosError);
          const dataResponse: any = axiosError.response?.data;
          toast.error(
            `${
              axiosError.response !== undefined
                ? dataResponse.detail
                : axiosError.message
            }`
          );
          return error;
        },
      });
    }
  };

  const validateFormData = () => {
    const newErrors: string[] = [];
    const keys = Object.keys(formData);

    keys.forEach((key) => {
      switch (key) {
        case "name":
          if (formData.name.trim().length === 0)
            newErrors.push("Product name cannot be empty");
          break;
        case "description":
          if (formData.description.trim().length === 0)
            newErrors.push("Product description cannot be empty");
          break;
        case "bulletPoints":
          if (
            formData.bulletPoints.length === 0 ||
            !isCollectionValid(formData.bulletPoints)
          )
            newErrors.push("Bulletpoints cannot be empty");
          break;
        case "price":
          if (formData.price <= 0)
            newErrors.push("Product price must be greater than zero");
          break;
        case "priceWithDiscount":
          if (hasPromotion) {
            if (
              formData.priceWithDiscount === undefined ||
              formData.priceWithDiscount <= 0
            )
              newErrors.push("Price with discount must be greater than zero");
          }
          break;
        case "promotionalText":
          if (hasPromotion) {
            if (
              formData.promotionalText === undefined ||
              formData.promotionalText.trim().length === 0
            )
              newErrors.push("Promotional text cannot be empty");
          }
          break;
        case "categories":
          if (
            formData.categories.length === 0 ||
            !isCollectionValid(formData.categories)
          )
            newErrors.push("Categories cannot be empty");
          break;
        case "brand":
          if (formData.brand.trim().length === 0)
            newErrors.push("Product brand cannot be empty");
          break;
        case "color":
          if (formData.color.trim().length === 0)
            newErrors.push("Product color cannot be empty");
          break;
        case "weight":
          if (formData.weight <= 0)
            newErrors.push("Product weight must be greater than zero");
          break;
        case "type":
          if (formData.type.trim().length === 0)
            newErrors.push("Product type cannot be empty");
          break;
      }
    });

    setSubmittedErrors(newErrors);
    return newErrors;
  };

  useEffect(() => {
    if (!hasPromotion)
      setFormData((prev) => ({
        ...prev,
        priceWithDiscount: undefined,
        promotionalText: undefined,
      }));
  }, [hasPromotion]);

  const isCollectionValid = (points: string[]) => {
    let isValid = true;
    for (let i = 0; i < points.length; i++) {
      if (points[i].trim().length === 0) {
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (name: string, category: string) => {
    let newCategories: string[] = [];

    setFormData((prev) => {
      newCategories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];

      return { ...prev, [name]: newCategories };
    });
  };

  const updateBulletPoint = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    let newBulletPoints: string[] = [];

    setFormData((prev) => {
      newBulletPoints = [...prev.bulletPoints];
      newBulletPoints[index] = value;

      return { ...prev, [name]: newBulletPoints };
    });
  };

  const addBulletPoint = () => {
    setFormData((prev) => ({
      ...prev,
      bulletPoints: [...prev.bulletPoints, ""],
    }));
  };

  const removeBulletPoint = (index: number) => {
    let newBulletPoints: string[] = [];
    setFormData((prev) => {
      newBulletPoints = prev.bulletPoints.filter((_, i) => i !== index);

      return { ...prev, bulletPoints: newBulletPoints };
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-white min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <Card className="border-black border-2 bg-white text-black shadow-xl">
          <CardHeader className="bg-black text-white">
            <CardTitle className="text-2xl sm:text-3xl font-bold text-center">
              Create New Product
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 mt-4 sm:mt-6">
            <form
              onSubmit={handleProductSubmit}
              className="space-y-4 sm:space-y-6"
            >
              <div className="space-y-2">
                <Label
                  htmlFor="productName"
                  className="text-black font-semibold"
                >
                  Product Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Enter product name"
                  className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="text-black font-semibold"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleTextChange}
                  placeholder="Enter product description"
                  className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price" className="text-black font-semibold">
                  Price
                </Label>
                <div className="relative">
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black pl-6"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    $
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasPromotion"
                  checked={hasPromotion}
                  onCheckedChange={(checked) =>
                    setHasPromotion(checked as boolean)
                  }
                />
                <Label
                  htmlFor="hasPromotion"
                  className="text-black font-semibold"
                >
                  This product has a promotion
                </Label>
              </div>
              {hasPromotion && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="discountedPrice"
                      className="text-black font-semibold"
                    >
                      Discounted Price
                    </Label>
                    <div className="relative">
                      <Input
                        id="priceWithDiscount"
                        type="number"
                        name="priceWithDiscount"
                        value={formData.priceWithDiscount}
                        onChange={handleInputChange}
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black pl-6"
                      />
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                        $
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="promotionalText"
                      className="text-black font-semibold"
                    >
                      Promotional Text
                    </Label>
                    <Input
                      id="promotionalText"
                      type="text"
                      name="promotionalText"
                      value={formData.promotionalText}
                      onChange={handleInputChange}
                      placeholder="Enter promotional text"
                      className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black"
                    />
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Label className="text-black font-semibold">Categories</Label>
                <Select
                  name="categories"
                  onValueChange={(value) =>
                    handleCategoryChange("categories", value)
                  }
                >
                  <SelectTrigger className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black">
                    <SelectValue placeholder="Select categories" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.categories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="bg-yellow-100 text-yellow-800"
                    >
                      {category}
                      <button
                        onClick={() =>
                          handleCategoryChange("categories", category)
                        }
                        className="ml-1 text-yellow-800 hover:text-yellow-900"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="brand" className="text-black font-semibold">
                    Brand
                  </Label>
                  <Input
                    id="brand"
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    placeholder="Enter brand"
                    className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-black font-semibold">
                    Type
                  </Label>
                  <Input
                    id="type"
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    placeholder="Enter type"
                    className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color" className="text-black font-semibold">
                    Color
                  </Label>
                  <Input
                    id="color"
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    placeholder="Enter color"
                    className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight" className="text-black font-semibold">
                    Weight
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    placeholder="Enter weight"
                    className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-black font-semibold">
                  Bullet Points
                </Label>
                {formData.bulletPoints.map((point, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      id="bulletPoints"
                      type="text"
                      name="bulletPoints"
                      value={point}
                      onChange={(e) => updateBulletPoint(e, index)}
                      placeholder="Enter bullet point"
                      className="border-black focus:ring-yellow-500 focus:border-yellow-500 bg-white text-black"
                    />
                    <Button
                      type="button"
                      onClick={() => removeBulletPoint(index)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addBulletPoint}
                  className="mt-2 bg-green-500 hover:bg-green-600 text-white"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Bullet Point
                </Button>
              </div>
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
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black text-lg font-semibold py-4 sm:py-6 transition-all duration-300 transform hover:scale-105"
                disabled={isCreating}
              >
                {isCreating ? <Spinner /> : "Create Product"}
              </Button>
            </form>
            {isSuccess && !isError && !isIdle ? (
              <StatusPopup
                status="success"
                message="Your product has been successfully loaded!"
                actionLabel="Add an image"
                onAction={(link: string) => onHandleAddLink(link)}
              />
            ) : (
              ""
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

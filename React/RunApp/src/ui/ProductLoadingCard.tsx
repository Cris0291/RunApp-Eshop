import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ProductLoadingCard() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-gray-800">Loading Product</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center p-6">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-center text-gray-600">Please wait while we fetch the product details...</p>
        </CardContent>
      </Card>
    </div>
  )
}
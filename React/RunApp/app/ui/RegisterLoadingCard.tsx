import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RegisterLoadingCard() {
  return (
    <div className="md:w-1/2 flex items-center justify-center p-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-gray-800">Registering User</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center p-6">
          <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-center text-gray-600">Please wait while we register the user...</p>
        </CardContent>
      </Card>
    </div>
  )
}
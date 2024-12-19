import { ShoppingCart, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface EmptyCartCardProps {
  onGoToStore: () => void
}

export default function EmptyCartCard({ onGoToStore }: EmptyCartCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Your Cart is Empty</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <ShoppingCart className="w-24 h-24 text-gray-400 mb-4" />
        <p className="text-center text-gray-600">
          Looks like you haven't added any items to your cart yet.
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onGoToStore} 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          Go to Store
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  )
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PackageSearch, RefreshCw } from 'lucide-react'

interface NoProductsFoundProps {
  onRefresh?: () => void
}

export default function NoProductsFound({ onRefresh }: NoProductsFoundProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-gray-800">No Products Found</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <PackageSearch className="w-24 h-24 text-gray-400 mb-4" />
        <p className="text-center text-gray-600 mb-6">
          We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
        </p>
        {onRefresh && (
          <Button 
            onClick={onRefresh}
            className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 text-white"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Results
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
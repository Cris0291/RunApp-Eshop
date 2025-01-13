
import { GetProductsAction } from "@/_lib/actions";
import { Input } from "@/components/ui/input";
import { Search, ShoppingCart } from "lucide-react";
import Link from "next/link";


interface Props {
   isRegisterd : boolean
}

export function HeaderBody({isRegisterd}: {isRegisterd: boolean}) {
 
    if(!isRegisterd){
        return (
        <div className="flex items-center space-x-4">
          <nav className="md:flex space-x-4">
          <Link className="border-green-500 text-green-500 hover:bg-green-50" href = "/login">
            Login
          </Link>
          <Link className="bg-green-500 text-white hover:bg-green-600" href = "/register">
            Register
          </Link>
          </nav>
        </div>
        )
    } 


    
    return ( 
    <>
    <div className="flex-1 max-w-xl mx-4">
    <div className="relative">
      <form action={GetProductsAction}>
      <Input
        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-black"
        placeholder="Search for products..."
        type="search"
        name="search"
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      </form>
    </div>
  </div>
  <div className="flex items-center space-x-2">
    <nav className="hidden md:flex space-x-6">
      <Link
        className="text-sm font-medium hover:text-green-600 transition-colors"
        href = "/userprofile"
        
      >
        User
      </Link>
      <Link
        className="text-sm font-medium hover:text-green-600 transition-colors"
        href = "/userprofile/creationcenter"
        
      >
        Creation Center
      </Link>
    </nav>
    <Link href = "/orders/cart">
      <ShoppingCart className="h-5 w-5 text-green-500" />
      <span className="sr-only">Cart</span>
    </Link>
  </div>
  </>
  )
}
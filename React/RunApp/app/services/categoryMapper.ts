interface Dictionary<T>{
    [key: string]: T
}

const categoriesToClasses: Dictionary<string> = {
    "yoga": "bg-green-100 text-green-800",
    "swimming": "bg-blue-100 text-blue-800",
    "running": "bg-yellow-100 text-yellow-800"
}

export default function MapCategories(category: string): string {
    const categoryLowercased = category.toLowerCase();

    if(categoryLowercased in categoriesToClasses) return categoriesToClasses[categoryLowercased];
    return "bg-red-100 text-red-800"
}
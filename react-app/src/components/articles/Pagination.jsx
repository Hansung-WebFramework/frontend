import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination() {
    return (
        <div className="flex items-center justify-center gap-2 mt-8">
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-blue-600 text-white">1</button>
            <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">2</button>
            <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200">3</button>
            <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
                <ChevronRight className="h-5 w-5" />
            </button>
        </div>
    )
}

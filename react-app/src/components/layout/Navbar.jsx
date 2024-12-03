import { useState } from "react";
import { Search, Menu, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleNavigation = (path) => {
    setLoading(true); // 로딩 시작
    setTimeout(() => {
      navigate(path);
      setLoading(false); // 로딩 종료
    }, 1500);
  };

  return (
    <>
      {loading && <Loader />}
      <nav className="sticky top-0 z-50 w-full bg-[#0A192F] text-white shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Menu className="h-6 w-6" />
              <h1 className="text-2xl font-bold">
                <button
                  onClick={() => handleNavigation("/")}
                  className="text-white hover:text-blue-300"
                >
                  Newsy
                </button>
              </h1>
            </div>

            <div className="flex-1 max-w-2xl mx-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-full px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Search
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50 cursor-pointer"
                  onClick={handleSearch}
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <button
                onClick={() => handleNavigation("/BookmarkPage")}
                className="text-white hover:text-blue-300"
              >
                Bookmark
              </button>
              <button
                onClick={() => handleNavigation("/IdentifiedArticlesPage")}
                className="text-white hover:text-blue-300"
              >
                Articles
              </button>
              <Bell className="h-6 w-6" />
              <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-300">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuWgg1mjdrrer5asSh0TiJKDkdg40UEHc3uw&s?height=40&width=40"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

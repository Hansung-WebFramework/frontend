import PropTypes from "prop-types";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const Bookmark = ({ isBookmarked, onToggle }) => (
  <button
    className={`absolute top-3 right-3 z-10 cursor-pointer text-xl transition-all duration-200 opacity-80 ${
      isBookmarked ? "text-yellow-500" : "text-gray-500"
    } hover:bg-gray-200 hover:opacity-100 hover:scale-110 p-1 rounded-full`}
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
  >
    {isBookmarked ? (
      <BookmarkIcon className="h-9 w-9" />
    ) : (
      <BookmarkBorderIcon className="h-9 w-9" />
    )}
  </button>
);

Bookmark.propTypes = {
  isBookmarked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Bookmark;

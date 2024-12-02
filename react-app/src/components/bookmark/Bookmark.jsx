// src/components/bookmark/Bookmark.jsx
import PropTypes from "prop-types";
import styles from "./Bookmark.module.css";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const Bookmark = ({ isBookmarked, onToggle }) => (
  <button
    className={`${styles.bookmarkIcon} ${isBookmarked ? styles.active : ""}`}
    onClick={(e) => {
      e.stopPropagation();
      onToggle();
    }}
  >
    {isBookmarked ? (
      <BookmarkIcon className="h-6 w-6" />
    ) : (
      <BookmarkBorderIcon className="h-6 w-6" />
    )}
  </button>
);

Bookmark.propTypes = {
  isBookmarked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Bookmark;

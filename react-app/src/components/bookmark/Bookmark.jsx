// src/components/bookmark/Bookmark.jsx
import PropTypes from "prop-types";
import styles from "./Bookmark.module.css";

const Bookmark = ({ isBookmarked, onToggle }) => (
  <div
    className={`${styles.bookmarkIcon} ${isBookmarked ? styles.active : ""}`}
    onClick={(e) => {
      e.stopPropagation(); // Prevent triggering parent onClick
      onToggle();
    }}
  >
    {isBookmarked ? "★" : "☆"}
  </div>
);

Bookmark.propTypes = {
  isBookmarked: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Bookmark;

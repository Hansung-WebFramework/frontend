import PropTypes from 'prop-types';

export function Button({ children, size, variant, ...props }) {
  const baseClass = "p-2 rounded transition";
  const sizeClass = size === "sm" ? "text-sm px-3" : "text-base px-4";
  const variantClass = variant === "secondary" ? "bg-gray-300 hover:bg-gray-400" : "bg-blue-500 text-white";

  return (
    <button className={`${baseClass} ${sizeClass} ${variantClass}`} {...props}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,  // 자식 컴포넌트는 필수적으로 전달되어야 함을 명시
  size: PropTypes.string,               // size prop의 유형을 문자열로 정의
  variant: PropTypes.string             // variant prop의 유형을 문자열로 정의
};

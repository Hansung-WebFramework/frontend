import PropTypes from 'prop-types';

export function Card({ children }) {
  return <div className="border rounded-lg p-4 bg-white shadow-sm">{children}</div>;
}

Card.propTypes = {
  children: PropTypes.node
};

export function CardHeader({ children }) {
  return <div className="border-b pb-2 mb-2">{children}</div>;
}

CardHeader.propTypes = {
  children: PropTypes.node
};

export function CardTitle({ children }) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}

CardTitle.propTypes = {
  children: PropTypes.node
};

export function CardContent({ children }) {
  return <div>{children}</div>;
}

CardContent.propTypes = {
  children: PropTypes.node
};

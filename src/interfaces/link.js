import PropTypes from "prop-types";

const LinkInterface = PropTypes.shape({
  id: PropTypes.number.required,
  fullUrl: PropTypes.string.required,
  shortUrl: PropTypes.string.required
});

export default LinkInterface;

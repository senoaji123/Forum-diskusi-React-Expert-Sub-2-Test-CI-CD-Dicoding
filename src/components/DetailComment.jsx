import PropTypes from 'prop-types';
import formatDate from '../utils/FormatDate';

export default function DetailComment({
  avatar, name, content, createdAt,
}) {
  return (
    <div>
      <div>
        <div>
          <img src={avatar} alt="" />
          <p>{name}</p>
        </div>
        <p>{formatDate(createdAt)}</p>
      </div>
      <p>{content}</p>
      
    </div>
  );
}

DetailComment.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

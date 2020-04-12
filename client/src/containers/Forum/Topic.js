import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { deleteTopic } from "../../store/actions/topic";
import Button from "../../components/Button";

const Topic = ({ topic: { title, tags, category, date, replies, _id }, cats, deleteTopic }) => {
  const catgeoryName = cats.map((cat) => {
    if (cat._id === category) return cat.name;
  });

  return (
    <tr className="table__body__row">
      <td className="table__body--topic">
        <Link to={`/forum/${_id}`}>
          <h2 className="table__body--topic__title">{title}</h2>
        </Link>
        <div className="table__body--topic__criteria">
          <Link to={`/forum/category/${encodeURI(catgeoryName)}`}>
            <p className="table__body--topic__category">{catgeoryName} Gaming</p>
          </Link>
          <div className="table__body--topic__tags">
            {tags.map((tag, index) => (
              <Link to={`/forum/tags/${encodeURI(tag)}`} key={index}>
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </td>

      <td className="table__body--replies">{replies.length}</td>

      <td className="table__body--created">12th April</td>

      <td className="table__body--action">
        <div>
          <div className="tooltip">
            <Button
              type="btn"
              action={(e) => console.log("hi")}
              shape="sharp-icon"
              color="blue"
              icon="edit"
              iconOnly
            />
            <span className="tooltip__text">Edit</span>
          </div>

          <div className="tooltip">
            <Button
              type="btn"
              action={(e) => deleteTopic(_id)}
              shape="sharp-icon"
              color="red"
              icon="delete"
              iconOnly
            />
            <span className="tooltip__text">Delete</span>
          </div>
        </div>
      </td>
    </tr>
  );
};

Topic.propTypes = {
  topic: PropTypes.object.isRequired,
  deleteTopic: PropTypes.func.isRequired,
};

export default connect(null, { deleteTopic })(Topic);

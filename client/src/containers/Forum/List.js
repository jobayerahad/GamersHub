import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Loading from "../../components/Loading";
import Topic from "./Topic";
import { getTopics } from "../../store/actions/topic";
import { getCategories } from "../../store/actions/category";

const List = ({
  getTopics,
  getCategories,
  topic: { topics, loading },
  category: { categories },
}) => {
  useEffect(() => {
    document.title = `Forum - Gamer's Hub`;
    getTopics();
    getCategories();
  }, [getTopics, getCategories]);

  return (
    <section className="topic container">
      <ul className="topic-list__control">
        <li className="topic-list__control__item topic-list__control__item--active">
          All <span>(31)</span>
        </li>
        <li className="topic-list__control__item">Categories</li>
        <li className="topic-list__control__item">
          My Topics <span>(3)</span>
        </li>
      </ul>

      {loading ? (
        <Loading />
      ) : topics.length !== 0 ? (
        <table className="table mt-2">
          <thead className="table__head">
            <tr className="table__head__row">
              <th className="table__head--topic">Topic</th>
              <th className="table__head--replies">Replies</th>
              <th className="table__head--created">Created</th>
              <th className="table__head--action">Action</th>
            </tr>
          </thead>

          <tbody className="table__body">
            {topics.map((topic) => (
              <Topic key={topic._id} topic={topic} cats={categories} />
            ))}
          </tbody>
        </table>
      ) : (
        <p className="topic__no-content">No Topics Created Yet!</p>
      )}
    </section>
  );
};

List.propTypes = {
  getTopics: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  topic: state.topic,
  category: state.category,
});

export default connect(mapStateToProps, { getTopics, getCategories })(List);

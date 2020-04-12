import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Transition } from "react-transition-group";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { getTopic } from "../../store/actions/topic";
import Loading from "../../components/Loading";
import Reply from "./Reply";
import Button from "../../components/Button";

const Single = ({
  match: {
    params: { forumTitle },
  },
  getTopic,
  topic: { topic, loading },
}) => {
  const [showNewReply, setShowNewReply] = useState(false);
  const onReplyClick = (e) => {
    e.preventDefault();
    setShowNewReply(true);
  };

  const [showReplies, setShowReplies] = useState(false);
  const onRepliesClick = (e) => {
    e.preventDefault();
    setShowReplies(true);
  };

  useEffect(() => {
    // document.title = `${forumTitle} - Gamer's Hub`;
    getTopic(forumTitle);
  }, [getTopic]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <section className="topic container">
            <div className="topic-single__head">
              <h2 className="topic-single__head__title">{topic.title}</h2>
              <div className="topic-single__head__criteria">
                <p className="table__body--topic__category">Category</p>
                <div className="table__body--topic__tags">
                  {topic.tags.map((tag, index) => (
                    <Link to={`/forum/tags/${encodeURI(tag)}`} key={index}>
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="topic-single__container">
              <img src={topic.portrait} alt={topic.username} className="topic-single__img" />

              <div className="topic-single__body">
                <article className="topic-single__content">
                  <div className="topic-single__content__meta-data">
                    <p className="topic-single__content__username">{topic.username}</p>
                    <p className="topic-single__content__date">12th April</p>
                  </div>
                  <p className="topic-single__content__text">{topic.text}</p>
                </article>

                <div className="topic-single__footer">
                  <button className="topic-single__footer__left" onClick={(e) => onRepliesClick(e)}>
                    <span>{topic.likes.length}</span>
                    <p>Replies</p>
                    {topic.likes.length !== 0 && (
                      <img src="/assets/png/up-arrow.png" alt="up-arrow" />
                    )}
                  </button>

                  <div className="topic-single__footer__right">
                    <button className="topic-single__footer__likes">
                      <img src="/assets/png/like.png" alt="likes" />
                      <span>{topic.likes.length}</span>
                    </button>

                    <button
                      className="topic-single__footer__replies"
                      onClick={(e) => onReplyClick(e)}
                    >
                      <img src="/assets/png/reply.png" alt="reply" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>

                {topic.replies.length !== 0 && (
                  <div className="topic-single__container mt-3">
                    <img
                      src={topic.replies.portrait}
                      alt={topic.replies.username}
                      className="topic-single__img"
                    />

                    <div className="topic-single__comment">
                      <article className="topic-single__content">
                        <div className="topic-single__content__meta-data">
                          <p className="topic-single__content__username">
                            {topic.replies.username}
                          </p>
                          <p className="topic-single__content__date">12th April</p>
                        </div>
                        <p className="topic-single__content__text">{topic.replies.text}</p>
                      </article>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          <Transition in={showNewReply} timeout={500} mountOnEnter unmountOnExit>
            {(state) => <Reply show={state} setShowTopic={setShowNewReply} title={forumTitle} />}
          </Transition>

          <div className="forum__add-btn">
            <Button
              type="btn"
              action={(e) => onReplyClick(e)}
              icon="reply"
              color="dark"
              shape="circle"
              iconOnly
            />
          </div>
        </>
      )}
    </>
  );
};

Single.propTypes = {
  getTopic: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  topic: state.topic,
});

export default connect(mapStateToProps, { getTopic })(Single);

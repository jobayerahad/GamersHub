import React, { useState } from "react";

import Button from "../../components/Button";

const Reply = ({ show, setShowTopic, title }) => {
  const [replyText, setReplyText] = useState("");

  const [showPreview, setShowPreview] = useState(true);

  const togglePreview = (e) => {
    e.preventDefault();
    setShowPreview(!showPreview);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // login(emailOrUsername, password);
    console.log(replyText);
  };

  const onCancel = (e) => {
    e.preventDefault();
    setReplyText("");
    setShowTopic(false);
  };

  const showClasees = [
    "topic__create",
    show === "entering" ? "topic--show" : show === "exiting" ? "topic--close" : null,
  ];

  const topicClasees = ["topic__container", !showPreview && "topic__preview__hide"];

  return (
    <section className={showClasees.join(" ")}>
      <div className={topicClasees.join(" ")}>
        <div className="topic__bar">
          <div className="topic__bar__line"></div>
          <div className="topic__bar__line"></div>
        </div>

        <div className="topic__main">
          <div className="topic__header">
            <img className="topic__icon mr-1" src="assets/png/add.png" alt="create" />
            Create a new Topic
          </div>

          <div className="topic__content">
            <form className="topic__form" onSubmit={(e) => onSubmit(e)}>
              <textarea
                className="form__textarea"
                name="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                required
              >
                {replyText}
              </textarea>
            </form>

            {showPreview && (
              <div className="topic__preview">
                <div className="topic__preview__content">
                  <div className="topic__preview__body">{replyText}</div>
                </div>
              </div>
            )}
          </div>

          <div className="topic__footer">
            <div className="topic__footer__btn">
              <Button
                type="btn"
                action={(e) => onSubmit(e)}
                shape="sharp"
                color="blue"
                icon="reply"
              >
                Reply
              </Button>
              <Button
                type="btn"
                action={(e) => onCancel(e)}
                shape="sharp"
                color="dark"
                icon="error"
              >
                Cancel
              </Button>
            </div>

            <button
              className="topic__footer__toggle"
              onClick={(e) => {
                togglePreview(e);
              }}
            >
              {showPreview ? "« hide preview" : "show preview »"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reply;

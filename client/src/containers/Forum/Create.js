import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { addTopic } from "../../store/actions/topic";
import Button from "../../components/Button";
import FormSelect from "../../components/Category/Category";

const Create = ({ show, setShowTopic, addTopic }) => {
  const [category, setCategory] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    text: "",
    tags: "",
  });
  const { title, text, tags } = formData;

  const [showPreview, setShowPreview] = useState(true);

  const togglePreview = (e) => {
    e.preventDefault();
    setShowPreview(!showPreview);
  };

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addTopic({ title, text, category, tags });
  };

  const showClasees = [
    "topic__create",
    show === "entering" ? "topic--show" : show === "exiting" ? "topic--close" : null,
  ];

  const topicClasees = ["topic__container", !showPreview ? "topic__preview__hide" : ""];
  const formClasees = ["topic__form", !showPreview ? "topic__form__full" : ""];

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
            <form className={formClasees.join(" ")} onSubmit={(e) => onSubmit(e)}>
              <div className="form__input">
                <img src="assets/png/title.png" alt="title" className="form__input__img" />
                <input
                  type="text"
                  className="form__input__field"
                  placeholder="Your Topic's Title "
                  name="title"
                  value={title}
                  onChange={(e) => onChange(e)}
                  required
                />
              </div>

              <div className="form__container-of-two">
                <FormSelect setCategory={setCategory} />

                <div className="form__input">
                  <img src="assets/png/tags.png" alt="tags" className="form__input__img" />
                  <input
                    type="text"
                    className="form__input__field"
                    placeholder="Optional tags (Comma Separated Value)"
                    name="tags"
                    value={tags}
                    onChange={(e) => onChange(e)}
                    required
                  />
                </div>
              </div>

              <textarea
                className="form__textarea"
                name="text"
                value={text}
                onChange={(e) => onChange(e)}
                required
              >
                {text}
              </textarea>
            </form>

            {showPreview && (
              <div className="topic__preview">
                <div className="topic__preview__content">
                  <h5 className="topic__preview__title">{title}</h5>
                  <div className="topic__preview__body">{text}</div>
                </div>
              </div>
            )}
          </div>

          <div className="topic__footer">
            <div className="topic__footer__btn">
              <Button type="btn" action={(e) => onSubmit(e)} shape="sharp" color="blue" icon="add">
                Create Topic
              </Button>
              <Button
                type="btn"
                action={(e) => {
                  e.preventDefault();
                  setShowTopic(false);
                }}
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

Create.propTypes = {
  setShowTopic: PropTypes.func.isRequired,
  addTopic: PropTypes.func.isRequired,
};

export default connect(null, { addTopic })(Create);

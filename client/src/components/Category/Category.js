import React, { useState } from "react";
import { Transition } from "react-transition-group";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CategoryItem from "./CategoryItem";

const Category = ({ category: { categories }, setCategory }) => {
  const [item, setItem] = useState({
    id: null,
    name: "",
  });

  const [showItem, setShowItem] = useState(false);

  const onInputClick = () => {
    setShowItem(!showItem);
  };

  setCategory(item.id);

  const cssClasees = ["form__select__arrow", showItem && "form__select__arrow--rotate"];

  return (
    <div className="form__select">
      <img src="assets/png/category.png" alt="category" className="form__select__img" />
      <div className="form__select__field" name="category" onClick={() => onInputClick()}>
        {item.name ? `${item.name} Gaming` : "-- Please Select a Category --"}
      </div>
      <img src="assets/png/down-arrow-filled.png" alt="category" className={cssClasees.join(" ")} />

      <Transition in={showItem} timeout={500} mountOnEnter unmountOnExit>
        {(state) => (
          <CategoryItem
            show={state}
            categories={categories}
            setShowItem={setShowItem}
            setItem={setItem}
          />
        )}
      </Transition>
    </div>
  );
};

Category.propTypes = {
  category: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  category: state.category,
});

export default connect(mapStateToProps)(Category);

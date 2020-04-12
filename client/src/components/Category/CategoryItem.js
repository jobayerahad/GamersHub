import React from "react";

const CategoryItem = ({ show, categories, setShowItem, setItem }) => {
  const cssClasees = [
    "form__select__list",
    show === "entering"
      ? "form__select__list--show"
      : show === "exiting"
      ? "form__select__list--close"
      : null,
  ];

  const onItemClick = (category) => {
    setShowItem(false);
    setItem({ id: category._id, name: category.name });
  };

  return (
    <ul className={cssClasees.join(" ")}>
      {categories.map((category, index) => (
        <li className="form__select__item" key={index} onClick={() => onItemClick(category)}>
          {`${category.name} Gaming`}
        </li>
      ))}
    </ul>
  );
};

export default CategoryItem;

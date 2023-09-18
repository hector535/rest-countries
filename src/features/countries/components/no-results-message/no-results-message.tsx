import style from "./no-results-message.module.scss";

export const NoResultsMessage = () => {
  return (
    <div className={style.container}>
      <p>No results found. Please check your filters</p>
    </div>
  );
};

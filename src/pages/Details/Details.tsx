import { useParams } from "react-router-dom";

export const Details = () => {
  const params = useParams();

  return (
    <>
      <h1>This is the detail page ID: {params.id}</h1>
    </>
  );
};

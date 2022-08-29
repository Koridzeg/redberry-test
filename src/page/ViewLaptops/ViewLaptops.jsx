import { useParams } from "react-router-dom";

const ViewLaptops = () => {
  const { laptop_id } = useParams();

  return <div>ViewLaptops</div>;
};

export default ViewLaptops;
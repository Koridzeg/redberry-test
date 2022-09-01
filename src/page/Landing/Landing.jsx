import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "../../components";
import UploadImage from "../../components/UploadImage/UploadImage";

const Landing = () => {
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "1rem",
      }}
    >
<UploadImage />
    </div>
  );
};

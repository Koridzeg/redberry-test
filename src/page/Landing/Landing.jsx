import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
} from "../../components";

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
      <Select placeholder="team" error>
        <SelectItem value="human resources">human resources</SelectItem>
        <SelectItem value="front end">front end</SelectItem>
        <SelectItem value="back end">back end</SelectItem>
      </Select>
      <Button>Button</Button>
    </div>
  );
};

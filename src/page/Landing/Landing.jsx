import { Button, TextField } from "../../components";

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
      <TextField placeholder="placeholder" />
      <TextField label="label" placeholder="placeholder" />
      <TextField label="label" hint="hint" placeholder="placeholder" />
      <TextField label="label" hint="hint" placeholder="placeholder" error />
    </div>
  );
};

export default Landing;

import { TextField, Select, SelectItem, Button } from "../../components";
import { useEffect, useState } from "react";
import LeftArrowIconUrl from "../../assets/images/left_arrow.png";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAsync } from "../../hooks/use-async";
import { getPositions, getTeams } from "../../api";
import {
  StyledContainer,
  StyledHeader,
  StyledStepContainer,
} from "./CreateLaptop.styles";
import { Formik, useFormikContext } from "formik";
import useLocalStorage from "../../hooks/use-local-storage";

export const FirstStep = () => {
  const {
    data: teams,
    error: teamsError,
    isLoading: teamsIsLoading,
    run: teamsRun,
  } = useAsync(getTeams);
  const {
    data: positions,
    error: positionsError,
    isLoading: positionsIsLoading,
    run: positionsRun,
  } = useAsync(getPositions);
  const [formValues, setFormValues] = useLocalStorage(
    "create-laptop",
    initialValues
  );
  const formik = useFormikContext();
  const [selectedTeam, setSelectedTeam] = useState();
  const [selectedPosition, setSelectedPosition] = useState();

  const selectedTeamId = teams?.data?.find(
    (team) => team.name === selectedTeam
  )?.id;
  const selectedPositionId = positions?.data?.find(
    (position) => position.name === selectedPosition
  )?.id;

  function handleFormikFieldChange(e) {
    formik.handleChange(e);
    setFormValues({ ...formik.values, [e.target.name]: e.target.value });
  }

  function handleChangeSelectedTeam(newValue) {
    setSelectedTeam(newValue);
    setSelectedPosition();
  }

  useEffect(() => {
    async function runOnLoad() {
      const teams = await teamsRun();
      const positions = await positionsRun();
      setSelectedTeam(
        teams?.data?.find((team) => team.id === formValues.team_id)?.name
      );
      setSelectedPosition(
        positions?.data?.find(
          (position) => position.id === formValues.position_id
        )?.name
      );
    }
    runOnLoad();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamsRun, positionsRun]);

  useEffect(() => {
    if (!selectedTeamId) return;
    formik.setFieldValue("team_id", selectedTeamId);
    setFormValues({ ...formik.values, team_id: selectedTeamId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTeamId]);

  useEffect(() => {
    formik.setFieldValue("position_id", selectedPositionId);
    setFormValues({ ...formik.values, position_id: selectedPositionId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPositionId]);

  if (teamsIsLoading || positionsIsLoading) {
    return <div>loading...</div>;
  }

  if (teamsError || positionsError) {
    return <div>an error has occurred</div>;
  }

  return (
    <StyledStepContainer>
      <TextField
        label="სახელი"
        placeholder="გრიშა"
        hint="მინიმუმ 2 სიმბოლო, ქართული ასოები"
        name="name"
        onChange={handleFormikFieldChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <TextField
        label="გვარი"
        placeholder="ბაგრატიონი"
        hint="მინიმუმ 2 სიმბოლო, ქართული ასოები"
        name="surname"
        onChange={handleFormikFieldChange}
        onBlur={formik.handleBlur}
        value={formik.values.surname}
        error={formik.errors.surname}
      />
      <Select
        value={selectedTeam}
        onChange={handleChangeSelectedTeam}
        placeholder="თიმი"
        error={formik.errors.team_id}
      >
        {teams?.data.map((team) => (
          <SelectItem key={team.id} value={team.name}>
            {team.name}
          </SelectItem>
        ))}
      </Select>
      {selectedTeam && (
        <Select
          value={selectedPosition}
          onChange={setSelectedPosition}
          placeholder="პოზიცია"
          error={formik.errors.position_id}
        >
          {positions?.data.map(
            (position) =>
              position.team_id === selectedTeamId && (
                <SelectItem key={position.id} value={position.name}>
                  {position.name}
                </SelectItem>
              )
          )}
        </Select>
      )}
      <TextField
        label="მეილი"
        placeholder="grish666@redberry.ge"
        hint="უნდა მთავრდებოდეს @redberry.ge-ით"
        name="email"
        onChange={handleFormikFieldChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <TextField
        label="ტელეფონის ნომერი"
        placeholder="+995 598 00 07 01"
        hint="ქართული მობ-ნომრის ფორმატი"
        name="phone_number"
        onChange={handleFormikFieldChange}
        onBlur={formik.handleBlur}
        value={formik.values.phone_number}
        error={formik.errors.phone_number}
      />
      {/* <Link to="/create/2"> */}
      <Button type="submit">შემდეგი</Button>
      {/* </Link> */}
    </StyledStepContainer>
  );
};

export const SecondStep = () => (
  <StyledStepContainer>step 2</StyledStepContainer>
);

const initialValues = {
  name: "",
  surname: "",
  team_id: 0,
  position_id: 0,
  phone_number: undefined,
  email: "",
};

const validate = (values) => {
  const errors = {};
  const onlyGeorgian = /^[ა-ჰ]+$/g;

  if (
    !values.name ||
    values.name.length < 2 ||
    !new RegExp(onlyGeorgian).test(values.name)
  ) {
    errors.name = "Required";
  }

  if (
    !values.surname ||
    values.surname.length < 2 ||
    !new RegExp(onlyGeorgian).test(values.surname)
  ) {
    errors.surname = "Required";
  }

  if (!values.team_id) {
    errors.team_id = "Required";
  }

  if (!values.position_id) {
    errors.position_id = "Required";
  }

  if (!values.email || !values.email.endsWith("@redberry.ge")) {
    errors.email = "Required";
  }

  const formattedNumber = Number(
    values.phone_number.replaceAll("+", "").replaceAll(" ", "")
  );

  if (
    !values.phone_number ||
    !values.phone_number.startsWith("+995") ||
    String(formattedNumber).length !== 12
  ) {
    errors.phone_number = "Required";
  }

  return errors;
};
const CreateLaptop = () => {
  const [formValues, setFormValues] = useLocalStorage(
    "create-laptop",
    initialValues
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const step = Number(pathname.split("/").at(-1));

  return (
    <StyledContainer>
      <StyledHeader>
        <img
          src={LeftArrowIconUrl}
          alt="go back"
          onClick={() => navigate(-1)}
        />
        <div>
          <h3>{step === 1 ? "თანამშრომლის ინფო" : "title 2"}</h3>
          <p>{step}/2</p>
        </div>
      </StyledHeader>
      <Formik
        initialValues={formValues}
        validate={validate}
        onSubmit={(values) => {
          console.log(values);
          // setFormValues();
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Outlet />
          </form>
        )}
      </Formik>
    </StyledContainer>
  );
};

export default CreateLaptop;

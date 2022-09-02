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

const initialValues = {
  name: "",
  surname: "",
  team_id: undefined,
  position_id: undefined,
  phone_number: "",
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
    values.phone_number?.replaceAll("+", "").replaceAll(" ", "")
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
  const [, setPersistedValues] = useLocalStorage(
    "create-laptop",
    initialValues
  );
  const formik = useFormikContext();
  const navigate = useNavigate();

  function handleFormikFieldChange(e) {
    setPersistedValues({ ...formik.values, [e.target.name]: e.target.value });
    return formik.handleChange(e);
  }

  function handleFormikSelectChange({ name, value }) {
    setPersistedValues({ ...formik.values, [name]: value });
    formik.setFieldValue(name, value);
    if (name === "team_id") {
      handleFormikSelectChange({ name: "position_id", value: undefined });
    }
  }

  useEffect(() => {
    teamsRun();
    positionsRun();
  }, [teamsRun, positionsRun]);

  if (
    teamsIsLoading ||
    positionsIsLoading ||
    (!teams && !teamsError) ||
    (!positions && !positionsError)
  ) {
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
        name="team_id"
        value={formik.values.team_id}
        onChange={handleFormikSelectChange}
        onBlur={formik.handleBlur}
        placeholder="თიმი"
        error={formik.errors.team_id}
        defaultLabel={
          teams?.data?.find((team) => team.id === formik.values.team_id)?.name
        }
      >
        {teams?.data.map((team) => (
          <SelectItem key={team.id} value={team.id} label={team.name} />
        ))}
      </Select>
      <Select
        name="position_id"
        value={formik.values.position_id}
        onChange={handleFormikSelectChange}
        onBlur={formik.handleBlur}
        placeholder="პოზიცია"
        error={formik.errors.position_id}
        disabled={!formik.values.team_id}
        defaultLabel={
          positions?.data?.find(
            (position) => position.id === formik.values.position_id
          )?.name
        }
      >
        {positions?.data.map(
          (position) =>
            position.team_id === formik.values.team_id && (
              <SelectItem
                key={position.id}
                value={position.id}
                label={position.name}
              />
            )
        )}
      </Select>
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
      <Button
        type="button"
        onClick={() => {
          const errors = validate(formik.values);
          if (Object.keys(errors).length !== 0) {
            return formik.setErrors(errors);
          }
          navigate("/create/2");
        }}
      >
        შემდეგი
      </Button>
    </StyledStepContainer>
  );
};

export const SecondStep = () => (
  <StyledStepContainer>step 2</StyledStepContainer>
);

const CreateLaptop = () => {
  const [persistedValues, setPersistedValues] = useLocalStorage(
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
          <h3>
            {step === 1 ? "თანამშრომლის ინფო" : "ლეპტოპის მახასიათებლები"}
          </h3>
          <p>{step}/2</p>
        </div>
      </StyledHeader>
      <Formik
        initialValues={persistedValues}
        validate={validate}
        onSubmit={(values) => {
          console.log(values);
          setPersistedValues();
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

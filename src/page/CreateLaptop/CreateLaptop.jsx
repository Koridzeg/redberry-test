import {
  TextField,
  Select,
  SelectItem,
  Button,
  UploadImage,
  RadioGroup,
  Radio,
  Flex,
  Divider,
} from "../../components";
import { useEffect } from "react";
import LeftArrowIconUrl from "../../assets/images/left_arrow.png";
import LeftArrowDesktop from "../../assets/images/desktopback.png";
import FooterImgUrl from "../../assets/images/footer.png";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAsync } from "../../hooks/use-async";
import {
  getBrands,
  getCPUS,
  getPositions,
  getTeams,
  createLaptop,
} from "../../api";
import {
  StyledContainer,
  StyledHeader,
  StyledStepContainer,
} from "./CreateLaptop.styles";
import { Formik, useFormikContext } from "formik";
import useLocalStorage from "../../hooks/use-local-storage";
import theme, { SMALL_BREAKPOINT } from "../../style/theme";
import { useMemo } from "react";

const formatPhoneNumber = (number) =>
  Number(number?.replaceAll("+", "").replaceAll(" ", ""));

const initialValues = {
  name: "",
  surname: "",
  team_id: undefined,
  position_id: undefined,
  phone_number: "",
  email: "",

  laptop_image: undefined,
  laptop_name: "",
  laptop_brand_id: undefined,
  laptop_cpu: "",
  laptop_cpu_cores: undefined,
  laptop_cpu_threads: undefined,
  laptop_ram: undefined,
  laptop_hard_drive_type: "",
  laptop_state: "",
  laptop_purchase_date: "",
  laptop_price: undefined,
};

const validateFirstStep = (values) => {
  const onlyGeorgian = /^[ა-ჰ]+$/g;

  const errors = {};
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

  const formattedNumber = formatPhoneNumber(values.phone_number);

  if (
    !values.phone_number ||
    !values.phone_number.startsWith("+995") ||
    String(formattedNumber).length !== 12
  ) {
    errors.phone_number = "Required";
  }

  return errors;
};

const validateSecondStep = (values) => {
  const onlyEnglishAndNumbers = /^[a-zA-Z0-0]+$/g;
  const onlyNumbers = /^[0-9]+$/g;
  const onlyDate =
    /^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/g;
  const errors = {};

  if (!values.laptop_image?.name) {
    errors.laptop_image = "Required";
  }

  if (
    !values.laptop_name ||
    !new RegExp(onlyEnglishAndNumbers).test(values.laptop_name)
  ) {
    errors.laptop_name = "Required";
  }

  if (!values.laptop_brand_id) {
    errors.laptop_brand_id = "Required";
  }

  if (!values.laptop_cpu) {
    errors.laptop_cpu = "Required";
  }

  if (
    !values.laptop_cpu_cores ||
    !new RegExp(onlyNumbers).test(values.laptop_cpu_cores)
  ) {
    errors.laptop_cpu_cores = "Required";
  }

  if (
    !values.laptop_cpu_threads ||
    !new RegExp(onlyNumbers).test(values.laptop_cpu_threads)
  ) {
    errors.laptop_cpu_threads = "Required";
  }

  if (!values.laptop_ram || !new RegExp(onlyNumbers).test(values.laptop_ram)) {
    errors.laptop_ram = "Required";
  }

  if (!values.laptop_hard_drive_type) {
    errors.laptop_hard_drive_type = "Required";
  }

  if (
    !values.laptop_price ||
    !new RegExp(onlyNumbers).test(values.laptop_price)
  ) {
    errors.laptop_price = "Required";
  }

  if (
    values.laptop_purchase_date &&
    !new RegExp(onlyDate).test(values.laptop_purchase_date)
  ) {
    errors.laptop_purchase_date = "Required";
  }

  if (!values.laptop_state) {
    errors.laptop_state = "Required";
  }

  return errors;
};

const validate = (values) => {
  let errors = {};
  const firstStepErrors = validateFirstStep(values);
  const secondStepErrors = validateSecondStep(values);

  errors = {
    ...errors,
    ...firstStepErrors,
    ...secondStepErrors,
  };

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
      <Flex
        flexDirection="row"
        col={window.innerWidth > SMALL_BREAKPOINT ? 2 : null}
      >
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
      </Flex>
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
          const errors = validateFirstStep(formik.values);
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

export const SecondStep = () => {
  const formik = useFormikContext();
  const {
    data: brands,
    error: brandsError,
    isLoading: brandsIsLoading,
    run: brandsRun,
  } = useAsync(getBrands);
  const {
    data: cpus,
    error: cpusError,
    isLoading: cpusIsLoading,
    run: cpusRun,
  } = useAsync(getCPUS);

  const [, setPersistedValues] = useLocalStorage(
    "create-laptop",
    initialValues
  );

  function handleFormikFieldChange(e) {
    setPersistedValues({ ...formik.values, [e.target.name]: e.target.value });
    return formik.handleChange(e);
  }

  function handleFormikSelectChange({ name, value }) {
    setPersistedValues({ ...formik.values, [name]: value });
    formik.setFieldValue(name, value);
  }

  function handleFormikUploadImageChange(event) {
    setPersistedValues({
      ...formik.values,
      [event.target.name]: event.target.files[0],
    });
    formik.setFieldValue(event.target.name, event.target.files[0]);
  }

  useEffect(() => {
    brandsRun();
    cpusRun();
  }, [brandsRun, cpusRun]);

  if (
    brandsIsLoading ||
    cpusIsLoading ||
    (!brands && !brandsError) ||
    (!cpus && !cpusError)
  ) {
    return <div>loading...</div>;
  }

  if (brandsError || cpusError) {
    return <div>an error has occurred</div>;
  }

  return (
    <StyledStepContainer alignItems="flex-start">
      <UploadImage
        name="laptop_image"
        onChange={handleFormikUploadImageChange}
        error={formik.errors.laptop_image}
      />
      <Flex
        flexDirection="row"
        col={window.innerWidth > SMALL_BREAKPOINT ? 2 : null}
      >
        <TextField
          label="ლეპტოპის სახელი"
          placeholder="HP"
          hint="ლათინური ასოები,ციფრები,!@$^&*()_+="
          name="laptop_name"
          onChange={handleFormikFieldChange}
          onBlur={formik.handleBlur}
          value={formik.values.laptop_name}
          error={formik.errors.laptop_name}
        />
        <Select
          name="laptop_brand_id"
          value={formik.values.laptop_brand_id}
          onChange={handleFormikSelectChange}
          onBlur={formik.handleBlur}
          placeholder="ლეპტოპის ბრენდი"
          error={formik.errors.laptop_brand_id}
          defaultLabel={
            brands?.data?.find(
              (brand) => brand.id === formik.values.laptop_brand_id
            )?.name
          }
        >
          {brands?.data.map((brand) => (
            <SelectItem key={brand.id} value={brand.id} label={brand.name} />
          ))}
        </Select>
      </Flex>
      <Divider />
      <Flex
        flexDirection="row"
        col={window.innerWidth > SMALL_BREAKPOINT ? 3 : null}
      >
        <Select
          name="laptop_cpu"
          value={formik.values.laptop_cpu}
          onChange={handleFormikSelectChange}
          onBlur={formik.handleBlur}
          placeholder="CPU"
          error={formik.errors.laptop_cpu}
          defaultLabel={formik.values.laptop_cpu}
        >
          {cpus?.data.map((cpu) => (
            <SelectItem key={cpu.id} value={cpu.name} label={cpu.name} />
          ))}
        </Select>
        <TextField
          label="CPU_ს ბირთვი"
          placeholder="14"
          hint="მხოლოდ ციფრები"
          name="laptop_cpu_cores"
          onChange={handleFormikFieldChange}
          onBlur={formik.handleBlur}
          value={formik.values.laptop_cpu_cores}
          error={formik.errors.laptop_cpu_cores}
        />
        <TextField
          label="CPU_ს ნაკადი"
          placeholder="365"
          hint="მხოლოდ ციფრები"
          name="laptop_cpu_threads"
          onChange={handleFormikFieldChange}
          onBlur={formik.handleBlur}
          value={formik.values.laptop_cpu_threads}
          error={formik.errors.laptop_cpu_threads}
        />
      </Flex>
      <Flex
        flexDirection="row"
        alignItems="flex-start"
        col={window.innerWidth > SMALL_BREAKPOINT ? 2 : null}
      >
        <TextField
          label="ლეპტოპის RAM (GB)"
          placeholder="16"
          hint="მხოლოდ ციფრები"
          name="laptop_ram"
          onChange={handleFormikFieldChange}
          onBlur={formik.handleBlur}
          value={formik.values.laptop_ram}
          error={formik.errors.laptop_ram}
        />
        <RadioGroup
          name="laptop_hard_drive_type"
          onChange={handleFormikFieldChange}
          onBlur={formik.handleBlur}
          value={formik.values.laptop_hard_drive_type}
          error={formik.errors.laptop_hard_drive_type}
          label="მეხსიერების ტიპი"
        >
          <Radio value="SSD">SSD</Radio>
          <Radio value="HDD">HDD</Radio>
        </RadioGroup>
      </Flex>
      <Divider />
      <Flex
        flexDirection="row"
        alignItems="flex-start"
        col={window.innerWidth > SMALL_BREAKPOINT ? 2 : null}
      >
        <TextField
          label="შეძენის რიცხვი ( არჩევითი ) "
          placeholder="დდ / თთ / წწწწ"
          name="laptop_purchase_date"
          onChange={handleFormikFieldChange}
          onBlur={formik.handleBlur}
          value={formik.values.laptop_purchase_date}
          error={formik.errors.laptop_purchase_date}
        />
        <TextField
          label="ლეპტოპის ფასი"
          hint="მხოლოდ ციფრები"
          name="laptop_price"
          onChange={handleFormikFieldChange}
          onBlur={formik.handleBlur}
          value={formik.values.laptop_price}
          error={formik.errors.laptop_price}
        />
      </Flex>
      <RadioGroup
        name="laptop_state"
        onChange={handleFormikFieldChange}
        onBlur={formik.handleBlur}
        value={formik.values.laptop_state}
        error={formik.errors.laptop_state}
        label="ლეპტოპის მდგომარეობა"
      >
        <Radio value="new">ახალი</Radio>
        <Radio value="used">მეორადი</Radio>
      </RadioGroup>
      <Flex margin="2rem 0 0 0" flexWrap="nowrap">
        <Link to="/create/1">
          <p>უკან</p>
        </Link>
        <Button type="submit">დამახსოვრება</Button>
      </Flex>
    </StyledStepContainer>
  );
};

const CreateLaptop = () => {
  const {
    error: createLaptopError,
    isLoading: createLaptopIsLoading,
    run: createLaptopRun,
  } = useAsync(createLaptop);
  const [persistedValues, setPersistedValues] = useLocalStorage(
    "create-laptop",
    initialValues
  );
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const step = Number(pathname.split("/").at(-1));

  const text = useMemo(() => {
    if (step === 1 && window.innerWidth < 400) {
      return "თანამშრომლის ინფო";
    } else if (step === 1 && window.innerWidth > 400) {
      return <> თანამშრომლის ინფო &emsp; &emsp; ლეპტოპის მახასიათებლები </>
    } else if (step === 2 && window.innerWidth < 400) {
      return "ლეპტოპის მახასიათებლები";
    } else if (step === 2 && window.innerWidth > 400) {
      return <> თანამშრომლის ინფო &emsp; &emsp; ლეპტოპის მახასიათებლები </>
    }
  }, [step]);

  const steps = useMemo(() => {
    if (step === 1 && window.innerWidth < 400) {
      return `${step}/2`;
    } else if (step === 1 && window.innerWidth > 400) {
      return "";
    } else if (step === 2 && window.innerWidth < 400) {
      return `${step}/2`;
    } else if (step === 2 && window.innerWidth > 400) {
      return "";
    }
  }, [step]);

  if (pathname.includes("success")) {
    return <Outlet />;
  }

  if (createLaptopIsLoading) {
    return <div>loading...</div>;
  }

  if (createLaptopError) {
    return <div>an error has occurred</div>;
  }

  return (
    <StyledContainer>
      <StyledHeader>
        <picture onClick={() => navigate(-1)}>
          <source
            media={`(max-width: ${theme.breakpoints.small})`}
            srcSet={LeftArrowIconUrl}
          />
          <source
            media={`(min-width: ${theme.breakpoints.small})`}
            srcSet={LeftArrowDesktop}
          />
          <img src={LeftArrowIconUrl} alt="back" />
        </picture>
        {/* <img
          src={LeftArrowIconUrl}
          alt="go back"
          onClick={() => navigate(-1)}
        /> */}

        <div>
          <h3>{text}</h3>
          <p>{steps}</p>
        </div>
      </StyledHeader>
      <Formik
        initialValues={persistedValues}
        validate={validate}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async (values) => {
          const body = new FormData();
          const fomattedValues = {
            ...values,
            laptop_cpu_cores: Number(values.laptop_cpu_cores),
            laptop_cpu_threads: Number(values.laptop_cpu_threads),
            laptop_ram: Number(values.laptop_ram),
            laptop_price: Number(values.laptop_cpu_cores),
            laptop_image: values.laptop_image,
            phone_number: `+${formatPhoneNumber(values.phone_number)}`,
            token: process.env.REACT_APP_TOKEN,
          };

          for (let key in fomattedValues) {
            body.append(key, fomattedValues[key]);
          }

          createLaptopRun(body).then((response) => {
            if (response?.name === "AxiosError") {
              return;
            }
            setPersistedValues();
            navigate("/create/success");
          });
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <Outlet />
          </form>
        )}
      </Formik>
      {window.innerWidth > SMALL_BREAKPOINT && (
        <img src={FooterImgUrl} alt="footer" />
      )}
    </StyledContainer>
  );
};

export default CreateLaptop;

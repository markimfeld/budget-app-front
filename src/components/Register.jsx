import {
  Form,
  Button,
  Card,
  Col,
  Row,
  FloatingLabel,
  Container,
} from "react-bootstrap";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import * as Yup from "yup";

// formik
import { useFormik } from "formik";

// custom hooks
import { useAuthContext } from "../hooks/useAuthContext";
import { useMessageContext } from "../hooks/useMessageContext";

const Register = () => {
  const {
    message,
    recordType,
    handleSetMessage,
    handleSetType,
    handleSetRecordType,
    clearMessages,
  } = useMessageContext();

  const { register, login, user } = useAuthContext();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = async ({
    firstName,
    lastName,
    username,
    email,
    password,
  }) => {
    const response = await register({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    if (response && response.isStored && response.status === 201) {
      await login(email, password);
      clearMessages();
      navigate(from, { replace: true });
    }
  };

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("Requerido"),
    lastName: Yup.string().required("Requerido"),
    username: Yup.string().required("Requerido"),
    email: Yup.string()
      .email("Usá el formato usuario@dominio.com")
      .required("Requerido"),
    password: Yup.string().min(6, "Muy corta!").required("Requerido"),
  });

  const { handleSubmit, values, setFieldValue, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      username: "",
      registerEnabledBtn: false,
    },
    validationSchema: RegisterSchema,
    onSubmit,
  });

  const onChangeEmail = (e) => {
    setFieldValue("email", e.target.value);
    if (
      values.email &&
      values.password &&
      values.firstName &&
      values.lastName &&
      values.username
    ) {
      setFieldValue("registerEnabledBtn", true);
    }
  };

  const onChangePassword = (e) => {
    setFieldValue("password", e.target.value);
    if (
      values.email &&
      values.password &&
      values.firstName &&
      values.lastName &&
      values.username
    ) {
      setFieldValue("registerEnabledBtn", true);
    }
  };

  const onChangeFirstName = (e) => {
    setFieldValue("firstName", e.target.value);
    if (
      values.email &&
      values.password &&
      values.firstName &&
      values.lastName &&
      values.username
    ) {
      setFieldValue("registerEnabledBtn", true);
    }
  };

  const onChangeLastName = (e) => {
    setFieldValue("lastName", e.target.value);
    if (
      values.email &&
      values.password &&
      values.firstName &&
      values.lastName &&
      values.username
    ) {
      setFieldValue("registerEnabledBtn", true);
    }
  };

  const onChangeUsername = (e) => {
    setFieldValue("username", e.target.value);
    if (
      values.email &&
      values.password &&
      values.firstName &&
      values.lastName &&
      values.username
    ) {
      setFieldValue("registerEnabledBtn", true);
    }
  };

  const handleLogin = () => {
    handleSetMessage(null);
    handleSetType(null);
    handleSetRecordType(null);
    navigate("/login");
  };

  const showMessage = () => {
    return message !== null && recordType === "user";
  };

  return (
    <>
      {user && <Navigate to={from} replace />}
      {!user && (
        <Container>
          <Row
            className="justify-content-md-center align-items-center"
            style={{ height: "97vh" }}
          >
            <Col md="6">
              <Card className="shadow-sm py-2 mb-3 bg-body rounded-0">
                <Card.Body>
                  <Card.Title className="text-center fs-1 mb-4">
                    <i className="fa-solid fa-coins"></i> Finanzas claras
                  </Card.Title>
                  <Form noValidate onSubmit={handleSubmit}>
                    <Row className="g-2 mb-2">
                      <Col md>
                        <FloatingLabel
                          controlId="floatingFirstname"
                          label="Nombre"
                        >
                          <Form.Control
                            name="firstName"
                            value={values.firstName}
                            onChange={onChangeFirstName}
                            type="text"
                            placeholder="Ej: Lionel"
                            required
                            isValid={touched.firstName && !errors.firstName}
                            isInvalid={errors.firstName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                      <Col md>
                        <FloatingLabel
                          controlId="floatingLastname"
                          label="Apellido"
                        >
                          <Form.Control
                            name="lastName"
                            value={values.lastName}
                            onChange={onChangeLastName}
                            type="text"
                            placeholder="Ej: Messi"
                            required
                            isValid={touched.lastName && !errors.lastName}
                            isInvalid={errors.lastName}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                    </Row>

                    <Row className="g-2 mb-2">
                      <Col>
                        <FloatingLabel
                          controlId="floatingUsername"
                          label="Usuario"
                        >
                          <Form.Control
                            name="username"
                            value={values.username}
                            onChange={onChangeUsername}
                            type="text"
                            placeholder="Ej: lionelmessi"
                            required
                            isValid={touched.username && !errors.username}
                            isInvalid={errors.username}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.username}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                    </Row>
                    <Row className="g-2 mb-3">
                      <Col md>
                        <FloatingLabel controlId="floatingEmail" label="Email">
                          <Form.Control
                            name="email"
                            value={values.email}
                            onChange={onChangeEmail}
                            type="email"
                            placeholder="lionelmessi@gmail.com"
                            required
                            isValid={touched.email && !errors.email}
                            isInvalid={errors.email}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.email}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                      <Col md>
                        <FloatingLabel
                          controlId="floatingPassword"
                          label="Contraseña"
                        >
                          <Form.Control
                            name="password"
                            value={values.password}
                            onChange={onChangePassword}
                            type="password"
                            placeholder="password"
                            required
                            isValid={touched.password && !errors.password}
                            isInvalid={errors.password}
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.password}
                          </Form.Control.Feedback>
                        </FloatingLabel>
                      </Col>
                    </Row>

                    <div className="d-grid gap-2">
                      {values.registerEnabledBtn && (
                        <Button variant="success" type="submit">
                          Inscribir
                        </Button>
                      )}
                      {!values.registerEnabledBtn && (
                        <Button variant="success" type="submit" disabled>
                          Inscribir
                        </Button>
                      )}
                      {showMessage && (
                        <p className="text-center mb-0 mt-3 text-danger">
                          {message}
                        </p>
                      )}
                    </div>
                  </Form>
                </Card.Body>
              </Card>
              <Card className="shadow-sm py-2 mb-3 bg-body rounded-0">
                <Card.Body>
                  <Card.Text className="text-center">
                    ¿Ya tenes cuenta?{" "}
                    <Button
                      variant="link"
                      className="m-0 p-0"
                      onClick={() => handleLogin()}
                    >
                      Iniciar sesión
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Register;

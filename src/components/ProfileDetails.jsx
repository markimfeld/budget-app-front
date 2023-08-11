import {
  Card,
  Stack,
  Col,
  Row,
  Button,
  FloatingLabel,
  Form,
} from "react-bootstrap";

import { useQuery } from "react-query";
import { useQueryClient } from "react-query";

import { useMessageContext } from "../hooks/useMessageContext";
import { useAuthContext } from "../hooks/useAuthContext";

import { useNavigate } from "react-router-dom";

import * as Yup from "yup";

// labels
import { DUPLICATE_RECORD } from "../labels/labels";

// formik
import { useFormik } from "formik";
import loginService from "../services/login";
import { useState } from "react";

const ProfileDetails = () => {
  // Get QueryClient from the context
  const queryClient = useQueryClient();
  const {
    clearMessages,
    handleSetMessage,
    handleSetType,
    handleSetRecordType,
  } = useMessageContext();

  const [isSaving, setIsSaving] = useState(false);

  const { user, getOne, updateUserStorage } = useAuthContext();

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["userInfo", { id: user.id }],
    queryFn: getOne,
  });

  const navigate = useNavigate();

  const onSubmit = async ({
    firstName,
    lastName,
    username,
    email,
    // password,
  }) => {
    try {
      setIsSaving(true);
      const { isUpdated } = await loginService.update(userInfo._id, {
        firstName,
        lastName,
        username,
        email,
      });

      if (isUpdated) {
        queryClient.invalidateQueries({ queryKey: ["userInfo"] });
        setIsSaving(false);
        updateUserStorage({ id: userInfo._id, firstName, lastName, username });
      }
    } catch (error) {
      if (
        error.response.data.status === 400 &&
        error.response.data.message === "DUPLICATE_RECORD"
      ) {
        handleSetMessage(DUPLICATE_RECORD);
        handleSetType("danger");
        handleSetRecordType("user");
      }
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
      email: !isLoading ? userInfo?.email : "",
      password: !isLoading ? userInfo?.password : "",
      firstName: !isLoading ? userInfo?.firstName : "",
      lastName: !isLoading ? userInfo?.lastName : "",
      username: !isLoading ? userInfo?.username : "",
      registerEnabledBtn: false,
    },
    enableReinitialize: true,
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

  const onCancelOperation = () => {
    clearMessages();
    navigate(`/`);
  };

  return (
    <>
      {!isLoading && (
        <>
          <Row>
            <Col>
              <Card
                style={{ border: "none", backgroundColor: "white" }}
                className="shadow-sm p-2 bg-body rounded"
              >
                <Card.Header
                  style={{ border: "none", backgroundColor: "white" }}
                >
                  <Card.Title className="fs-4">
                    {userInfo?.firstName} {userInfo?.lastName}
                  </Card.Title>
                  <hr className="mb-0" />
                </Card.Header>
                <Card.Body>
                  <Stack className="mb-2" direction="horizontal" gap={3}>
                    <span className="text-muted">Usuario: </span>
                    <span className="ms-auto fw-bold">
                      {userInfo?.username}
                    </span>
                  </Stack>
                  <Stack direction="horizontal" gap={3}>
                    <span className="text-muted">Email: </span>
                    <span className="ms-auto fw-bold">{userInfo?.email}</span>
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mb-5">
            <Col>
              <Card
                style={{ border: "none", backgroundColor: "white" }}
                className="shadow-sm p-2 mt-4 bg-body rounded"
              >
                <Card.Header
                  style={{ border: "none", backgroundColor: "white" }}
                >
                  <Card.Title className="fs-4 mb-0 p-0 text-dark">
                    Cambiar datos
                  </Card.Title>
                </Card.Header>
                <Card.Body>
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
                      {/* <Col md>
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
                      </Col> */}
                    </Row>

                    <Stack direction="horizontal" gap={3}>
                      {!isSaving && (
                        <Button
                          className="ms-auto"
                          variant="success"
                          type="submit"
                        >
                          Guardar
                        </Button>
                      )}
                      {isSaving && (
                        <Button
                          className="ms-auto"
                          variant="success"
                          type="submit"
                          disabled
                        >
                          Guardando...
                        </Button>
                      )}

                      <Button
                        variant="outline-secondary"
                        onClick={() => onCancelOperation()}
                      >
                        Cancelar
                      </Button>
                    </Stack>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProfileDetails;

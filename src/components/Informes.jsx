import { Row, Col, Card } from "react-bootstrap";

import PieChart from "./PieChart";
import BarChart from "./BarChart";

const Informes = () => {
  return (
    <Row>
      <Col md={6}>
        <Card
          className="mb-3 mb-md-1"
          border="light"
          style={{ backgroundColor: "white" }}
        >
          <Card.Body
            style={{ height: "300px" }}
            className="d-flex justify-content-center align-items-center"
          >
            <PieChart />
          </Card.Body>
        </Card>
      </Col>
      <Col md={6}>
        <Card
          className="mb-1"
          border="light"
          style={{ backgroundColor: "white" }}
        >
          <Card.Body
            style={{ height: "300px" }}
            className="d-flex justify-content-center align-items-center"
          >
            <BarChart />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Informes;

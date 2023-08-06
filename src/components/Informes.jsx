import { Row, Col, Card } from "react-bootstrap";

import PieChart from "./PieChart";
import BarChart from "./BarChart";

const Informes = () => {
  return (
    <Row>
      <Col md={6}>
        <Card
          border="light"
          style={{ backgroundColor: "white", border: "none" }}
          className="shadow-sm py-2 mb-3 bg-body rounded"
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
          border="light"
          style={{ backgroundColor: "white", border: "none" }}
          className="shadow-sm py-2 mb-3 bg-body rounded"
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

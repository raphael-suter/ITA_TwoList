import React, { useState } from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";

const App = () => {
  const [selectedItem1, setSelectedItem1] = useState(-1);
  const [selectedItem2, setSelectedItem2] = useState(-1);

  const [motorcycles1, setMotorcycles1] = useState([
    "Suzuki",
    "Kawasaki",
    "Honda",
    "Yamaha",
  ]);

  const [motorcycles2, setMotorcycles2] = useState([
    "BMW",
    "KTM",
    "Piaggio",
    "Harley-Davidson",
  ]);

  const move = (array1, array2) => {
    setSelectedItem1(-1);
    setSelectedItem2(-1);
    setMotorcycles1(array1);
    setMotorcycles2(array2);
  };

  const allToRight = () => {
    move([], [...motorcycles2, ...motorcycles1]);
  };

  const selectedToRight = () => {
    if (selectedItem1 < 0) {
      return;
    }

    const list = motorcycles1.slice();
    const item = list.splice(selectedItem1, 1);

    move(list, [...motorcycles2, item]);
  };

  const selectedToLeft = () => {
    if (selectedItem2 < 0) {
      return;
    }

    const list = motorcycles2.slice();
    const item = list.splice(selectedItem2, 1);

    move([...motorcycles1, item], list);
  };

  const allToLeft = () => {
    move([...motorcycles1, ...motorcycles2], []);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <ListGroup>
            {motorcycles1.map((motorcycle, index) => (
              <ListGroup.Item
                key={index}
                active={selectedItem1 === index}
                onClick={() => setSelectedItem1(index)}
              >
                {motorcycle}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md="auto">
          <ButtonGroup vertical>
            <Button variant="secondary" onClick={allToRight}>
              &gt;&gt;
            </Button>
            <Button variant="secondary" onClick={selectedToRight}>
              &gt;
            </Button>
            <Button variant="secondary" onClick={selectedToLeft}>
              &lt;
            </Button>
            <Button variant="secondary" onClick={allToLeft}>
              &lt;&lt;
            </Button>
          </ButtonGroup>
        </Col>
        <Col>
          <ListGroup>
            {motorcycles2.map((motorcycle, index) => (
              <ListGroup.Item
                key={index}
                active={selectedItem2 === index}
                onClick={() => setSelectedItem2(index)}
              >
                {motorcycle}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

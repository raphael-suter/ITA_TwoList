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
  const [selectedItems1, setSelectedItems1] = useState([]);
  const [selectedItems2, setSelectedItems2] = useState([]);

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

  const select = (item, selectedItems, setSelectedItems) => {
    if (selectedItems.includes(item)) {
      const list = selectedItems.slice();
      list.splice(list.indexOf(item), 1);

      setSelectedItems(list);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const move = (array1, array2) => {
    setSelectedItems1([]);
    setSelectedItems2([]);
    setMotorcycles1(array1);
    setMotorcycles2(array2);
  };

  const allToRight = () => {
    move([], [...motorcycles2, ...motorcycles1]);
  };

  const selectedToRight = () => {
    if (selectedItems1.length < 0) {
      return;
    }

    const list = motorcycles1.slice();
    const items = selectedItems1.map((item) =>
      list.splice(list.indexOf(item), 1)
    );

    move(list, [...motorcycles2, ...items]);
  };

  const selectedToLeft = () => {
    if (selectedItems2 < 0) {
      return;
    }

    const list = motorcycles2.slice();
    const items = selectedItems2.map((item) =>
      list.splice(list.indexOf(item), 1)
    );

    move([...motorcycles1, ...items], list);
  };

  const allToLeft = () => {
    move([...motorcycles1, ...motorcycles2], []);
  };

  const deleteItems = () => {
    const list = motorcycles1.slice();
    selectedItems1.forEach((item) => list.splice(list.indexOf(item), 1));

    move(list, motorcycles2);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <ListGroup>
            {motorcycles1.map((motorcycle, index) => (
              <ListGroup.Item
                key={index}
                active={selectedItems1.includes(motorcycle)}
                onClick={() =>
                  select(motorcycle, selectedItems1, setSelectedItems1)
                }
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
                active={selectedItems2.includes(motorcycle)}
                onClick={() =>
                  select(motorcycle, selectedItems2, setSelectedItems2)
                }
              >
                {motorcycle}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
      <Button className="mt-4" onClick={deleteItems}>
        Delete
      </Button>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

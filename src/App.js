import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Badge,
  ButtonGroup,
  Button,
  Dropdown,
  DropdownButton,
  ListGroup,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "./core/db";

const allCategories = "all";

function App() {
  const [selectedCategory, setSelectedCategory] = useState(allCategories);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const itemsColRef = query(collection(db, "items"), orderBy("title", "asc"));
    onSnapshot(itemsColRef, (snapshot) => {
      setItems(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  function getCategoryColor(category) {
    switch (category) {
      case "A":
        return "primary";
      case "B":
        return "info";
      case "C":
        return "warning";
      case "D":
        return "success";
      default:
        return "secondary";
    }
  }

  return (
    <div className="App">
      <ButtonGroup className="category-toolbar">
        <Button onClick={() => setSelectedCategory(allCategories)}>All</Button>
        <Button variant="light" onClick={() => setSelectedCategory("A")}>
          Category A
        </Button>

        <DropdownButton
          as={ButtonGroup}
          title="More categories"
          id="bg-nested-dropdown"
          variant="light"
        >
          <Dropdown.Item onClick={() => setSelectedCategory("B")}>
            Category B
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedCategory("C")}>
            Category C
          </Dropdown.Item>
          <Dropdown.Item onClick={() => setSelectedCategory("D")}>
            Category D
          </Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
      <ListGroup>
        {items.map(
          (item) =>
            (selectedCategory === "all" ||
              item.data.category === selectedCategory) && (
              <ListGroup.Item
                key={item.id}
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2">
                  <div className="fw-bold">{item.data.title}</div>
                  {item.data.description}
                </div>
                <Badge bg={getCategoryColor(item.data.category)} pill>
                  Category {item.data.category}
                </Badge>
              </ListGroup.Item>
            )
        )}
      </ListGroup>
    </div>
  );
}

export default App;

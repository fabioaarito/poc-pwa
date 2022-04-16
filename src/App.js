import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Alert,
  Badge,
  ButtonGroup,
  Button,
  Dropdown,
  DropdownButton,
  ListGroup,
  Toast,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import {
  db,
  getFirebaseMessagingToken,
  onMessageListener,
} from "./core/firebase";
import { FaLocationArrow } from "react-icons/fa";

const allCategories = "all";
function App() {
  const [selectedCategory, setSelectedCategory] = useState(allCategories);
  const [items, setItems] = useState([]);
  const [locationError, setLocationError] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [location, setLocation] = useState("");
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  /**
   * Push notifications
   */
  // eslint-disable-next-line
  const [isTokenFound, setTokenFound] = useState(false);

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
    getFirebaseMessagingToken(setTokenFound);

    onMessageListener()
      .then((payload) => {
        setShow(true);
        setNotification({
          title: payload.notification.title,
          body: payload.notification.body,
        });
        console.log("Show notification");
        console.log(payload);
      })
      .catch((err) => console.log("failed: ", err));
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

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser");
    } else {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationError("");
          setIsLocating(false);
          setLocation(position.coords);
        },
        () => {
          setIsLocating(false);
          setLocationError("Unable to retrieve your location");
        }
      );
    }
  };

  const closeMapInfo = () => {
    setIsLocating(false);
    setLocation(null);
    setLocationError("");
  };

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

        <Button variant="outline-info" onClick={() => getLocation()}>
          <FaLocationArrow />
        </Button>
      </ButtonGroup>

      {!!locationError && (
        <Alert variant="warning" onClose={() => closeMapInfo()} dismissible>
          {locationError}
        </Alert>
      )}
      {!!isLocating && <Alert variant="light">Locating...</Alert>}
      {!!location && (
        <div class="location-info">
          <Alert variant="info" onClose={() => closeMapInfo()} dismissible>
            Latitude: {location.latitude} | longitude: {location.longitude}
          </Alert>
          <Button
            href={`https://www.google.com/maps?q=${location.latitude},${location.longitude}`}
            target="_blank"
          >
            Open map
          </Button>
        </div>
      )}

      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
        animation
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          minWidth: 200,
        }}
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
          <strong className="mr-auto">{notification.title}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{notification.body}</Toast.Body>
      </Toast>
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

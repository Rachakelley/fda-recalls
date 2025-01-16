import L from "leaflet";
import yellowAppleIcon from "../../assets/apple_I.png";
import orangeAppleIcon from "../../assets/apple_II.png";
import redAppleIcon from "../../assets/apple_III.png";

const levelIIcon = L.icon({
  iconUrl: yellowAppleIcon,
  iconSize: [25, 25],
  iconAnchor: [25 / 2, 25], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -25], // point from which the popup should open relative to the iconAnchor
});

const levelIIIcon = L.icon({
  iconUrl: orangeAppleIcon,
  iconSize: [25, 25],
  iconAnchor: [25 / 2, 25],
  popupAnchor: [0, -25],
});

const levelIIIIcon = L.icon({
  iconUrl: redAppleIcon,
  iconSize: [25, 25],
  iconAnchor: [25 / 2, 25],
  popupAnchor: [0, -25],
});

const getMapMarkerIcon = (classification) => {
  switch (classification) {
    case "Class I":
      return levelIIcon;
    case "Class II":
      return levelIIIcon;
    default:
      return levelIIIIcon;
  }
};

export default getMapMarkerIcon;

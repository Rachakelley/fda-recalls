import L from 'leaflet';
import yellowAppleIcon from '../../assets/apple_I.png';
import orangeAppleIcon from '../../assets/apple_II.png';
import redAppleIcon from '../../assets/apple_III.png';

const levelIIcon = L.icon({
	iconUrl: yellowAppleIcon,
	iconSize: [15, 15],
	iconAnchor: [15 / 2, 15], // point of the icon which will correspond to marker's location
	popupAnchor: [0, -15], // point from which the popup should open relative to the iconAnchor
});

const levelIIIcon = L.icon({
	iconUrl: orangeAppleIcon,
	iconSize: [15, 15],
	iconAnchor: [15 / 2, 15],
	popupAnchor: [0, -15],
});

const levelIIIIcon = L.icon({
	iconUrl: redAppleIcon,
	iconSize: [15, 15],
	iconAnchor: [15 / 2, 15],
	popupAnchor: [0, -15],
});

const getMapMarkerIcon = (classification) => {
	switch (classification) {
		case 'Class I':
			return levelIIcon;
		case 'Class II':
			return levelIIIcon;
		default:
			return levelIIIIcon;
	}
};

export default getMapMarkerIcon;

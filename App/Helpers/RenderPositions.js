import { MapShapeType } from "react-native-leaflet-maps";


export const RenderPositions = () => {

    const renderIncidentShapes = (incidents) => {
        return incidents.map((incident) => ({
            shapeType: MapShapeType.CIRCLE,
            color: '#FF0000',
            id: incident.id,
            center: incident.ubication,
            radius: 20,
        }));
    };
  return {
    renderIncidentShapes
  }
}

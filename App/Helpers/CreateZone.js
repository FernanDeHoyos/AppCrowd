export const CreateZone = (center, width, height) => {
    // Calcular las coordenadas de los vértices del rectángulo
    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const topLeft = {
        lat: center.lat + halfHeight,
        lng: center.lng - halfWidth
    };

    const topRight = {
        lat: center.lat + halfHeight,
        lng: center.lng + halfWidth
    };

    const bottomRight = {
        lat: center.lat - halfHeight,
        lng: center.lng + halfWidth
    };

    const bottomLeft = {
        lat: center.lat - halfHeight,
        lng: center.lng - halfWidth
    };

    // Crear un objeto que representa el rectángulo
    const rectangle = {
        topLeft,
        topRight,
        bottomRight,
        bottomLeft
    };

    return rectangle;
}

export const isCoordinateInsideRectangle = (coordinate, rectangle) => {
  const { lat, lng } = coordinate;
  const { topLeft, topRight, bottomRight, bottomLeft } = rectangle;

  // Verificar si la coordenada está dentro del rectángulo
  const isInside =
      lat <= topLeft.lat &&
      lat >= bottomLeft.lat &&
      lng >= topLeft.lng &&
      lng <= topRight.lng;

  return isInside;
}



export const generateMarkers = (rectangleCoordinates) => {
    return [
      {
        position: { lat: rectangleCoordinates.topLeft.lat, lng: rectangleCoordinates.topLeft.lng },
        icon: '*',
        size: [32, 32],
      },
      {
        position: { lat: rectangleCoordinates.topRight.lat, lng: rectangleCoordinates.topRight.lng },
        icon: '*',
        size: [32, 32],
      },
      {
        position: { lat: rectangleCoordinates.bottomLeft.lat, lng: rectangleCoordinates.bottomLeft.lng },
        icon: '*',
        size: [32, 32],
      },
      {
        position: { lat: rectangleCoordinates.bottomRight.lat, lng: rectangleCoordinates.bottomRight.lng },
        icon: '*',
        size: [32, 32],
      },
    ];
  };
  
  
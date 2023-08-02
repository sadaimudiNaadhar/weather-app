export interface MapData {
  coordinates: MapCoordinates | null
}

export interface MapCoordinates {
  latitude: number
  longitude: number
}

export interface ApiResponse {
  weatherStationId: number
  temperature: number
  tauTemperature: number
  bTemperature: number
  windSpeed: number
  weatherStationLocation: MapCoordinates
  sensorData: MapCoordinates[]
  //STZST: number ?
}

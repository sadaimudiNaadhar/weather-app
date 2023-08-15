export interface MapCoordinates {
  lat: number
  lng: number
}

interface TimeExpresssion {
  in_3h: number
  now: number
  in_18h: number
}

export interface IWeatherApiResponse {
  weatherStationId: number
  temperature: TimeExpresssion
  tauTemperature: TimeExpresssion
  bTemperature: TimeExpresssion
  windSpeed: TimeExpresssion
  weatherStationLocation: MapCoordinates
  roadData: RoadConditionData[]
  weatherCondition: TimeExpresssion //STZST
}

export interface RoadConditionData extends TimeExpresssion, MapCoordinates {}

export enum RoadConditionColorCode {
  BAD = '#FF0000',
  GOOD = '#008000',
  OK = '#000000'
}

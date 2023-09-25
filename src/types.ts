export interface MapCoordinates {
  lat: number
  lng: number
}

interface TimeExpression {
  in_3h: number
  now: number
  in_18h: number
}

export interface IWeatherApiResponse {
  weatherStationId: number
  temperature: TimeExpression
  tauTemperature: TimeExpression
  bTemperature: TimeExpression
  windSpeed: TimeExpression
  weatherStationLocation: MapCoordinates
  roadData: RoadConditionData[]
  weatherCondition: TimeExpression //STZST
}

export interface RoadConditionData extends TimeExpression, MapCoordinates {}

export enum RoadConditionColorCode {
  BAD = '#FF0000',
  GOOD = '#008000',
  OK = '#000000'
}

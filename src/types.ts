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
  GREEN = 'green',
  LIGHT_BLUE = '#99ccff',
  VIOLET = 'violet',
  ORANGE = 'orange',
  RED = 'red'
}

export enum RoadCondition {
  BEST = 0,
  GOOD = 1,
  OKAY = 2,
  BAD = 3,
  WORST = 4,
  EXTREME_WORST = 5
}

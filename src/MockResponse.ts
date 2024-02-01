import type { RoadConditionData } from './types'

const roadConditionData: RoadConditionData[] = [
  {
    in_3h: 0,
    now: 1,
    in_18h: 0,
    lat: 37.782551,
    lng: -122.445368
  },
  {
    in_3h: 1,
    now: 2,
    in_18h: 2,
    lat: 37.782745,
    lng: -122.444586
  },
  {
    in_3h: 0,
    now: 2,
    in_18h: 2,
    lat: 37.782842,
    lng: -122.443688
  },
  {
    in_3h: 0,
    now: 3,
    in_18h: 2,
    lat: 37.782919,
    lng: -122.442815
  },
  {
    in_3h: 0,
    now: 0,
    in_18h: 2,
    lat: 37.782992,
    lng: -122.442112
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.7831,
    lng: -122.441461
  },
  {
    in_3h: 0,
    now: 0,
    in_18h: 2,
    lat: 37.783206,
    lng: -122.440829
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.783273,
    lng: -122.440324
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.783316,
    lng: -122.440023
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.783357,
    lng: -122.439794
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.783371,
    lng: -122.439687
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.783368,
    lng: -122.439666
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.783383,
    lng: -122.439594
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.783508,
    lng: -122.439525
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.783842,
    lng: -122.439591
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.784147,
    lng: -122.439668
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.784206,
    lng: -122.439686
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.784386,
    lng: -122.43979
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.784701,
    lng: -122.439902
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.784965,
    lng: -122.439938
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.78501,
    lng: -122.439947
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.78536,
    lng: -122.439952
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.785715,
    lng: -122.44003
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.786117,
    lng: -122.440119
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.786564,
    lng: -122.440209
  },
  {
    in_3h: 0,
    now: 1,
    in_18h: 2,
    lat: 37.786905,
    lng: -122.44027
  }
]

const TimeExpression = {
  in_3h: 9,
  now: 19,
  in_18h: -11
}

export const weatherApiResponse = {
  weatherStationId: 'P1',
  temperature: TimeExpression,
  tauTemperature: TimeExpression,
  bTemperature: TimeExpression,
  windSpeed: TimeExpression,
  weatherStationLocation: {
    lat: 50,
    lng: 40
  },
  roadData: roadConditionData,
  weatherCondition: {
    in_3h: 0,
    now: 1,
    in_18h: 2
  } //STZST
}

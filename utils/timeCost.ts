import { Duration, DurationLikeObject } from 'luxon'

export const getTimeCost = (duration: DurationLikeObject) =>
  Duration.fromObject(duration).toISOTime()

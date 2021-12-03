import { Duration, DurationLikeObject } from 'luxon'

export const formatTimeCost = (duration: DurationLikeObject) =>
  Duration.fromObject(duration).toISOTime()

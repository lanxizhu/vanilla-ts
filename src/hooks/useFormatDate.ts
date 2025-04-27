import dayjs from 'dayjs'
import 'dayjs/locale/en.js'
import 'dayjs/locale/zh-cn.js'
import isYesterday from 'dayjs/plugin/isYesterday.js'
import timezone from 'dayjs/plugin/timezone.js'
import utc from 'dayjs/plugin/utc.js'

dayjs.locale('zh-cn')

dayjs.extend(isYesterday)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('Asia/Shanghai')

export enum FormatType {
  SIMPLE = 'simple',
  COMPLEX = 'complex',
}

/**
 * Formats a date string or object into a Friendly Date Type format.
 * @param date * Formats a date string or object into a human-readable format.
 * @param type * The format type, either 'simple' or 'complex'. 'simple' returns a short format, while 'complex' returns a detailed format.
 * @returns A formatted date string.
 */
export const formatDate = (
  date: string | number | Date | dayjs.Dayjs,
  type: FormatType = FormatType.SIMPLE
): string => {
  const now = dayjs()

  const dateObj = dayjs(date)

  if (dayjs().isSame(dateObj, 'minute')) {
    return type === FormatType.COMPLEX ? dateObj.format('HH:mm') : '刚刚'
  }

  if (dayjs(dateObj).isYesterday()) {
    return dateObj.format(type === FormatType.COMPLEX ? '昨天 HH:mm' : '昨天')
  }

  if (dayjs().isAfter(dateObj, 'minute')) {
    let diff = now.diff(dateObj, 'minute')

    if (diff < 60) {
      return type === FormatType.COMPLEX
        ? `${diff}分钟前`
        : dateObj.format('HH:mm')
    }

    if (diff < 60 * 3) {
      return type === FormatType.COMPLEX
        ? `${Math.floor(diff / 60)}小时前`
        : dateObj.format('HH:mm')
    }

    diff = now.hour(0).diff(dateObj, 'hour')

    if (diff > 0 && diff < 24) {
      return dateObj.format(type === FormatType.COMPLEX ? '昨天 HH:mm' : '昨天')
    }
    if (diff > 24 && diff < 7 * 24) {
      return dateObj.format(type === FormatType.COMPLEX ? 'dddd HH:mm' : 'dddd')
    }

    diff = now.hour(0).diff(dateObj, 'day')

    if (diff > 365) {
      return dateObj.format(
        type === FormatType.COMPLEX ? 'YYYY/MM/DD HH:mm' : 'YYYY/MM/DD'
      )
    }

    if (diff > 7) {
      return dateObj.format(
        type === FormatType.COMPLEX ? 'MM/DD HH:mm' : 'MM/DD'
      )
    }

    return dateObj.format('HH:mm')
  }

  return dayjs(date).format('YYYY/MM/DD HH:mm')
}

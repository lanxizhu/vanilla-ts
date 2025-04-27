import { expect, test } from 'vitest'
import { formatDate, FormatType } from './useFormatDate.ts'
import dayjs from 'dayjs'
// import utc from 'dayjs/plugin/utc.js'
// import timezone from 'dayjs/plugin/timezone.js'

test('now as now', () => {
  const last = dayjs()
  expect(formatDate(last)).toBe('刚刚')
  expect(formatDate(last, FormatType.COMPLEX)).toBe(last.format('HH:mm'))
})

test('10 minutes ago', () => {
  const last = dayjs().subtract(10, 'minute')
  expect(formatDate(last)).toBe(last.format('HH:mm'))
  expect(formatDate(last, FormatType.COMPLEX)).toBe('10分钟前')
})

test('1 hour ago', () => {
  const last = dayjs().subtract(1, 'hour')
  expect(formatDate(last)).toBe(last.format('HH:mm'))
  expect(formatDate(last, FormatType.COMPLEX)).toBe('1小时前')
})

test('yesterday as now', () => {
  const last = dayjs().hour(0).subtract(13, 'hour')
  expect(formatDate(last)).toBe('昨天')
  expect(formatDate(last, FormatType.COMPLEX)).toBe(last.format('昨天 HH:mm'))
})

test('first seven days as now', () => {
  const last = dayjs().hour(0).subtract(58, 'hour')
  expect(formatDate(last)).toBe(last.format('dddd'))
  expect(formatDate(last, FormatType.COMPLEX)).toBe(last.format('dddd HH:mm'))
})

test('last week as now', () => {
  const last = dayjs().hour(0).subtract(8, 'day')
  expect(formatDate(last)).toBe(last.format('MM/DD'))
  expect(formatDate(last, FormatType.COMPLEX)).toBe(last.format('MM/DD HH:mm'))
})

test('last mouth as now', () => {
  const last = dayjs().hour(0).subtract(30, 'day')
  expect(formatDate(last)).toBe(last.format('MM/DD'))
  expect(formatDate(last, FormatType.COMPLEX)).toBe(last.format('MM/DD HH:mm'))
})

test('last year as now', () => {
  const last = dayjs().hour(0).subtract(366, 'day')
  expect(formatDate(last)).toBe(last.format('YYYY/MM/DD'))
  expect(formatDate(last, FormatType.COMPLEX)).toBe(
    last.format('YYYY/MM/DD HH:mm')
  )
})

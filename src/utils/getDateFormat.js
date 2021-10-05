function getDateFormat(date) {
  if (!date) return ''

  const monthNames = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const current = new Date()
  let [year, month, day] = date.split('-')
  year = +year
  month = +month
  day = +day

  let formatDate = `${day} ${monthNames[month]}`

  if (year < current.getFullYear()) formatDate = `${formatDate}, ${year}`
  return formatDate
}

export default getDateFormat

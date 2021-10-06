function getDateFormat(date) {
  if (!date) return ''

  const monthNames = [
    '',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
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

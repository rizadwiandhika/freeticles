function getCurrentDate() {
  const date = new Date().toLocaleDateString().split('T')[0].split('/')

  let [month, day, year] = date
  day = day < 10 ? `0${day}` : day
  month = month < 10 ? `0${month}` : month
  return `${year}-${month}-${day}`
}

export default getCurrentDate

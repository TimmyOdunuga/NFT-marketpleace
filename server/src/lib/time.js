module.exports = {
  getSecondsSince(date) {
    const now = new Date()
    return now - date / 1000
  },
  getMinutesSince(date) {
    const now = new Date()
    return now - date / 1000 / 60
  },
  getHoursSince(date) {
    const now = new Date()
    return now - date / 1000 / 60 / 60
  },
  getDaysSince(date) {
    const now = new Date()
    return now - date / 1000 / 60 / 60 / 24
  },
}

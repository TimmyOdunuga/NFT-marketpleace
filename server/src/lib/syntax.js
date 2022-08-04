module.exports = {
  /**
   * Removes the special characters in a string
   * @param {string} string String to remove special characters from
   * @returns string - special-character-less string
   */
  removeSpecialCharacters(string) {
    return ('' + string).replace(/[^a-zA-Z0-9 ]/g, '')
  },
  /**
   * Removes spaces from string
   * @param {string} string String to remove spaces from
   * @returns string - spaceless string
   */
  removeSpaces(string) {
    return ('' + string).replace(/\s+/g, '')
  },
  /**
   * Checks whether the email is valid or not
   * @param {string} email Email to check if is valid
   * @returns boolean - Whether the email is valid
   */
  isValidEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  },
  /**
   * Formats the given email string. Returns null if it cannot format it.
   * @param {string} email Email to format
   * @returns string - Formatted email lowercased
   */
  formatEmail(email) {
    return ('' + email).toLowerCase()
  },
  /**
   * Formats the given phone number string. Returns null if it cannot format it.
   * @param {string} phone Phone number to format
   * @returns string - Formatted phone number in the form "(234) 567-8900"
   */
  formatPhoneNumber(phone) {
    const cleaned = ('' + phone).replace(/\D/g, '')
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
  },
}

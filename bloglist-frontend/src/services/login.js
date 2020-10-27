import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  try {
    const response = await axios.post(baseUrl, credentials)
    return response.data
  } catch(exception) {
    console.log(exception)
    console.log(exception.message)
    if(exception.message === 'Request failed with status code 401') {
      return null
    }



  }
}

export default { login }
import axios from 'axios'

const baseUrl = 'https://pimex-flex-dot-pimex-ms.uc.r.appspot.com/'
const Pimex = window.Pimex

const registerService = {}

registerService.sendLead = (lead) => {
  return new Promise((resolve, reject) => {
    Pimex.async(lead, (error, res) => {
      if (error) return reject(error)
      axios({
        method: 'post',
        url: `${baseUrl}/sms/2fa/pin.send`, // Send SMS
        headers: {},
        data: {
          leadId: res.data.ID,
        }
      }).then( data => {
        window.localStorage.setItem("leadId", JSON.parse(data.config.data).leadId)
        resolve(data.data)
      })
    })
  })
}

registerService.checkCode = (leadId, pin) => {
  return axios({
    method: 'post',
    url: `${baseUrl}/sms/2fa/pin.check`,
    headers: {},
    data: {
      leadId: leadId,
      pin: pin
    }
  })
}

registerService.allLeads = () => {
  return axios(`${baseUrl}/boards/leads`)
}

registerService.allLeadsWon = () => {
  return axios(`${baseUrl}/boards/leads?state=won`)
}

registerService.allLeadsReserved = () => {
  return axios(`${baseUrl}/boards/leads?state=reservados`)
}

export default registerService

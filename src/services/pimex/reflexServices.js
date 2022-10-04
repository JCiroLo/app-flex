import axios from 'axios'

const baseURL = "https://api.pimex.io/v2"
const idTablero = 48264
const subscription = "sub_JmSiPEAtgpk1Lx"
const apiURL = "https://pimex-flex-dot-pimex-ms.uc.r.appspot.com/"
const Pimex = window.Pimex

const registerServiceFlex = {}

registerServiceFlex.sendLead = (lead) => {

    return new Promise(((resolve, reject) => {
        axios({
            method: 'post',
            url: `${baseURL}/conversions/`,
            headers: {},
            data: lead
        }).then(res => {
            axios({
                method: 'post',
                url: `${apiURL}/sms/2fa/pin.send`, // Send SMS
                headers: {},
                data: {
                    leadId: res.data.data.ID,
                }
            }).then(data => {
                window.localStorage.setItem("leadId", res.data.data.ID)
                resolve(res.data)
            })
        })
    }))

/*    return new Promise((resolve, reject) => {
        Pimex.async(lead, (error, res) => {
            if (error) return reject(error)
            axios({
                method: 'post',
                url: `${apiURL}/sms/2fa/pin.send`, // Send SMS
                headers: {},
                data: {
                    leadId: res.data.ID,
                }
            }).then(data => {
                window.localStorage.setItem("leadId", res.data.ID)
                resolve(res.data)
            })
        })
    })*/
}

registerServiceFlex.allLeads = () => {
    return axios(`${baseURL}/conversions/?project=${idTablero}&subscription=${subscription}`)
}

registerServiceFlex.allLeadsWon = () => {
    return axios(`${baseURL}/conversions/?project=${idTablero}&state=won&subscription=${subscription}`)
}

registerServiceFlex.allLeadsReserved = () => {
    return axios(`${baseURL}/conversions/?project=${idTablero}&state=reservados&subscription=${subscription}`)
}

export default registerServiceFlex

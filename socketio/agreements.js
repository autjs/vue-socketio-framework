class Agm {
	constructor() {
		this.items = {}
	}
	add(k,v) {
		this.items[k] = v
	}
	get(k) {
		return this.items[k] || this.items['noagreement']
	}
}

import noagreement from './handler/noagreement.js'
import socketconnect from './handler/socketconnect.js'
import socketdisconnect from './handler/socketdisconnect.js'
import register from './handler/register.js'

let a = new Agm()
a.add('noagreement', noagreement)
a.add('socketconnect', socketconnect)
a.add('socketdisconnect', socketdisconnect)
a.add('register', register)

export default a
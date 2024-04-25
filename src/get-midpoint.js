const { map } = require('@kmamal/util/array/map')

const mapTo = map.to


const _mid = (a, b) => (b / 2 - a / 2) + a

const getMidpointSingle = ({ type, from, to, values }) => {
	switch (type) {
		case 'real': return _mid(from, to)
		case 'integer': return Math.floor(_mid(from, to))
		case 'ordinal': return Math.floor(values.length / 2)
		case 'nominal': return values[0]
		default: throw new Error("unknown type")
	}
}

const getMidpoint = (domain) => map(domain, getMidpointSingle)

const getMidpointTo = (dst, domain) => mapTo(dst, domain, getMidpointSingle)

getMidpoint.to = getMidpointTo


module.exports = { getMidpoint }

const { map } = require('@kmamal/util/array/map')

const mapTo = map.to


const _halfRange = (a, b) => b / 2 - a / 2

const getHalfRangeSingle = ({ type, from, to, values }) => {
	switch (type) {
		case 'real': return _halfRange(from, to)
		case 'integer': return Math.floor(_halfRange(from, to))
		case 'ordinal': return Math.floor(values.length / 2)
		case 'nominal': return null
		default: throw new Error("unknown type")
	}
}

const getHalfRanges = (domain) => map(domain, getHalfRangeSingle)

const getHalfRangesTo = (dst, domain) => mapTo(dst, domain, getHalfRangeSingle)

getHalfRanges.to = getHalfRangesTo


module.exports = {
	getHalfRangeSingle,
	getHalfRanges,
}

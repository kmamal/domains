const { map } = require('@kmamal/util/array/map')

const mapTo = map.to


const getHalfRangeSingle = ({ type, Algebra: M, from, to, values }) => {
	switch (type) {
		case 'real': {
			const TWO = M.fromNumber(2)
			return M.sub(M.div(to, TWO), M.div(from, TWO))
		}
		case 'integer': {
			const TWO = M.fromNumber(2)
			return Math.floor(M.sub(M.div(to, TWO), M.div(from, TWO)))
		}
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

const { map } = require('@kmamal/util/array/map')

const mapTo = map.to


const getMidpointSingle = ({ type, Algebra: M, from, to, values }) => {
	switch (type) {
		case 'real': {
			const TWO = M.fromNumber(2)
			return M.add(M.div(from, TWO), M.div(to, TWO))
		}
		case 'integer': {
			const TWO = M.fromNumber(2)
			return Math.floor(M.add(M.div(from, TWO), M.div(to, TWO)))
		}
		case 'ordinal': return Math.floor(values.length / 2)
		case 'nominal': return values[0]
		default: throw new Error("unknown type")
	}
}

const getMidpoint = (domain) => map(domain, getMidpointSingle)

const getMidpointTo = (dst, domain) => mapTo(dst, domain, getMidpointSingle)

getMidpoint.to = getMidpointTo


module.exports = { getMidpoint }

const { clamp: clampNumber } = require('@kmamal/util/number/clamp')

const clampSingle = ({ type, from, to, values }, x) => {
	switch (type) {
		case 'real': { return clampNumber(x, from, to) }
		case 'integer': { return clampNumber(x, Math.ceil(from), Math.floor(to)) }
		case 'ordinal': { return clampNumber(x, 0, values.length) }
		case 'nominal': { return x }
		default: throw new Error("unknown type")
	}
}

const __clamp = (dst, domain, vector) => {
	for (let i = 0; i < domain.length; i++) {
		dst[i] = clampSingle(domain[i], vector[i])
	}
}

const clamp = (domain, vector) => {
	const res = new Array(domain.length)
	__clamp(res, domain, vector)
	return res
}

const clampTo = (dst, domain, vector) => {
	dst.length = domain.length
	__clamp(dst, domain, vector)
	return dst
}

const clamp$$$ = (domain, vector) => {
	__clamp(vector, domain, vector)
	return vector
}

clamp.$$$ = clamp$$$
clamp.to = clampTo

module.exports = {
	clampSingle,
	__clamp,
	clamp,
}

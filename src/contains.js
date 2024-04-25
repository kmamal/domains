
const _inBounds = (x, from, to) => from <= x && x <= to

const containsSingle = ({ type, from, to, values }, x) => {
	switch (type) {
		case 'real': { return _inBounds(x, from, to) }
		case 'integer': { return _inBounds(x, from, to) && Math.floor(x) === x }
		case 'ordinal': { return _inBounds(x, 0, values.length) }
		case 'nominal': { return values.contains(x) }
		default: throw new Error("unknown type")
	}
}

const contains = (domain, vector) => {
	for (let i = 0; i < domain.length; i++) {
		if (!containsSingle(domain[i], vector[i])) { return false }
	}
	return true
}

module.exports = {
	containsSingle,
	contains,
}


const containsSingle = ({ type, Algebra: M, from, to, values }, x) => {
	switch (type) {
		case 'real': { return M.lte(from, x) && M.lte(x, to) }
		case 'integer': { return M.lte(from, x) && M.lte(x, to) && M.eq(M.floor(x), x) }
		case 'ordinal': { return 0 <= x && x <= values.length }
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

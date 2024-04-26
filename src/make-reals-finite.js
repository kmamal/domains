const { map } = require('@kmamal/util/array/map')
const { forEach } = require('@kmamal/util/array/for-each')


const makeVariableFinite = (variable) => {
	if (variable.Algebra?.__info.name !== 'js') { return { ...variable } }
	return {
		type: variable.type,
		Algebra: variable.Algebra,
		from: Math.max(-Number.MAX_VALUE, variable.from),
		to: Math.min(Number.MAX_VALUE, variable.to),
	}
}

const makeVariableFinite$$$ = (variable) => {
	if (variable.Algebra?.__info.name !== 'js') { return variable }
	variable.from = Math.max(-Number.MAX_VALUE, variable.from)
	variable.to = Math.min(Number.MAX_VALUE, variable.to)
	return variable
}

makeVariableFinite.$$$ = makeVariableFinite$$$


const makeDomainFinite = (domain) => map(domain, makeVariableFinite)

const makeDomainFinite$$$ = (domain) => forEach(domain, makeVariableFinite$$$)

makeDomainFinite.$$$ = makeDomainFinite$$$


const restoreValueInfinity = (variable, x) => {
	if (variable.Algebra?.__info.name !== 'js') { return x }
	if (x === -Number.MAX_VALUE && variable.from === -Infinity) { return -Infinity }
	if (x === Number.MAX_VALUE && variable.to === Infinity) { return Infinity }
	return x
}


const __restoreVectorInfinities = (dst, domain, vector) => {
	for (let i = 0; i < domain.length; i++) {
		dst[i] = restoreValueInfinity(domain[i], vector[i])
	}
}

const restoreVectorInfinities = (domain, vector) => {
	const { length } = domain
	const res = new Array(length)
	__restoreVectorInfinities(res, domain, vector)
	return res
}

const restoreVectorInfinitiesTo = (dst, domain, vector) => {
	const { length } = domain
	dst.length = length
	__restoreVectorInfinities(dst, domain, vector)
	return dst
}

const restoreVectorInfinities$$$ = (domain, vector) => {
	__restoreVectorInfinities(vector, domain, vector)
	return vector
}

restoreVectorInfinities.$$$ = restoreVectorInfinities$$$
restoreVectorInfinities.to = restoreVectorInfinitiesTo


module.exports = {
	makeVariableFinite,
	makeDomainFinite,
	restoreValueInfinity,
	restoreVectorInfinities,
}

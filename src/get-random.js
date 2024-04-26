const { map } = require('@kmamal/util/array/map')
const { randFloat } = require('@kmamal/util/random/rand-float')
const { randInt } = require('@kmamal/util/random/rand-int')
const { rand } = require('@kmamal/util/random/rand')
const { choose } = require('@kmamal/util/random/choose')

const mapTo = map.to


const getRandomSingle = ({ type, Algebra: M, from, to, values }) => {
	switch (type) {
		case 'real': return M.fromNumber(randFloat(M.toNumber(from), M.toNumber(to)))
		case 'integer': return M.fromNumber(randInt(M.toNumber(from), M.toNumber(to) + 1))
		case 'ordinal': return rand(values.length)
		case 'nominal': return choose(values)
		default: throw new Error("unknown type")
	}
}

const getRandom = (domain) => map(domain, getRandomSingle)

const getRandomTo = (dst, domain) => mapTo(dst, domain, getRandomSingle)

getRandom.to = getRandomTo


module.exports = { getRandom }

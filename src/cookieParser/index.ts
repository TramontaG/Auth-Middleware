import * as T from '@guigalleta/t-parser';

const except = (chars: string) => T.regexMatch(new RegExp(`^[^${chars}]+`));

const exceptColon = except(';');
const exceptEquals = except('=');

const cookieName = exceptEquals;
const cookieValue = exceptColon;

const cookiePair = T.transform(
	T.sequenceOf([cookieName, T.str('='), cookieValue, T.str(';'), T.whiteSpace]),
	({ result }) => ({
		name: result[0],
		value: result[2],
	})
);

const maxAgeLabel = T.str('Max-Age=');
const maxAgeValue = T.digits;

const maxAge = T.transform(
	T.sequenceOf([maxAgeLabel, maxAgeValue, T.str(';'), T.whiteSpace]),
	({ result }) => ({
		maxAge: Number(result[1]),
	})
);

const rest = T.regexMatch(/(.)+/);

const cookieParser = T.transform(
	T.sequenceOf([cookiePair, maxAge, rest]),
	({ result }) => ({
		name: result[0].name,
		value: result[0].value,
		maxAge: result[1].maxAge,
	})
);

const parseCookie = (cookieString: string) => T.parse(cookieString, cookieParser);

export default parseCookie;

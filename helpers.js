import buffer from 'buffer';

const base64 = (message) => buffer.Buffer(message).toString('base64');

export default { base64 };

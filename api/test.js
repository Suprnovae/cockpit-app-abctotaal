import helpers from './helpers';

const handle = 'annemiek@abctotaal.nl';
const secret = 'geheim';
const data = {
  shortname: 'yourco',
  organization: 'Your Company Inc',
  comment: 'Latest numbers for your firm',
  updated_at: '2016-06-09T11:25:05.308+00:00',
  data: [
    {
      actual: 18000,
      description: 'Brutto Inkomen',
      predicted: 23000,
      tablets: [
        { object: 'blue', text: '18K' },
        { text: 'Maart 2016' }
      ],
      unit: 'EUR',
    },
    {
      actual: 15000,
      description: 'Netto inkomen',
      predicted: 12000,
      tablets: [
        { object: 'blue', text: '15K' },
        { text: 'Maart 2016' }
      ],
      unit: 'EUR',
    },
    {
      actual: 1200,
      description: 'Pandhuur',
      predicted: 1200,
      tablets: [
        { object: 'blue', text: '1K2' },
        { text: 'Maart 2016' }
      ],
      unit: 'EUR',
    }
  ]
};
const getOverview = (token) => {
  return new Promise((resolve, reject) => {
    if(token == helpers.base64(`${handle}:${secret}`)) {
      resolve(data);
    } else {
      reject('token required');
    }
  });
};

export default { getOverview };

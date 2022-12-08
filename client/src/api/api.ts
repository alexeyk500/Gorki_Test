const baseUrl = 'http://localhost:5500/api/v1';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const makeFetch = async ({ route, method, body }: { route: string; method: string; body: string }) => {
  const rawResponse = await fetch(`${baseUrl}${route}`, {
    method,
    headers,
    body,
  });
  if (rawResponse.ok) {
    return await rawResponse.json();
  } else {
    throw new Error('Server error');
  }
};

export const fetchLevel = async (cardNum: number) => {
  return await makeFetch({
    route: '/levels',
    method: 'POST',
    body: JSON.stringify({ card: cardNum }),
  });
};

export const fetchDiscount = async (cardNum: number) => {
  return await makeFetch({
    route: '/discounts',
    method: 'POST',
    body: JSON.stringify({ card: cardNum, data: new Date().toISOString() }),
  });
};

export const fetchCardData = async (cardNum: number) => {
  const result = await Promise.all([fetchLevel(cardNum), fetchDiscount(cardNum)]);
  return { level: result[0].level, discount: result[1].percent };
};

export const sendPurchase = async (cardNum: number, summ: number) => {
  return await makeFetch({
    route: '/purchases',
    method: 'POST',
    body: JSON.stringify({ card: cardNum, summ: summ }),
  });
};

export const sendRefund = async (cardNum: number, summ: number) => {
  return await makeFetch({
    route: '/refunds',
    method: 'POST',
    body: JSON.stringify({ card: cardNum, summ: summ }),
  });
};

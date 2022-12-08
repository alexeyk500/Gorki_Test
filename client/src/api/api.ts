const baseUrl = 'http://localhost:5500/api/v1';

export const fetchLevel = async (cardNum: number) => {
  const rawResponseLevel = await fetch(`${baseUrl}/levels`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ card: cardNum }),
  });
  if (rawResponseLevel.ok) {
    return await rawResponseLevel.json();
  } else {
    throw new Error('Server error');
  }
};

export const fetchDiscount = async (cardNum: number) => {
  const rawResponseDiscount = await fetch(`${baseUrl}/discounts`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      card: cardNum,
      data: new Date().toISOString(),
    }),
  });
  if (rawResponseDiscount.ok) {
    return await rawResponseDiscount.json();
  } else {
    throw new Error('Server error');
  }
};

export const fetchCardData = async (cardNum: number) => {
  const result = await Promise.all([fetchLevel(cardNum), fetchDiscount(cardNum)]);
  return { level: result[0].level, discount: result[1].percent };
};

export const sendPurchase = async (cardNum: number, summ: number) => {
  const rawResponse = await fetch(`${baseUrl}/purchases`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      card: cardNum,
      summ: summ,
    }),
  });
  if (rawResponse.ok) {
    return await rawResponse.json();
  } else {
    throw new Error('Server error');
  }
};

export const sendRefund = async (cardNum: number, summ: number) => {
  const rawResponse = await fetch(`${baseUrl}/refunds`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      card: cardNum,
      summ: summ,
    }),
  });
  if (rawResponse.ok) {
    return await rawResponse.json();
  } else {
    throw new Error('Server error');
  }
};

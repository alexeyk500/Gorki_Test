import React, { useState } from 'react';
import classes from '../PurchaseRefundSection.module.css';
import { sendPurchase } from '../../../api/api';

type PropsType = {
  cardNum: number | undefined;
};

const PurchaseSection: React.FC<PropsType> = ({ cardNum }) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [discount, setDiscount] = useState<string | undefined>(undefined);

  const onChangeHandler = () => {
    error && setError(undefined);
    discount && setDiscount(undefined);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    error && setError(undefined);
    discount && setDiscount(undefined);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const purchaseSumm = formData.get('purchaseSumm');
    if (!cardNum) {
      setError(`Карта не введена`);
    } else if (purchaseSumm && Number(purchaseSumm.toString())) {
      const purchaseSummNum = Number(purchaseSumm.toString());
      sendPurchase(cardNum, purchaseSummNum)
        .then((result) => {
          if (result) {
            setDiscount(`Текущая скидка - ${result.percent} %`);
          }
        })
        .catch(() => {
          setError(`Ошибка обмена`);
        });
    } else {
      setError(`Сумма не корректна`);
    }
  };

  return (
    <div className={classes.purchase}>
      <div className={classes.title}>Продажа</div>
      <form onSubmit={onSubmitHandler} className={classes.form}>
        <input
          className={classes.input}
          name={'purchaseSumm'}
          onChange={onChangeHandler}
          placeholder={'Сумма покупки'}
          type="text"
          required={true}
        />
        {error && <div className={classes.error}>{error}</div>}
        {discount && <div className={classes.discountSize}>{discount}</div>}
        <button className={classes.button} type={'submit'}>
          Отправить
        </button>
      </form>
    </div>
  );
};

export default PurchaseSection;

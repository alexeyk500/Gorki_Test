import React, { useState } from 'react';
import classes from './RefundSection.module.css';
import { sendRefund } from '../../../api/api';
import { getSumm } from '../../../utils/functions';

type PropsType = {
  cardNum: number | undefined;
};

const RefundSection: React.FC<PropsType> = ({ cardNum }) => {
  const [discount, setDiscount] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const onChangeHandler = () => {
    error && setError(undefined);
    discount && setDiscount(undefined);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    error && setError(undefined);
    discount && setDiscount(undefined);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const refundSumm = formData.get('refundSumm');
    const refundSummNum = getSumm(refundSumm);
    if (!cardNum) {
      setError(`Карта не введена`);
    } else if (refundSummNum) {
      sendRefund(cardNum, refundSummNum)
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
    <div className={classes.refund}>
      <div className={classes.title}>Возврат</div>
      <form onSubmit={onSubmitHandler} className={classes.form}>
        <input
          className={classes.input}
          name={'refundSumm'}
          onChange={onChangeHandler}
          placeholder={'Сумма возврата'}
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

export default RefundSection;

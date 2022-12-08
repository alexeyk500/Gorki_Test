import React, { useState } from 'react';
import classes from './CardForm.module.css';
import logo from '../../img/logo.svg';
import { fetchCardData } from '../../api/api';

type PropsType = {
  setCardNum: (cardNum: number | undefined) => void;
};

const getCardNumber = (formFieldData: FormDataEntryValue | null) => {
  if (formFieldData) {
    const formFieldDataStr = formFieldData.toString();
    const formFieldDataNum = Number.parseInt(formFieldDataStr);
    if (formFieldDataNum.toString().length === 12 && !isNaN(formFieldDataNum)) {
      return formFieldDataNum;
    }
  }
  return undefined;
};

const CardForm: React.FC<PropsType> = ({ setCardNum }) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [cardLevel, setCardLevel] = useState<string | undefined>(undefined);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    error && setError(undefined);
    cardLevel && setCardLevel(undefined);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cardNumberData = formData.get('cardNumber');
    const cardNum = getCardNumber(cardNumberData);
    if (cardNum) {
      fetchCardData(cardNum)
        .then((result: { level: any; discount: any }) => {
          if (result) {
            setCardNum(cardNum);
            setCardLevel(`${result.level} - ${result.discount} %`);
          } else {
            setError(`Ошибка обмена`);
          }
        })
        .catch(() => {
          setError(`Ошибка обмена`);
        });
    } else {
      setError(`Номер карты \nдолжен сотоять \nиз 12 цифр`);
    }
  };

  const onChangeHandler = () => {
    error && setError(undefined);
    cardLevel && setCardLevel(undefined);
  };

  return (
    <div className={classes.container}>
      <div className={classes.containerLogo}>
        <img src={logo} alt="logo" />
      </div>
      <form onSubmit={onSubmitHandler} className={classes.form}>
        <div className={classes.description}>Номер карты лояльности</div>
        <input
          className={classes.input}
          name={'cardNumber'}
          onChange={onChangeHandler}
          placeholder={'Введите номер'}
          type="text"
          required={true}
        />
        {error && <div className={classes.error}>{error}</div>}
        {cardLevel && <div className={classes.cardLevel}>{cardLevel}</div>}
        <button className={classes.button} type={'submit'}>
          {`Текущий уровень\nи\nразмер скидки`}
        </button>
      </form>
    </div>
  );
};

export default CardForm;

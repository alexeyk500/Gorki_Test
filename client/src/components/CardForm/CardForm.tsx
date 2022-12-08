import React, { useState } from 'react';
import classes from './CardForm.module.css';
import logo from '../../img/logo.svg';
import { fetchCardData } from '../../api/api';

type PropsType = {
  setCardNum: (cardNum: number | undefined) => void;
};

const CardForm: React.FC<PropsType> = ({ setCardNum }) => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [cardLevel, setCardLevel] = useState<string | undefined>(undefined);

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    error && setError(undefined);
    cardLevel && setCardLevel(undefined);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const cardNumber = formData.get('cardNumber');
    if (
      cardNumber &&
      Number.parseInt(cardNumber.toString()).toString().length === 12 &&
      Number.parseInt(cardNumber.toString())
    ) {
      const cardNum = Number.parseInt(cardNumber.toString());
      fetchCardData(cardNum)
        .then((result) => {
          if (result) {
            setCardNum(cardNum);
            setCardLevel(`${result.level} - ${result.discount} %`);
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
          Отправить
        </button>
      </form>
    </div>
  );
};

export default CardForm;

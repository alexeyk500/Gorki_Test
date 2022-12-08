import React, { useState } from 'react';
import classes from './MainPage.module.css';
import CardForm from '../../components/CardForm/CardForm';
import PurchaseRefundSection from '../../components/PurchaseRefundSection/PurchaseRefundSection';

const MainPage: React.FC = () => {
  const [cardNum, setCardNum] = useState<number | undefined>(undefined);

  return (
    <div className={classes.container} data-testid={'mainPageTestId'}>
      <div className={classes.content}>
        <div className={classes.title}>Тестовое задание - ГК Горки</div>
        <CardForm setCardNum={setCardNum} />
        <PurchaseRefundSection cardNum={cardNum} />
      </div>
    </div>
  );
};

export default MainPage;

import React, { useState } from 'react';
import classes from './MainPage.module.css';
import CardForm from '../../components/CardForm/CardForm';
import PurchaseRefundSection from '../../components/PurchaseRefundSection/PurchaseRefundSection';

const MainPage: React.FC = () => {
  const [cardNum, setCardNum] = useState<number | undefined>(undefined);

  return (
    <div className={classes.container} data-testid={'mainPageTestId'}>
      <div className={classes.content}>
        <div className={classes.title}>Тестовое задание для ГК Горка</div>
        <CardForm setCardNum={setCardNum} />
        <PurchaseRefundSection cardNum={cardNum} />
        <div className={classes.bottomTitle}>ast@e-ngineers.com</div>
      </div>
    </div>
  );
};

export default MainPage;

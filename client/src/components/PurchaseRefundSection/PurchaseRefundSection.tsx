import React from 'react';
import classes from './PurchaseRefundSection.module.css';
import PurchaseSection from './PurchaseSection/PurchaseSection';
import RefundSection from './RefundSection/RefundSection';

type PropsType = {
  cardNum: number | undefined;
};

const PurchaseRefundSection: React.FC<PropsType> = ({ cardNum }) => {
  return (
    <div className={classes.container}>
      <PurchaseSection cardNum={cardNum} />
      <RefundSection cardNum={cardNum} />
    </div>
  );
};

export default PurchaseRefundSection;

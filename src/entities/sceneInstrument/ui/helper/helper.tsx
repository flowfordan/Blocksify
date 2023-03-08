import { instrumentsHelpersModel } from 'entities/sceneInstrument';
import React from 'react';
import { HelperInstrItemProps } from './helper.props';
import { observer } from 'mobx-react-lite';
import { CheckMatrix, ListItemCheck } from 'shared/ui';
import { ComplexSlider } from 'components/complex/ComplexSlider/ComplexSlider';

export const HelperInstrItem = observer(({ helperId }: HelperInstrItemProps) => {
  const itemData = instrumentsHelpersModel._getItem(helperId);
  if (!itemData) return null;
  const onItemClick = () => {
    instrumentsHelpersModel.toggleHelperActive(helperId);
  };

  const ItemBody = () => {
    if (itemData.options.controller === 'range') {
      return (
        <ComplexSlider
          minVal={itemData.options.rangeMin}
          maxVal={itemData.options.rangeMax}
          stepVal={itemData.options.rangeStep}
          val={itemData.options.value}
          valName={itemData.options.rangeTitle}
        />
      );
    } else if (itemData.options.controller === 'selection') {
      return <CheckMatrix items={itemData.options.selVariants!} selected={itemData.options.selValues!} />;
    } else return null;
  };
  return (
    <ListItemCheck title={itemData.title} isChecked={itemData.isActive} onDoubleClick={() => onItemClick()}>
      <ItemBody />
    </ListItemCheck>
  );
});

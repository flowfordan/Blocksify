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

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    console.log(newValue);
    if (isNaN(newValue)) return;
    instrumentsHelpersModel.setHelperValue(helperId, newValue);
  };

  const ItemBody = observer(() => {
    if (itemData.options.controller === 'range') {
      return (
        <ComplexSlider
          minVal={itemData.options.rangeMin}
          maxVal={itemData.options.rangeMax}
          stepVal={itemData.options.rangeStep}
          val={itemData.options.value}
          valName={itemData.options.rangeTitle}
          onSliderChange={handleSliderChange}
        />
      );
    } else if (itemData.options.controller === 'selection') {
      return <CheckMatrix items={itemData.options.selVariants!} selected={itemData.options.selValues!} />;
    } else return null;
  });

  return (
    <ListItemCheck title={itemData.title} isChecked={itemData.isActive} onDoubleClick={() => onItemClick()}>
      <ItemBody />
    </ListItemCheck>
  );
});

import React from 'react';
import { observer } from 'mobx-react-lite';
import { CheckMatrix, ComplexSlider, ListItemCheck } from 'shared/ui';
import { sceneEnvModel } from '../model/sceneEnvModel';
import { EnvItemProps } from './envItem.props';

export const EnvItem = observer(({ envItemId }: EnvItemProps) => {
  const itemData = sceneEnvModel._getItem(envItemId);
  if (!itemData) return null;

  const onItemClick = () => {
    sceneEnvModel.toggleSceneEnvItemOptionIsActive(envItemId);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    if (isNaN(newValue)) return;
    sceneEnvModel.setItemValue(envItemId, newValue);
  };

  const handleCollectionUpd = (value: number) => {
    sceneEnvModel.setItemValue(envItemId, value);
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
      return (
        <CheckMatrix
          items={itemData.options.selVariants}
          selected={itemData.options.selValues}
          handleCollectionUpd={handleCollectionUpd}
        />
      );
    } else return null;
  });

  return (
    <ListItemCheck title={itemData.title} isChecked={itemData.isActive} onDoubleClick={() => onItemClick()}>
      <ItemBody />
    </ListItemCheck>
  );
});

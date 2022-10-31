import { FunctionComponent } from "react";
import styles from "./HelpersMenu.module.css";

import { toolsState } from '../../state';
import { observer } from "mobx-react-lite";
import React from "react";
import { Slider } from "../basic/Slider/Slider";
import { ComplexSlider } from "../complex/ComplexSlider/ComplexSlider";
import { ListItemCheck } from "../complex/ListItemCheck/ListItemCheck";
import { CheckMatrix } from "../basic/CheckMatrix/CheckMatrix";
import { Division } from "../basic/Division/Division";
import { Card } from "../basic/Card/Card";

interface HelpersMenuProps {
  test?: boolean;
}

const HelpersMenu: FunctionComponent<HelpersMenuProps> = observer(() => {
  const helperOptions = toolsState.helpersOptions;

  const handleActiveToggle = (helperID: number) => {
    toolsState.toggleHelperActive(helperID);
  };


  const handleCollectionChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: number, value: number) => {
    const isIncluded = e.target.checked;
    toolsState.setValuesCollection(itemId, value, isIncluded);
  };

  const buildItems = (type: string) => {
    return helperOptions.map((item, idx) => {
      return item.type === type? (
        <ListItemCheck key={item.helperID} title={item.name} isChecked={item.isActive} onDoubleClick={() => handleActiveToggle(item.helperID)}>
          {item.isRange &&
            <ComplexSlider minVal={item.rangeMin} maxVal={item.rangeMax} stepVal={item.rangeStep} val={item.value} uiItemId={item.helperID} valName={item.valueName}/>
          }

          {item.isSelection && <CheckMatrix items={item.variants!} selected={item.numbers}/>}
        </ListItemCheck>
      ) : null;
    });
  };

  return (
    <Card className={styles.menu}>
      <Division header="snapping">{buildItems('snap')}</Division>
      <Division header="grid">{buildItems('grid')}</Division>
    </Card>
  );
});

export { HelpersMenu };
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

interface HelpersMenuProps {
  test?: boolean;
}

const HelpersMenu: FunctionComponent<HelpersMenuProps> = observer(() => {
  const helperOptions = toolsState.helpersOptions;

  const handleActiveToggle = (helperID: number) => {
    toolsState.toggleHelperActive(helperID);
    console.log('CLICK');
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

          {item.isSelection &&
          <div className={styles.menuItemAnglesWrapper}>
            <CheckMatrix items={item.variants!} selected={item.numbers}/>
            {/* {item.variants!.map((v, idx) => {
              return (
                <span key={idx} className={styles.menuItemAngles}>
                  <input type="checkbox" checked={item.numbers.indexOf(v) !== -1}
                    onChange={(e) => handleCollectionChange(e, item.helperID, v)}/>
                  <span>{v}</span>
                </span>
              );
            })} */}
          </div>}
        </ListItemCheck>
      ) : null;
    });
  };

  return (
    <div className={styles.menu}>
      <Division>{buildItems('snap')}</Division>
      <Division>{buildItems('grid')}</Division>
      {/* <div className={styles.menuBlock}>
        <div className={styles.menuBlockHeader}>Snapping</div>
        {buildItems('snap')}
      </div>
      <div className={styles.menuBlock}>
        <div className={styles.menuBlockHeader}>Grid</div>
        {buildItems('grid')}
      </div> */}
    </div>
  );
});

export { HelpersMenu };
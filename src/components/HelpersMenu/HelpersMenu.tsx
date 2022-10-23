import { FunctionComponent } from "react";
import styles from "./HelpersMenu.module.css";

import { toolsState } from '../../state';
import { observer } from "mobx-react-lite";
import React from "react";
import { Slider } from "../basic/Slider/Slider";

interface HelpersMenuProps {
  test?: boolean;
}

const HelpersMenu: FunctionComponent<HelpersMenuProps> = observer(() => {
  const obj = {
    d: 5
  };

  const helperOptions = toolsState.helpersOptions;

  const handleActiveToggle = (helperID: number) => {
    toolsState.toggleHelperActive(helperID);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: number) => {
    const newValue = Number(e.target.value);
    toolsState.setHelperValue(itemId, newValue);
  };

  const handleCollectionChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: number, value: number) => {
    const isIncluded = e.target.checked;
    toolsState.setValuesCollection(itemId, value, isIncluded);
  };

  const buildItems = (type: string) => {
    return helperOptions.map((item, idx) => {
      return item.type === type? (
        <div key={item.helperID} className={styles.menuItem}>
          <div className={styles.menuItemCheck}>
            <span>
              <input type="checkbox"
                checked={item.isActive}
                onChange={() => handleActiveToggle(item.helperID)}/>
            </span>
            <span>{item.name}</span>
          </div>

          {item.isRange &&
          <div className={styles.menuItemRange}>
            <span>
              <Slider minVal={item.rangeMin} maxVal={item.rangeMax} stepVal={item.rangeStep} val={item.value} />
              {/* <input type="range"
                min={item.rangeMin} max={item.rangeMax}
                step={item.rangeStep}
                value={item.value}
                onChange={(e) => handleValueChange(e, item.helperID)}/> */}
            </span>
            <span className={styles.menuItemRangeVal}>
              <span>{item.valueName && item.valueName}</span>
              <span>{item.value}</span>
            </span>
          </div>}

          {item.isSelection &&
          <div className={styles.menuItemAnglesWrapper}>
            {item.variants!.map((v, idx) => {
              return (
                <span key={idx} className={styles.menuItemAngles}>
                  <input type="checkbox" checked={item.numbers.indexOf(v) !== -1}
                    onChange={(e) => handleCollectionChange(e, item.helperID, v)}/>
                  <span>{v}</span>
                </span>
              );
            })}
          </div>}
        </div>
      ) : null;
    });
  };

  return (
    <div className={styles.menu}>
      <div className={styles.menuBlock}>
        <div className={styles.menuBlockHeader}>Snapping</div>
        {buildItems('snap')}
      </div>
      <div className={styles.menuBlock}>
        <div className={styles.menuBlockHeader}>Grid</div>
        {buildItems('grid')}
      </div>
    </div>
  );
});

export { HelpersMenu };
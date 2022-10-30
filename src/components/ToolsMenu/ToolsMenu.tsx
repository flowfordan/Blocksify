import { FunctionComponent } from "react";
import styles from "./ToolsMenu.module.css";

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

const ToolsMenu: FunctionComponent<HelpersMenuProps> = observer(() => {
  const helperOptions = toolsState.helpersOptions;

  const tools = toolsState.drawingTools;

  const handleActiveToggle = (helperID: number) => {
    toolsState.toggleHelperActive(helperID);
  };


  const handleCollectionChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: number, value: number) => {
    const isIncluded = e.target.checked;
    toolsState.setValuesCollection(itemId, value, isIncluded);
  };

  const handleToolChange = (id: number) => {
    toolsState.setActiveTool(id);
  };

  return (
    <div className={styles.menu}>
      {tools.map(t => {
        return (
          <ListItemCheck key={t.id} icon={t.name} title={t.name} isChecked={t.active} onClick={() => handleToolChange(t.id)}/>
        );
      })}
    </div>
  );
});

export { ToolsMenu };
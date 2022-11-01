import React from "react";
import { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";

import { toolsState } from '../../state';
import { ListItemCheck } from "../complex/ListItemCheck/ListItemCheck";

import { Card } from "../basic/Card/Card";

import styles from "./ToolsMenu.module.css";

interface HelpersMenuProps {
  test?: boolean;
}

const ToolsMenu: FunctionComponent<HelpersMenuProps> = observer(() => {
  const helperOptions = toolsState.helpersOptions;

  const tools = toolsState.tools;

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
    <Card className={styles.menu}>
      {tools.map(t => {
        if (t.type === 'draw'){
          return (
            <ListItemCheck key={t.id} icon={t.name} title={t.name} isChecked={t.active} onClick={() => handleToolChange(t.id)}/>
          );
        }

      })}
    </Card>
  );
});

export { ToolsMenu };
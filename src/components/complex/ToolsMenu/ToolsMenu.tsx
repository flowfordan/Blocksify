import React from 'react';
import { FunctionComponent } from 'react';
import { observer } from 'mobx-react-lite';

import { instrumentsState } from '../../../shared/model';
import { ListItemCheck } from '../../../shared/ui/ListItemCheck/ListItemCheck';

import { Card } from '../../../shared/ui/Card/Card';

import './toolsMenu.scss';

interface HelpersMenuProps {
  test?: boolean;
}

const ToolsMenu: FunctionComponent<HelpersMenuProps> = observer(() => {
  const helperOptions = instrumentsState.helpersOptions;

  const tools = instrumentsState.tools;

  const handleActiveToggle = (helperID: number) => {
    instrumentsState.toggleHelperActive(helperID);
  };

  const handleCollectionChange = (e: React.ChangeEvent<HTMLInputElement>, itemId: number, value: number) => {
    const isIncluded = e.target.checked;
    instrumentsState.setValuesCollection(itemId, value, isIncluded);
  };

  const handleToolChange = (id: number) => {
    instrumentsState.setActiveTool(id);
  };

  return (
    <>
      {tools.map((t) => {
        if (t.type === 'draw') {
          return (
            <ListItemCheck
              key={t.id}
              icon={t.name}
              title={t.name}
              isChecked={t.active}
              onClick={() => handleToolChange(t.id)}
            />
          );
        }
      })}
    </>
  );
});

export { ToolsMenu };

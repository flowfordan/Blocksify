import React from 'react';
import { observer } from 'mobx-react-lite';
import { Card, Division } from 'shared/ui';
import { SceneEnvOptionType } from 'shared/types';
import { sceneEnvModel } from '../model/sceneEnvModel';
import { EnvItem } from './envItem';

export const EnvOptionsMenu = observer(() => {
  const items = sceneEnvModel.sceneEnvOptions;
  //array of types - divisions
  const itemTypes = items.reduce((acc, cur) => {
    if (acc.includes(cur.type)) return acc;
    const updTypes = [...acc];
    updTypes.push(cur.type);
    return updTypes;
  }, [] as Array<SceneEnvOptionType>);

  return (
    <Card>
      {itemTypes.map((t) => {
        return (
          <Division header={t} key={t}>
            {items.map((i) => {
              if (i.type === t) return <EnvItem key={i.id} envItemId={i.id} />;
            })}
          </Division>
        );
      })}
    </Card>
  );
});

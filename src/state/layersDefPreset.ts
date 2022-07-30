import { getLineMat } from "../three/objs3d";

const layersDefPreset = [
    {
            name: 'Border',
            id: 2,
            active: true,
            empty: true,
            editable: true,
            visible: true,
            material: {
                line: getLineMat(0xFF5E32),
                mesh: 0xFF5E32,
            }
          },
          {
            name: 'Streets',
            id: 3,
            active: false,
            empty: false,
            editable: true,
            visible: true,
            material: {
                line: getLineMat(0x533931),
                mesh: 0x533931,
            }
          },
          {
            name: 'Blocks',
            id: 4,
            active: false,
            empty: true,
            editable: false,
            visible: true,
            material: {
                line: getLineMat(0x533931),
                mesh: 0x533931,
            }
          },
          {
            name: 'Buildings',
            id: 5,
            active: false,
            empty: true,
            editable: false,
            visible: false,
            material: {
                line: getLineMat(0x533931),
                mesh: 0x533931,
            }
          }
]

export { layersDefPreset }
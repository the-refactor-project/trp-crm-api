import { Factory } from "fishery";
import { Types } from "mongoose";

export const createMockItems = <Item>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  factory: Factory<Item, any, Item>,
  number = 2,
): Item[] => factory.buildList(number);

export const createMockItemDatas = <
  Item extends { _id: Types.ObjectId },
  ItemData,
>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  factory: Factory<Item, any, Item>,
  number = 2,
): ItemData[] =>
  createMockItems<Item>(factory, number).map<ItemData>((item) => {
    const newItemData: ItemData = { ...item } as unknown as ItemData;

    delete (newItemData as Partial<Item>)._id;

    return newItemData;
  });

import { DeepPartial, Factory } from "fishery";
import { WithMongoId } from "../types";

export class MockItemsFactory<Item extends WithMongoId, ItemData> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(private factory: Factory<Item, any, Item>) {}

  public createOne(params?: DeepPartial<Item>): Item {
    return this.factory.build(params);
  }

  public createOneItemData(params?: DeepPartial<Item>): ItemData {
    const newItemData = this.createOne(params) as Partial<Item>;

    delete newItemData._id;

    return newItemData as ItemData;
  }

  public createMany(number = 2): Item[] {
    return this.factory.buildList(number);
  }

  public createManyItemData(number = 2): ItemData[] {
    return this.createMany(number).map<ItemData>((item) => {
      const newItemData: ItemData = { ...item } as unknown as ItemData;

      delete (newItemData as Partial<Item>)._id;

      return newItemData;
    });
  }
}

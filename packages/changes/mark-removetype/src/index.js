import { whatMarkTypes } from "@ali/slate-util-what";
import { getMarkType } from "@ali/slate-util-get";

export default (change, type) => {
  // if type exist, remove same type mark
  if (whatMarkTypes(change).has(type)) {
    getMarkType(change, type).forEach(mark => {
      change.removeMark(mark);
    });
  }

  return change;
};

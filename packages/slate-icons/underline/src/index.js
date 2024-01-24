import React, { Component } from "react";
import ToolbarIcon, { markDecorator, markPlugin } from "@ali/slate-icon-shared";
import { UNDERLINE } from "@ali/slate-constant/lib/marks";

export const UnderlinePlugin = opt => {
  const options = Object.assign(
    {
      type: UNDERLINE,
      tagName: "u"
    },
    opt
  );

  return markPlugin(options, "cmd+u");
};
@markDecorator(UNDERLINE, "Underline")
export default class Underline extends Component {
  render() {
    return <ToolbarIcon {...this.props} />;
  }
}

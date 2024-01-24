import React, { Component } from "react";
import pluginListDecorator from "./pluginListDecorator";
import ToolbarIcon from "@ali/slate-icon-shared";
import { UL_LIST } from "@ali/slate-constant/lib/blocks";

@pluginListDecorator(UL_LIST, "ListBullet")
export default class UlList extends Component {
  render() {
    return <ToolbarIcon {...this.props} />;
  }
}

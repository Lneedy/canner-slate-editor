// @flow
import * as React from "react";
import type { Value, Change } from "slate";
import { Icon, Modal } from "antd";
import { Editor } from "slate-react";
import EditPrism from "slate-prism";
import EditBlockquote from "slate-edit-blockquote";
import EditList from "slate-edit-list";
import PluginEditCode from "slate-edit-code";
import { DEFAULT as DEFAULT_LIST } from "@ali/slate-helper-block-list";
import BLOCKS from "markup-it/lib/constants/blocks";
import MARKS from "markup-it/lib/constants/marks";
import INLINES from "markup-it/lib/constants/inlines";

// blocks
import { BlockquotePlugin } from "@ali/slate-icon-blockquote";
import { ListPlugin } from "@ali/slate-icon-list";
import { CodeBlockPlugin } from "@ali/slate-icon-codeblock";
import { HrPlugin } from "@ali/slate-icon-hr";
import { LinkPlugin } from "@ali/slate-icon-link";
import { ImagePlugin } from "@ali/slate-icon-image";
import {
  HeaderOnePlugin,
  HeaderTwoPlugin,
  HeaderThreePlugin,
  HeaderFourPlugin,
  HeaderFivePlugin,
  HeaderSixPlugin
} from "@ali/slate-icon-header";
import { ParagraphPlugin } from "@ali/slate-icon-shared";

// marks plugin
import { BoldPlugin } from "@ali/slate-icon-bold";
import { CodePlugin } from "@ali/slate-icon-code";
import { StrikeThroughPlugin } from "@ali/slate-icon-strikethrough";
import { UnderlinePlugin } from "@ali/slate-icon-underline";
import { ItalicPlugin } from "@ali/slate-icon-italic";

import mdPlugin from "@ali/slate-md-plugin";
import copyPastePlugin from "@ali/slate-paste-html-plugin";
import "prismjs/themes/prism.css";
import "github-markdown-css";
import HelpMenu from "@ali/slate-editor-help";
import styled from "styled-components";

export const MarkdownPlugin = mdPlugin;

const Helper = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 18px;
  cursor: pointer;
  color: #ccc;
`;

export default (opt: { [string]: any } = {}) => {
  const options = Object.assign(
    {
      markdownOption: {
        blocks: Object.assign(BLOCKS, opt.blocks),
        marks: Object.assign(MARKS, opt.marks),
        inlines: Object.assign(INLINES, opt.inlines)
      },
      prismOption: {
        onlyIn: node => node.type === BLOCKS.CODE,
        getSyntax: node => node.data.get("syntax")
      },
      codeOption: {
        onlyIn: node => node.type === BLOCKS.CODE
      },
      blockquoteOption: {},
      listOption: DEFAULT_LIST
    },
    opt
  );

  const mdEditorPlugins = [
    MarkdownPlugin(options.markdownOption),
    EditPrism(options.prismOption),
    PluginEditCode(options.codeOption),
    EditBlockquote(options.blockquoteOption),
    EditList(options.listOption),
    BlockquotePlugin(options.blockquoteOption),
    ListPlugin(options.listOption),
    CodeBlockPlugin(options.codeOption),
    HrPlugin(),
    LinkPlugin(),
    ImagePlugin(),
    HeaderOnePlugin(),
    HeaderTwoPlugin(),
    HeaderThreePlugin(),
    HeaderFourPlugin(),
    HeaderFivePlugin(),
    HeaderSixPlugin(),
    ParagraphPlugin(),
    BoldPlugin(),
    CodePlugin(),
    StrikeThroughPlugin(),
    UnderlinePlugin(),
    ItalicPlugin(),
    copyPastePlugin()
  ];

  type Props = {
    value: Value,
    onChange: (change: Change) => void
  };

  type State = {
    showMenu: boolean
  };

  return class MdEditor extends React.Component<Props, State> {
    constructor(props) {
      super(props);
      this.plugins = [...mdEditorPlugins, ...(this.props.plugins || [])];
    }

    state = {
      showMenu: false
    };

    changeVisibleMenu = (visible: boolean) => {
      this.setState({ showMenu: visible });
    };

    render() {
      const { showMenu } = this.state;
      const { value, onChange, plugins, ...rest } = this.props; // eslint-disable-line
      return (
        <div className="markdown-body" style={{ position: "relative" }}>
          <Editor
            value={value}
            plugins={this.plugins}
            onChange={onChange}
            {...rest}
          />
          <Helper onClick={() => this.changeVisibleMenu(true)}>
            <Icon type="question-circle" theme="outlined" />
            <span style={{ fontSize: "15px", marginLeft: "5px" }}>Help</span>
          </Helper>
          <Modal
            visible={showMenu}
            style={{ width: "800px" }}
            footer={null}
            onCancel={() => this.changeVisibleMenu(false)}
            title="Help Menu"
          >
            <HelpMenu />
          </Modal>
        </div>
      );
    }
  };
};

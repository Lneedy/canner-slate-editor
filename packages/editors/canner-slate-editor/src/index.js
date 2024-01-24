// @flow
import * as React from "react";
import { Editor } from "slate-react";
import type { Value, Change } from "slate";
import styled from "styled-components";
import Toolbar from "./menuToolbar";
import toolbar from "@ali/slate-toolbar";
import sidebar from "@ali/slate-sidebar";
import { MarkdownPlugin } from "slate-md-editor";
import { BLOCKS } from "@ali/slate-constant";
import copyPastePlugin from "@ali/slate-paste-html-plugin";

import Blockquote, { BlockquotePlugin } from "@ali/slate-icon-blockquote";
import Bold, { BoldPlugin } from "@ali/slate-icon-bold";
import Code, { CodePlugin } from "@ali/slate-icon-code";
import Clean from "@ali/slate-icon-clean";
import { CodeBlockPlugin } from "@ali/slate-icon-codeblock";
import { TablePlugin } from "@ali/slate-icon-table";
import { FontBgColorPlugin } from "@ali/slate-icon-fontbgcolor";
import { FontColorPlugin } from "@ali/slate-icon-fontcolor";
import {
  Header1,
  Header2,
  HeaderOnePlugin,
  HeaderTwoPlugin,
  HeaderThreePlugin
} from "@ali/slate-icon-header";
import Hr, { HrPlugin } from "@ali/slate-icon-hr";
import { ImagePlugin } from "@ali/slate-icon-image";
import Italic, { ItalicPlugin } from "@ali/slate-icon-italic";
import { LinkPlugin } from "@ali/slate-icon-link";
import { OlList, UlList, ListPlugin } from "@ali/slate-icon-list";
import StrikeThrough, {
  StrikeThroughPlugin
} from "@ali/slate-icon-strikethrough";
import Underline, { UnderlinePlugin } from "@ali/slate-icon-underline";
import { VideoPlugin } from "@ali/slate-icon-video";
import { ParagraphPlugin } from "@ali/slate-icon-shared";

import EditList from "slate-edit-list";
import EditBlockquote from "slate-edit-blockquote";

import EditPrism from "slate-prism";
import EditCode from "slate-edit-code";
import TrailingBlock from "slate-trailing-block";

import "prismjs/themes/prism.css";

// default value
import { DEFAULT as DEFAULTLIST } from "@ali/slate-helper-block-list";
import { DEFAULT as DEFAULTBLOCKQUOTE } from "@ali/slate-helper-block-quote";

import "github-markdown-css";

const plugins = [
  MarkdownPlugin(),
  EditPrism({
    onlyIn: node => node.type === "code_block",
    getSyntax: node => node.data.get("syntax")
  }),
  EditCode({
    onlyIn: node => node.type === "code_block"
  }),
  TrailingBlock(),
  EditList(DEFAULTLIST),
  EditBlockquote(DEFAULTBLOCKQUOTE),
  ParagraphPlugin(),
  BlockquotePlugin(),
  BoldPlugin(),
  CodePlugin(),
  CodeBlockPlugin(),
  FontBgColorPlugin({
    backgroundColor: mark =>
      mark.data.get("color") && mark.data.get("color").color
  }),
  FontColorPlugin({
    color: mark => mark.data.get("color") && mark.data.get("color").color
  }),
  ItalicPlugin(),
  StrikeThroughPlugin(),
  UnderlinePlugin(),
  HeaderOnePlugin(),
  HeaderTwoPlugin(),
  HeaderThreePlugin(),
  TablePlugin(),
  HrPlugin(),
  ImagePlugin(),
  LinkPlugin(),
  ListPlugin(),
  VideoPlugin(),
  copyPastePlugin()
];

type Props = {
  readOnly: boolean,
  menuToolbarOption: { [string]: any }[],
  value: Value,
  onChange: (change: Change) => void,
  serviceConfig?: any,
  galleryConfig?: any
};

type EditorProps = {
  readOnly: boolean,
  value: Value,
  onChange: (change: Change) => void,
  serviceConfig?: any,
  galleryConfig?: any
};

type State = {
  isFull: boolean
};

const Container = styled.div`
  ${props =>
    props.isFull &&
    `
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000
  `} background-color: #FFF;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 1px 1px rgba(0, 0, 0, 0.16);
  overflow-y: ${props => (props.isFull ? "scroll" : "hidden")};
  overflow-x: hidden;
`;

const EditorContainer = styled.div`
  padding: 25px;
  margin-top: ${props => (props.isFull ? "60px" : "10px")};
`;

const FixedToolbar = styled.div`
  position: fixed;
  top: 10px;
  z-index: 10;
  width: 100%;
`;

const toolbarOptions = {
  icons: [Bold, Italic, StrikeThrough, Underline, Code, Clean],
  position: "top",
  disabledTypes: [
    BLOCKS.CODE,
    BLOCKS.CODE_LINE,
    BLOCKS.HEADING_1,
    BLOCKS.HEADING_2,
    BLOCKS.HEADING_3,
    BLOCKS.HEADING_4,
    BLOCKS.HEADING_5,
    BLOCKS.HEADING_6
  ]
};

const sidebarOptions = {
  icons: [
    {
      icon: OlList,
      title: "Order List"
    },
    {
      icon: UlList,
      title: "Unorder List"
    },
    {
      icon: Header1,
      title: "Header One"
    },
    {
      icon: Header2,
      title: "Header Two"
    },
    {
      icon: Hr,
      title: "Ruler"
    },
    {
      icon: Blockquote,
      title: "Blockquote"
    }
  ]
};

export default class EditorComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isFull: false
    };
  }

  goFull = () => {
    this.setState({ isFull: !this.state.isFull });
  };

  render() {
    const {
      value,
      onChange,
      serviceConfig,
      galleryConfig,
      menuToolbarOption,
      readOnly,
      ...rest
    } = this.props;
    const { isFull } = this.state;

    return readOnly ? (
      <CannerEditor value={value} onChange={arg => arg} readOnly={readOnly} />
    ) : (
      <Container isFull={isFull} {...rest}>
        <div style={{ position: "relative" }}>
          {isFull ? (
            <FixedToolbar>
              <Toolbar
                isFull={true}
                value={value}
                serviceConfig={serviceConfig}
                galleryConfig={galleryConfig}
                menuToolbarOption={menuToolbarOption}
                onChange={onChange}
                goFull={this.goFull}
              />
            </FixedToolbar>
          ) : (
            <Toolbar
              serviceConfig={serviceConfig}
              galleryConfig={galleryConfig}
              menuToolbarOption={menuToolbarOption}
              value={value}
              onChange={onChange}
              goFull={this.goFull}
            />
          )}
          <EditorContainer isFull={isFull}>
            <CannerEditor
              value={value}
              onChange={onChange}
              readOnly={readOnly}
            />
          </EditorContainer>
        </div>
      </Container>
    );
  }
}

@toolbar(toolbarOptions)
@sidebar(sidebarOptions)
class CannerEditor extends React.Component<EditorProps> {
  shouldComponentUpdate(nextProps: EditorProps) {
    if (this.props.value === nextProps.value) return false;
    return true;
  }

  render() {
    const { value, onChange, readOnly } = this.props;
    return (
      <Editor
        className="markdown-body"
        value={value}
        readOnly={readOnly}
        onChange={onChange}
        plugins={plugins}
      />
    );
  }
}

import React, { Component } from "react";
import ReactQuill from "react-quill";

class MallorarRTE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorHtml: this.props.initial,
      theme: "snow",
      notdlp: true,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (this.props.initial !== this.state.editorHtml && this.state.notdlp) {
      this.setState({
        editorHtml: this.props.initial,
        notdlp: false,
      });
    }
  }

  handleChange(html) {
    this.setState({ editorHtml: html });

    if (this.props.type === "review") {
      this.props.ohtml(html);
    }
    if (this.props.type === "description") {
      this.props.ohtml(html);
    }
  }

  handleThemeChange(newTheme) {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme });
  }

  render() {
    if (this.props.type === "description") {
      return (
        <ReactQuill
          className={
            "ml-quill-p-0 text-dark t16 ml-quill-input ml-quill-toolbar-rounded-borders"
          }
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={MallorarRTE.modules}
          formats={MallorarRTE.formats}
          bounds={".app"}
          placeholder="Description here.."
        />
      );
    }
    if (this.props.type === "review") {
      return (
        <ReactQuill
          className={"ml-quill-p-0 ml-quill-leave-toolbar-borders"}
          theme={"bubble"}
          onChange={this.handleChange}
          modules={MallorarRTE.reviewmodules}
          formula={MallorarRTE.formats}
          value={this.state.editorHtml}
          bounds={".app"}
          placeholder="Write your review here.."
        />
      );
    }

    return (
      <div>
        <ReactQuill
          className={this.props.output ? "ml-quill-p-0" : ""}
          readOnly={this.props.output ? true : false}
          theme={this.props.output ? "bubble" : "snow"}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={MallorarRTE.modules}
          formats={MallorarRTE.formats}
          // bounds={".app"}
          placeholder={this.props.placeholder}
        />
      </div>
    );
  }
}

/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */

MallorarRTE.reviewmodules = {
  toolbar: [
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "image"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

MallorarRTE.modules = {
  toolbar: [
    [{ header: [] }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */

MallorarRTE.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default MallorarRTE;

import { createContext, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import Alert from "editorjs-alert";
import List from "@editorjs/list";
import axios from "axios";
import Embed from "@editorjs/embed";
import Underline from "@editorjs/underline";
import ChangeCase from "editorjs-change-case";
import Strikethrough from "@sotaproject/strikethrough";
import Checklist from "@editorjs/checklist";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import ColorPlugin from "editorjs-text-color-plugin";
import AlignmentBlockTune from "editorjs-text-alignment-blocktune";
import TextVariantTune from "@editorjs/text-variant-tune";
import DragDrop from "editorjs-drag-drop";
import NestedList from "@editorjs/nested-list";
import editorjsNestedChecklist from "@calumk/editorjs-nested-checklist";
import AttachesTool from "@editorjs/attaches";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";

export const EditorContext = createContext();
// const handleReady = (editor) => {
//     new Undo({ editor });

//     new DragDrop(editor);
//   };

function EditorContextProvider(props) {
  const editorInstanceRef = useRef(null);
  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      placeholder: "Let's take a note!",
      onReady: () => {
        new DragDrop(editor);
      },

      tools: {
        textAlignment: {
          class: AlignmentBlockTune,
          config: {
            default: "left",
            blocks: {
              header: "center",
            },
          },
        },
        paragraph: {
          class: Paragraph,
          tunes: ["textAlignment"],
        },
        header: {
          class: Header,
          inlineToolbar: true,
          tunes: ["textAlignment"],
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3, 4, 5],
            defaultLevel: 2,
          },
        },
        alert: {
          class: Alert,
          config: {
            defaultType: "primary",
            messagePlaceholder: "Enter something",
          },
        },
        attaches: {
          class: AttachesTool,
          config: {
            uploader: {
              async uploadByFile(file) {
                // your own uploading logic here
                const formData = new FormData();
                formData.append("file", file);

                const response = await axios.post(
                  `http://localhost:7000/blogLy/api/u`,
                  formData,
                  {
                    headers: {
                      "Content-Type": "multipart/form-data",
                    },
                    withCredentials: false,
                  }
                );
                console.log(response, "resppp");
                if (response.data.success === 1) {
                  console.log("attches", response.data);
                  return response.data;
                }
              },
            },
          },
        },

        // list: {
        //   class: List,
        //   config: {
        //     defaultStyle: "unordered",
        //   },
        // },
        nestedchecklist: editorjsNestedChecklist,

        list: {
          class: NestedList,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        checklist: {
          class: Checklist,
        },
        embed: {
          class: Embed,
          config: {
            services: {
              youtube: true,
              codepen: true,
              google: true,
            },
          },
        },
        underline: {
          class: Underline,
        },
        strikethrough: {
          class: Strikethrough,
        },
        Marker: {
          class: Marker,
        },
        InlineCode: {
          class: InlineCode,
        },
        changeCase: {
          class: ChangeCase,
        },
        Color: {
          class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
          config: {
            colorCollections: [
              "#EC7878",
              "#9C27B0",
              "#673AB7",
              "#3F51B5",
              "#0070FF",
              "#03A9F4",
              "#00BCD4",
              "#4CAF50",
              "#8BC34A",
              "#CDDC39",
              "#FFF",
            ],
            defaultColor: "#CDDC39",
            type: "text",
            customPicker: true,
          },
        },
        // Marker: {
        //   class: ColorPlugin, // if load from CDN, please try: window.ColorPlugin
        //   config: {
        //     defaultColor: "#FFBF00",
        //     type: "marker",
        //     icon: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M17.6,6L6.9,16.7c-0.2,0.2-0.3,0.4-0.3,0.6L6,23.9c0,0.3,0.1,0.6,0.3,0.8C6.5,24.9,6.7,25,7,25c0,0,0.1,0,0.1,0l6.6-0.6 c0.2,0,0.5-0.1,0.6-0.3L25,13.4L17.6,6z"></path> <path d="M26.4,12l1.4-1.4c1.2-1.2,1.1-3.1-0.1-4.3l-3-3c-0.6-0.6-1.3-0.9-2.2-0.9c-0.8,0-1.6,0.3-2.2,0.9L19,4.6L26.4,12z"></path> </g> <g> <path d="M28,29H4c-0.6,0-1-0.4-1-1s0.4-1,1-1h24c0.6,0,1,0.4,1,1S28.6,29,28,29z"></path> </g> </g></svg>`,
        //   },
        // },
        textVariant: TextVariantTune,
        quote: {
          class: Quote,
          inlineToolbar: true,
          shortcut: "CMD+SHIFT+O",
          config: {
            quotePlaceholder: "Enter a quote",
            captionPlaceholder: "Quote's author",
          },
        },
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 2,
            cols: 3,
          },
        },
      },
      tunes: ["textVariant"],
      onChange: async () => {
        console.log(editor);
        const data = await editor.save();
        console.log(data);
      },
    });
    editorInstanceRef.current = editor;
  };
  return (
    <EditorContext.Provider value={{ initEditor, editorInstanceRef }}>
      {props.children}
    </EditorContext.Provider>
  );
}
export default EditorContextProvider;

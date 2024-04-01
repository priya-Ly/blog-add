import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import EditorModal from "./components/EditorModal";
import Card from "./components/Card";
import Masonry from "react-masonry-css";

function App() {
  const dummyNotes = [
    {
      title: "Header2",
      body: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero",
      id: 4,
    },
    {
      title: "Header1",
      body: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero",
      id: 3,
    },
    {
      title: "Header2",
      body: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero",
      id: 4,
    },
    {
      title: "Header2",
      body: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero",
      id: 4,
    },
    {
      title: "Header2",
      body: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero",
      id: 4,
    },
    {
      title: "Header2",
      body: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero",
      id: 4,
    },
    {
      title: "Header2",
      body: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero",
      id: 4,
    },
    {
      title: "Header2",
      body: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero",
      id: 4,
    },
    {
      title: "Header2",
      body: "Lorem ipsum, or lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts of Cicero",
      id: 4,
    },
  ];
  return (
    <>
      <EditorModal />
      <div className="container text-center mt-5">
        <Masonry
          breakpointCols={{ default: 3, 1200: 2, 768: 1 }}
          className="my-masonry-grid d-flex"
          columnClassName="my-masonry-grid_column"
        >
          {dummyNotes.map((note) => {
            return (
              <Card
                title={note.title}
                body={note.body}
                idx={note.id}
                key={note.id}
              />
            );
          })}
        </Masonry>
        <Card />
      </div>
      <div className="position-fixed bottom-0  end-0 m-4 z-2">
        <button
          className="btn btn-primary d-flex align-items-center"
          data-bs-toggle="modal"
          data-bs-target="#editormodal"
        >
          <span className="pe-2">New Note</span>
          <i class="bi bi-journal-bookmark"></i>
        </button>
      </div>
    </>
  );
}

export default App;

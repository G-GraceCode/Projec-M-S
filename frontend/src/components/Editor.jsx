import ReactQuill from "react-quill";

export default function Editor({ value, onChange }) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [{ font: [] }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };
  return (
    <div style={{ background: "var(--natural-white)" }}>
      <ReactQuill
        value={value}
        theme={"snow"}
        onChange={onChange}
        modules={modules}
        placeholder={"Write something..."}
      />
    </div>
  );
}

export const insertAtCaret = (
  field: HTMLTextAreaElement,
  val: string
): void => {
  // For browsers like Firefox and Webkit based
  if (field.selectionStart || field.selectionStart === 0) {
    const startPos = field.selectionStart;
    const endPos = field.selectionEnd || 0;
    const scrollTop = field.scrollTop;

    field.value =
      field.value.substring(0, startPos) +
      val +
      field.value.substring(endPos, field.value.length);
    field.focus();
    field.selectionStart = startPos + val.length;
    field.selectionEnd = startPos + val.length;
    field.scrollTop = scrollTop;
  } else {
    field.focus();
    field.value += val;
  }
};

export const onPasteFactory = (
  editorRef: { current: HTMLTextAreaElement },
  uploadImage: (file: File) => Promise<string>,
  insertAtCaret: (field: HTMLTextAreaElement, val: string) => void,
  onChange: (event: { target: HTMLTextAreaElement }) => void
) => ({ clipboardData }: ClipboardEvent): void => {
  const field = editorRef.current;

  const files: File[] = [];

  if (clipboardData) {
    const { items } = clipboardData;

    if (items && items.length) {
      // 检索剪切板 items
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          files.push(items[i].getAsFile() as File);
          break;
        }
      }
    }
  }

  if (files.length) {
    files.forEach((file) => {
      const uploadText = `![Uploading ${file['name']}]()`;

      insertAtCaret(field, uploadText);

      void Promise.resolve()
        .then(() => uploadImage(file))
        .then((url) => {
          field.value = field.value.replace(
            uploadText,
            `\r\n![${file.name}](${url})`
          );
          onChange({ target: field });
        });
    });
  }
};

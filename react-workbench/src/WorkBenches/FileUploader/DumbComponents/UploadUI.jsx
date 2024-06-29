import { useState } from 'react';
import './uploadUI.css';

/**
 * TODOS:
 * 1. Need to add file extension verification for whitelisted files.
 * 2. Need to add file size verification for files
 */

const noOpFunc = () => {};
const preventEventDefaultAndPropagation = (event) => {
  event.stopPropagation();
  event.preventDefault();

  return event;
};
/**
 * This is a simple component that will handle the state for the UI of the component.
 * You can style the component directly to create a library of UploadUI components.
 * It handles simple logic like white listing files and file sizes
 *
 * @param {String} acceptFiles: This will be a string delimited by commas.
 * The string would list whitelisted files allowed for upload. Example value "image/*,.pdf"
 * @returns
 */

/**
 * TODO:
 *
 * 1.maybe taking a fileInputProps param
 * 2. forward props, this would me all other values outside of props would be applied to "ui shape
 */
const defaultFileInputProps = {
  acceptFiles: '',
  multiple: false,
};
const UploadUI = ({
  fileUploadProps = defaultFileInputProps,
  onDragEnter = noOpFunc,
  onDragOver = noOpFunc,
  onDragLeave = noOpFunc,
  onChange = noOpFunc,
  onDrop = noOpFunc,
  id = null,
  children,
  fileInputRef = null,
  style = {},
  isDragOverStyle = {},
  className = 'generic-upload',
  isDragOverClassName = null,
}) => {
  const [dropDepth, setDropDepth] = useState(0);

  const { acceptFiles, multiple } = fileUploadProps;

  const isDragOver = dropDepth > 0;

  const appliedStyle = !isDragOver ? style : { ...style, ...isDragOverStyle };

  const appliedIsDragOverClassName = isDragOverClassName ?? 'generic-dragover';

  const appliedClassName = !isDragOver
    ? className
    : `${className} ${appliedIsDragOverClassName}`;

  const dragEnterHandler = (e) => {
    const modifiedEvent = preventEventDefaultAndPropagation(e);
    setDropDepth((prev) => ++prev);
    onDragEnter(modifiedEvent);
  };

  const dragOverHandler = (e) => {
    const modifiedEvent = preventEventDefaultAndPropagation(e);
    onDragOver(modifiedEvent);
  };

  const dragLeaveHandler = (e) => {
    const modifiedEvent = preventEventDefaultAndPropagation(e);
    setDropDepth((prev) => --prev);
    onDragLeave(modifiedEvent);
  };

  const onChangeHandler = (e) => {
    const modifiedEvent = preventEventDefaultAndPropagation(e);
    const files = modifiedEvent.target.files;
    onChange(files, modifiedEvent);
  };

  const dropHandler = (e) => {
    const modifiedEvent = preventEventDefaultAndPropagation(e);

    const files = modifiedEvent.dataTransfer.files;
    onDrop(files, modifiedEvent);
    setDropDepth(0);
  };

  return (
    <div>
      <div>
        <input
          ref={fileInputRef}
          className="visually-hidden"
          id={id}
          type="file"
          accept={acceptFiles}
          multiple={multiple}
        />

        {/* Label here will act as our interface for the file input */}
        {fileInputRef ? (
          <div
            onDragEnter={dragEnterHandler}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDrop={dropHandler}
            onChange={onChangeHandler}
            htmlFor={id}
            style={appliedStyle}
            className={appliedClassName}
          >
            {children}
          </div>
        ) : (
          <label
            onDragEnter={dragEnterHandler}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
            onDrop={dropHandler}
            onChange={onChangeHandler}
            htmlFor={id}
            style={appliedStyle}
            className={appliedClassName}
          >
            {children}
          </label>
        )}
      </div>
    </div>
  );
};

export default UploadUI;

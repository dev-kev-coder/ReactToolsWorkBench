import { useRef } from 'react';
import UploadUI from './DumbComponents/UploadUI';

{
  /* <h4 style={{ backgroundColor: 'red' }}>Child</h4>
<h4 style={{ backgroundColor: 'red' }}>Child</h4>
<h4 style={{ backgroundColor: 'red' }}>Child</h4>
<h4 style={{ backgroundColor: 'red' }}>Child</h4> */
}

const FileUploaderWorkbench = () => {
  const testRef = useRef(null);
  return (
    <section style={{ backgroundColor: 'whitesmoke' }}>
      <h1>File Uploader WorkBench</h1>

      <UploadUI id={'some-id'}>
        <UploadUI id={'some-id'}>test</UploadUI>
        <UploadUI id={'some-id'}>test</UploadUI>
        <UploadUI id={'some-id'}>test</UploadUI>
        <UploadUI id={'some-id'}>test</UploadUI>
      </UploadUI>
    </section>
  );
};

export default FileUploaderWorkbench;

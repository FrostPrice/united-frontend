import { useState } from "react";
import { useDispatch } from "react-redux";
import { uploadFile } from "../../store/assessmentSlice"; // Assumindo que você criará essa action no slice

const UploadModal = ({ isOpen, onClose, assessmentId }) => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      dispatch(uploadFile({ assessmentId, formData }));
      onClose();
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Upload File
          </h3>
          <div className="mt-2 px-7 py-3">
            <form onSubmit={handleSubmit}>
              <input type="file" onChange={handleFileChange} />
              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Upload
                </button>
                <button
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;

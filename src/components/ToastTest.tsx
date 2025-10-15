import toast, { Toaster } from "react-hot-toast";

export default function ToastTest() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Toast Test</h2>
      <div className="space-x-2">
        <button 
          onClick={() => toast.success("Success toast!")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Success Toast
        </button>
        <button 
          onClick={() => toast.error("Error toast!")}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Error Toast
        </button>
        <button 
          onClick={() => toast.custom((t) => (
            <div className="bg-blue-500 text-white p-4 rounded">
              Custom Toast: {t.visible ? "Visible" : "Hidden"}
            </div>
          ))}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Custom Toast
        </button>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

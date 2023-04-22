import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { storage } from '../services/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useAlert } from 'react-alert'
import Loading from 'react-fullscreen-loading';

import { usePostData } from '../hooks/usePostData'

export default function FeedUpload() {
    const [file, setFile] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const alert = useAlert();
    const { mutate: addPost } = usePostData();

    const uploadFile = async () => {

        if (file == null) {
            alert.error("Please select a file to upload");
            return;
        }
        if ("jpg|jpeg|png|svg".indexOf(file.type.split("/")[1]) == -1) {
            alert.error("Please select a valid image file");
            return;
        }
        setLoading(true);
        const name = new Date().getTime() + file.name;
        const storageRef = ref(storage, name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        await uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                        // console.log("Upload is paused");
                        break;
                    case "running":
                        // console.log("Upload is running");
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                console.log(error);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    addPost({ image_url: downloadURL })
                    alert.success("Post uploaded successfully");
                    setFile(null);
                    setLoading(false);
                });
            }
        );
    };

    useEffect(() => {

        if (file == null) {
            setShowModal(false)
        } else {
            if ("jpg|jpeg|png|svg".indexOf(file.type.split("/")[1]) == -1) {
                alert.error("Please select a valid image file");
                setFile(null);
                return;
            }
            setShowModal(true)
        }
    }, [file]);


    return (
        <div className="stories bg-white p-5 rounded border border-gray-400 flex mb-6 w-full">
            <Loading loading={loading} background="#ffffffb8" loaderColor="#ec4b4a" />
            <div className="flex items-center justify-center w-full">
                <label for="dropzone-file" className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer  dark:hover:bg-bray-80 ">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FontAwesomeIcon icon={solid('cloud-arrow-up')} className="text-gray-500 text-3xl" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or jpeg </p>
                    </div>
                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.SVG"
                        onChange={(e) => setFile(e.target.files[0])} />
                </label>
            </div>
            {showModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Upload Image
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setFile(null)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                {/*body*/}
                                <div className="relative p-6 flex-auto">
                                    <div className="feed-img">
                                        <img src={file && URL.createObjectURL(file)} alt=""
                                            className='w-full' />
                                    </div>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-[#ec4b4a] text-white active:bg-[#ec4b4a] font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => uploadFile(false)}
                                    >
                                        Upload Image
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </div>
    )
}

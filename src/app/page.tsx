"use client";

import "../styles/app/page.css";
import {useRef, useState} from "react";

const standardUrl = "http://localhost:8000/";

export default function Home() {
    const [img, setImg] = useState<string>();
    const [diagramUrl, setDiagramUrl] = useState<string>(standardUrl);
    const [enteredUrl, setEnteredUrl] = useState<string>(standardUrl);
    const inputRef = useRef<HTMLInputElement>(null);

    const [inputError, setInputError] = useState<boolean>();
    const [successUrlChange, setSuccessUrlChange] = useState<boolean>();
    const [standardUrlActive, setStandardUrlActive] = useState<boolean>();

    function getImage(retry: boolean = false) {
        const url: string = `${diagramUrl}diagram/generate`;
        fetch(url)
            .then((response) => response.json()
                .then((data) => {
                    setImg(data.image_url);
                })
            ).catch((error) => {
                console.error(error);
                if (!retry) {
                    setDiagramUrl(standardUrl);
                    setStandardUrlActive(true);
                    setInputError(false);
                    setSuccessUrlChange(false);
                    getImage(retry);
                }
            })
    }

    function checkNewUrl(url: string) {
        let updated = url.trim();
        if (!updated.endsWith("/")) updated += "/";
        if (updated.startsWith("http")) {
            setSuccessUrlChange(true);
            setInputError(false);
            setStandardUrlActive(false);
            return updated;
        } else {
            setInputError(true);
            setSuccessUrlChange(false);
            setStandardUrlActive(false);
            return null;
        }
    }

    function updateDiagramEngineUrl() {
        const value = inputRef.current?.value;
        if (value) {
            let updated = checkNewUrl(value);
            if (updated) setDiagramUrl(updated);
            setEnteredUrl(updated!);
            inputRef.current!.value = "";
        } else {
            setDiagramUrl(standardUrl);
            setEnteredUrl("");
            setStandardUrlActive(true);
            setInputError(false);
            setSuccessUrlChange(false);
        }
    }

    return (
        <>
            <div className="d-flex flex-row gap-2 justify-content-evenly">
                <div className="p-2 border border-gray-200 w-50">
                    <div className="d-flex flex-row justify-content-center my-2">
                        <h2>
                            Generate/Show Diagrams
                        </h2>
                    </div>
                    <div className="d-flex flex-row justify-content-evenly my-3">
                        <button type="button"
                                className="btn btn-primary w-75"
                                onClick={() => getImage()}>
                            Generate Diagram
                        </button>
                    </div>
                    {img && (
                        <>
                            <hr/>
                            <div className="my-1 d-flex flex-row justify-content-center">
                                <img src={img} alt="Generated Diagram" className="w-75" />
                            </div>
                        </>
                    )}
                </div>
                <div className="p-2 border border-gray-200 w-50">
                    <div className="d-flex flex-row justify-content-center my-2">
                        <h2>
                            Change Diagram Engine
                        </h2>
                        <hr/>
                    </div>
                    <div>

                        <div className={`my-1 ${inputError ? "has-danger" : ""}`}>
                            <label className="col-form-label mt-4">
                                Diagram Engine basic URL:
                            </label>
                            <input type="text" className={`form-control ${inputError ? "is-invalid" : ""}`} id="diagramEngineUrlForm" placeholder={diagramUrl} ref={inputRef} data-np-intersection-state="visible" />
                            {inputError && (
                                <div className="invalid-feedback">The inputted url is incorrect. Please use "http" or "https" at the beginning and end with "/"</div>
                            )}
                        </div>

                        <div className="d-flex flex-row justify-content-center my-2">
                            <button className="btn btn-primary w-75" onClick={updateDiagramEngineUrl}>
                                Update Diagram Engine Url
                            </button>
                        </div>

                        {successUrlChange && (
                            <div className="alert alert-dismissible alert-success">
                                <button className="btn-close" type="button" data-bs-dismiss="alert" onClick={() => setSuccessUrlChange(false)}></button>
                                <p>
                                    The url for the diagram engine has successfully changed to <strong>{enteredUrl}</strong>
                                </p>
                            </div>
                        )}

                        {standardUrlActive && (
                            <div className="alert alert-dismissible alert-danger">
                                <button className="btn-close" type="button" data-bs-dismiss="alert" onClick={() => setStandardUrlActive(false)}></button>
                                <p>
                                    <strong>WARNING</strong><br/>Your given url was not available, so the default url: <strong>{diagramUrl}</strong>, has been used.
                                </p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </>
    );
}

"use client";

import "../styles/app/page.css";
import {useState} from "react";

export default function Home() {
    const [img, setImg] = useState<string>();

    function getImage() {
        const url: string = `http://localhost:8000/diagram/generate`;
        fetch(url)
            .then((response) => response.json()
                .then((data) => {
                    setImg(data.image_url);
                    console.log(data.image_url);
                })
            );
    }

    function showImage() {

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
                        <button type="button" className="btn btn-primary" onClick={showImage}>
                            Show Diagram
                        </button>
                        <button type="button" className="btn btn-primary" onClick={getImage}>
                            Generate Diagram
                        </button>
                    </div>
                    <hr/>
                    {img && (
                        <div className="my-1">
                            <img src={img} alt="Generated Diagram" style={{ width: "100%" }} />
                        </div>
                    )}
                </div>
                <div className="p-2 border border-gray-200 w-50">
                    <div className="d-flex flex-row justify-content-center my-2">
                        <h2>
                            Change Diagram Engine
                        </h2>
                    </div>
                </div>
            </div>
        </>
    );
}

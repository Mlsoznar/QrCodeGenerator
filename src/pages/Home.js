import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Adsense from "../components/Adsense";
import VCard from "./VCard";
import "./Generator.css";

function QRCodeGenerator() {
  const [text, setText] = useState("");
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [view, setView] = useState("home");
  const [loading, setLoading] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const qrRef = useRef(null);

  const handleInputChange = (e) => {
    setText(e.target.value);
    setErrorMessage("");
    if (e.target.value === "") {
      setQrCodeValue("");
    }
  };

  const handleGenerateQRCode = () => {
    if (!text) {
      setErrorMessage("Lütfen Url girin.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setQrCodeValue(text);
      setLoading(false); 
    }, 5000); 
  };

  const handleDownloadQRCode = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const handleVCardClick = () => {
    setView("vcard");
  };

  const handleURLClick = () => {
    setView("home"); 
  };

  return (
    <div className="container-1">
      <div className="top-container">
        <div className="side-box">
          <p>REKLAM</p>
          <Adsense />
        </div>

        <div className="main-content">
          <h1>QR KOD ÜRETİCİ</h1>
          <div>
            <button className="button" onClick={handleURLClick}>
              URL
            </button>
            <button className="button" onClick={handleVCardClick}>
              VCARD
            </button>
          </div>

          {view === "home" && (
            <div>
              <input
                type="text"
                placeholder="URL girin."
                value={text}
                onChange={handleInputChange}
              />

              {errorMessage && (
                <div className="errorMessage">
                  {errorMessage}
                </div>
              )}


              <button className="button" onClick={handleGenerateQRCode}>
                QR Kod Oluştur
              </button>


              {loading ? (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <p style={{fontSize: "1.9rem"}}>Reklam gösteriliyor... Lütfen bekleyin</p>
                  <Adsense /> 
                </div>
              ) : (
                qrCodeValue && (
                  <div style={{ marginTop: "20px" }} ref={qrRef}>
                    <QRCodeCanvas value={qrCodeValue} />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <button className="button" onClick={handleDownloadQRCode}>
                        QR Kodu İndir
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}

          {view === "vcard" && <VCard />}
        </div>

        <div className="side-box">
          <p>REKLAM</p>
          <Adsense />
        </div>
      </div>

      <div className="bottom-box">
        <p>REKLAM</p>
        <Adsense />
      </div>
    </div>
  );
}

export default QRCodeGenerator;

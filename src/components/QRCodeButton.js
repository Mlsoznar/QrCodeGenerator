import React, { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

function QRCodeButton({ text, setQrCodeValue }) {
  const qrRef = useRef(null);

  const handleGenerateQRCode = () => {
    setQrCodeValue(text);
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

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }} ref={qrRef}>
      <QRCodeCanvas value={text} />
      <button
        onClick={handleGenerateQRCode}
        style={{ padding: "10px", marginTop: "20px", display: "block", marginLeft: "auto", marginRight: "auto" }}
      >
        QR Kod Oluştur
      </button>
      <button
        onClick={handleDownloadQRCode}
        style={{ padding: "10px", marginTop: "20px", display: "block", marginLeft: "auto", marginRight: "auto" }}
      >
        QR Kodu İndir
      </button>
    </div>
  );
}

export default QRCodeButton;

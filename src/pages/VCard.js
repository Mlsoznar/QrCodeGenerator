// import React, { useState, useRef } from "react";
// import { QRCodeCanvas } from "qrcode.react";
// import "./Generator.css";

// function QRCodeVCardGenerator() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [qrCodeValue, setQrCodeValue] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const qrRef = useRef(null); 


//   const handleGenerateQRCode = () => {
//     if (!name || !email || !phone) {
//       setErrorMessage("Lütfen tüm alanları doldurunuz.");
//     } else {
//       setErrorMessage("");
//       const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nEMAIL:${email}\nTEL:${phone}\nEND:VCARD`;
//       setQrCodeValue(vCardData);
//     }
//   };

//   const handleDownloadQRCode = () => {
//     const canvas = qrRef.current.querySelector("canvas");
//     const pngUrl = canvas
//       .toDataURL("image/png")
//       .replace("image/png", "image/octet-stream");
//     const downloadLink = document.createElement("a");
//     downloadLink.href = pngUrl;
//     downloadLink.download = "qr-code.png";
//     document.body.appendChild(downloadLink);
//     downloadLink.click();
//     document.body.removeChild(downloadLink);
//   };

//   return (
//     <div className="card">
//       <h2>Kişi Bilgilerini Giriniz</h2>
//       <div >
//         <input
//           type="text"
//           placeholder="İsim giriniz."
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </div>

//       <div>
//         <input
//           type="email"
//           placeholder="Mail giriniz."
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </div>

//       <div>
//         <input
//           type="tel"
//           placeholder="Telefon numarası giriniz."
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
          
//         />
//       </div>

//       {errorMessage && (
//         <div style={{ color: "red", marginBottom: "20px" }}>
//           {errorMessage}
//         </div>
//       )}

//       <button
//         onClick={handleGenerateQRCode}
//       >
//         QR Kod Oluştur
//       </button>
//       {qrCodeValue && (
//         <div style={{ marginTop: "20px", textAlign: "center" }} ref={qrRef}>
//           <QRCodeCanvas value={qrCodeValue} size={256} />
//           <button
//             onClick={handleDownloadQRCode}
//             style={{
//               padding: "10px",
//               marginTop: "20px",
//               display: "block",
//               marginLeft: "auto",
//               marginRight: "auto",
//             }}
//           >
//             QR Kodu İndir
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default QRCodeVCardGenerator;




import React, { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import Adsense from "../components/Adsense";
import "./Generator.css";

function QRCodeVCardGenerator() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [qrCodeValue, setQrCodeValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); 
  const qrRef = useRef(null);

  const handleGenerateQRCode = () => {
    if (!name || !email || !phone) {
      setErrorMessage("Lütfen tüm alanları doldurunuz.");
    } else {
      setErrorMessage("");
      setLoading(true); 

      
      setTimeout(() => {
        const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:${name}\nEMAIL:${email}\nTEL:${phone}\nEND:VCARD`;
        setQrCodeValue(vCardData);
        setLoading(false);
      }, 5000);
    }
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
    <div className="card">
      <h2>Kişi Bilgilerini Giriniz</h2>
      <div>
        <input
          type="text"
          placeholder="İsim giriniz."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <input
          type="email"
          placeholder="Mail giriniz."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <input
          type="tel"
          placeholder="Telefon numarası giriniz."
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      {errorMessage && (
        <div className="errorMessage">
          {errorMessage}
        </div>
      )}

      <button onClick={handleGenerateQRCode}>
        QR Kod Oluştur
      </button>

      
      {loading ? (
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <p style={{ fontSize:"1.9rem"}}>Reklam gösteriliyor... Lütfen bekleyin</p>
                  <Adsense /> 
                </div>
              )  : (
        qrCodeValue && (
          <div style={{ marginTop: "20px", textAlign: "center" }} ref={qrRef}>
            <QRCodeCanvas value={qrCodeValue} size={256} />
            <button
              onClick={handleDownloadQRCode}
              style={{
                padding: "10px",
                marginTop: "20px",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              QR Kodu İndir
            </button>
          </div>
        )
      )}
    </div>
  );
}

export default QRCodeVCardGenerator;


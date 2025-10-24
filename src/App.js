import { useState } from "react";

function App() {
  const [user, setUser] = useState(null);
  const [duyurular, setDuyurular] = useState([]);
  const [baslik, setBaslik] = useState("");
  const [icerik, setIcerik] = useState("");

  const usernames = {
    admin1: "admin",
    kurucu1: "kurucu"
  };

  const login = (name) => {
    if (usernames[name]) setUser({ name, role: usernames[name] });
    else alert("Tanımlı kullanıcı değil");
  };

  const yeniDuyuru = () => {
    if (!baslik || !icerik) return;
    setDuyurular([{ baslik, icerik, admin: user.name }, ...duyurular]);
    setBaslik(""); setIcerik("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      {!user ? (
        <div>
          <input className="p-2 text-black" placeholder="Kullanıcı Adı" id="username" />
          <button
            className="bg-green-600 p-2 rounded ml-2"
            onClick={() => login(document.getElementById("username").value)}
          >Giriş Yap</button>
        </div>
      ) : (
        <div>
          <button className="bg-red-600 p-2 rounded mb-4" onClick={() => setUser(null)}>Çıkış</button>

          {(user.role === "admin" || user.role === "kurucu") && (
            <div className="mb-4 p-4 border border-gray-700 rounded bg-gray-800">
              <input className="w-full mb-2 p-2 text-black" placeholder="Başlık" value={baslik} onChange={e => setBaslik(e.target.value)} />
              <textarea className="w-full mb-2 p-2 text-black" placeholder="İçerik" value={icerik} onChange={e => setIcerik(e.target.value)} />
              <button className="bg-blue-600 p-2 rounded w-full" onClick={yeniDuyuru}>Duyuru Yayınla</button>
            </div>
          )}

          <div className="grid gap-4">
            {duyurular.map((d, i) => (
              <div key={i} className="border border-gray-700 p-4 rounded bg-gray-800">
                <h2 className="font-bold text-lg">{d.baslik}</h2>
                <p>{d.icerik}</p>
                <p className="text-gray-400 text-sm mt-1">{d.admin}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

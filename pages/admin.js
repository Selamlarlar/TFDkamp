import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Admin() {
  const [admins, setAdmins] = useState([]);
  const [newAdmin, setNewAdmin] = useState("");

  useEffect(() => { fetchAdmins() }, []);

  async function fetchAdmins() {
    let { data, error } = await supabase.from("admins").select("*");
    if(!error) setAdmins(data);
  }

  async function addAdmin() {
    if(!newAdmin) return;
    await supabase.from("admins").insert([{ discord_id: newAdmin, role:"admin" }]);
    setNewAdmin("");
    fetchAdmins();
  }

  async function removeAdmin(id) {
    await supabase.from("admins").delete().eq("id", id);
    fetchAdmins();
  }

  return (
    <div style={{ padding:20 }}>
      <h1>Admin Paneli</h1>
      <h2>Yeni Admin Ekle</h2>
      <input placeholder="Discord ID" value={newAdmin} onChange={e=>setNewAdmin(e.target.value)} />
      <button onClick={addAdmin}>Onayla</button>
      <h2>Mevcut Adminler</h2>
      <ul>
        {admins.map(a => (
          <li key={a.id}>
            {a.discord_id} - {a.role}
            {a.role !== "founder" && <button onClick={()=>removeAdmin(a.id)}>Sil</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

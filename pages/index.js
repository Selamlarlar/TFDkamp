import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => { fetchAnnouncements() }, []);

  async function fetchAnnouncements() {
    let { data, error } = await supabase.from("announcements").select("*").order("created_at", { ascending: false });
    if(!error) setAnnouncements(data);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Türk Asker Oyunu Duyurular</h1>
      {announcements.map(a => (
        <div key={a.id} style={{ border:"1px solid #333", margin:"10px 0", padding:10 }}>
          <h2>{a.title}</h2>
          <p>{a.body}</p>
          {a.image_path && <img src={a.image_path} width="200"/>}
          <small>Ekleyen: {a.author_id} | {new Date(a.created_at).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}

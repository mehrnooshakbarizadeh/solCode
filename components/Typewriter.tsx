"use client";
import { useEffect, useState } from "react";

export default function Typewriter({ words }: { words: string[] }) {
  const [text, setText] = useState(words[0]); // server-rendered text stays crawlable
  useEffect(() => {
    let wi = 0, ci = 0, del = false, t: ReturnType<typeof setTimeout>;
    const tick = () => {
      const w = words[wi];
      setText(w.slice(0, ci));
      if (!del && ci === w.length) { del = true; t = setTimeout(tick, 1400); return; }
      if (del && ci === 0) { del = false; wi = (wi + 1) % words.length; }
      ci += del ? -1 : 1;
      t = setTimeout(tick, del ? 45 : 90);
    };
    tick();
    return () => clearTimeout(t);
  }, [words]);
  return <><span>{text}</span><span className="cursor" aria-hidden="true" /></>;
}

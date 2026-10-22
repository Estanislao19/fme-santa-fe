"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { VideoMedia } from "@/data/media";

export default function EditorialVideo({ media, priority = false }: { media: VideoMedia; priority?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(true);
  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const [manual, setManual] = useState(false);
  useEffect(() => {
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => { setReduced(preference.matches); setManual(false); };
    change(); preference.addEventListener("change", change);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.12 });
    if (container.current) observer.observe(container.current);
    return () => { preference.removeEventListener("change", change); observer.disconnect(); };
  }, []);
  useEffect(() => {
    const element = video.current;
    if (!element) return;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    function update() {
      if (media.informative) { if (visible) setReady(true); if (!visible || document.hidden) element!.pause(); return; }
      if (visible && !userPaused && !document.hidden && (manual || (!reduced && !saveData))) {
        setReady(true);
        if (ready) void element!.play().catch(() => setPlaying(false));
      } else element!.pause();
    }
    update(); document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, [visible, reduced, userPaused, manual, ready, media.informative]);
  return <div className="motion-media" ref={container}>
    <Image src={media.poster} alt={media.label} fill sizes="(max-width: 768px) 100vw, 50vw" priority={priority} className="video-poster" />
    {!failed && <video ref={video} src={ready ? media.src : undefined} poster={media.poster}
      aria-label={media.label} muted loop={!media.informative} playsInline preload="none" controls={media.informative}
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setFailed(true); setPlaying(false); }}
      onLoadedData={() => { if (!media.informative && visible && !userPaused && !document.hidden && (manual || !reduced)) void video.current?.play().catch(() => setPlaying(false)); }}>
      {media.captions && <track kind="captions" src={media.captions.src} srcLang={media.captions.language} label={media.captions.label} default />}
      Tu navegador no reproduce este video. La imagen de portada permanece disponible.
    </video>}
    <div className="motion-toolbar">
      {media.demo && <span className="media-demo-label">DEMO · no es un registro de FME</span>}
      {!failed && !media.informative && <button type="button" aria-label={`${playing ? "Pausar" : "Reproducir"} video de prueba`} onClick={() => {
        if (playing) { setUserPaused(true); video.current?.pause(); }
        else {
          setUserPaused(false); setManual(true); setReady(true);
          if (ready) void video.current?.play().catch(() => setPlaying(false));
        }
      }}>{playing ? "Pausar" : "Reproducir"}</button>}
    </div>
  </div>;
}
